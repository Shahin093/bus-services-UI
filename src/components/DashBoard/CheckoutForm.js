import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import React, { useEffect, useState } from 'react';

const CheckoutForm = ({ booking }) => {
    const { amount, bus_name, email } = booking;

    console.log(booking);
    const stripe = useStripe();
    const elements = useElements();
    const [cardError, setCardError] = useState('');
    const [success, setSuccess] = useState('');
    const [transactionId, setTransactionId] = useState('');
    const [clientSecret, setClinetSecret] = useState('');
    // useEffect(() => {
    //     fetch('http://localhost:5000/api/v1/create-payment-intent', {
    //         method: 'POST',
    //         // headers: {
    //         //     'content-type': 'application/json',
    //         //     // 'authorization': `Bearer ${localStorage.getItem('accessToken')}`
    //         // },
    //         body: JSON.stringify({ price: amount })

    //     }).then(res => res.json())
    //         .then(data => {
    //             console.log(data);
    //             if (data?.clientSecret) {
    //                 setClinetSecret(data.clientSecret);
    //             }
    //         })


    // }, [amount])

    useEffect(() => {
        fetch('http://localhost:5000/api/v1/create-payment-intent', {
            method: 'POST',
            body: JSON.stringify({ price: amount }),
            headers: {
                'Content-Type': 'application/json'
            },
        })
            .then(res => res.json())
            .then(data => {
                // console.log(data);
                console.log(data);
                if (data?.clientSecret) {
                    setClinetSecret(data.clientSecret);
                }
            });
    }, [])



    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!stripe || !elements) {
            return;
        }
        const card = elements.getElement(CardElement);
        if (card == null) {
            return;
        }
        const { error, } = await stripe?.createPaymentMethod({
            type: 'card',
            card
        });
        setCardError(error?.message || '');
        setSuccess('')
        // if (error) {
        //     console.log(error.message);
        //     setCardError(error?.message || '');
        // } else {
        //     setCardError('');
        // }
        // confrim card payment
        const { paymentIntent, intentError } = await stripe?.confirmCardPayment(
            clientSecret,
            {
                payment_method: {
                    card: card,
                    billing_details: {
                        name: bus_name,
                        email: email
                    },
                },
            },

        );
        if (intentError) {
            setCardError(intentError?.message);
        } else {
            setCardError('');
            setTransactionId(paymentIntent.id)
            console.log(paymentIntent);
            setSuccess('Contreats ! Your Payment is Completed.');





        }
        alert('successfully payment...')
    }




    return (
        <>
            <form onSubmit={handleSubmit}>
                <CardElement
                    options={{
                        style: {
                            base: {
                                fontSize: '16px',
                                color: '#424770',
                                '::placeholder': {
                                    color: '#aab7c4',
                                },
                            },
                            invalid: {
                                color: '#9e2146',
                            },
                        },
                    }}
                />
                <button className='btn btn-success btn-xs' type="submit" >
                    Pay
                </button>
            </form>
            {
                cardError && <p className='text-red-500'>{cardError}</p>
            }
            {
                success &&
                <div className='text-green-500'>
                    <p>{success}</p>
                    <p>Your Transaction ID : <span className='text-orange-500 font-bold'>{transactionId}</span></p>
                </div>
            }
        </>
    );
};

export default CheckoutForm;