import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import Loader from '../Loader/Loader';

const CheckoutForm = ({ booking }) => {
    const { _id, amount, bus_name, email } = booking;

    // console.log(_id, email);
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
    // console.log(stripe);
    useEffect(() => {
        fetch('http://localhost:5000/create-payment-intent', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                // 'authorization': `Bearer ${localStorage.getItem('authorization')}`
            },
            body: JSON.stringify({ price: "345" })
        })
            .then(res => res.json())
            .then(data => {

                if (data?.clientSecret) {
                    // console.log(data)
                    setClinetSecret(data?.clientSecret);
                }
                // if (!data) {
                //     return <Loader></Loader>
                // }
            });
    }, [amount])
    if (!clientSecret) {
        return <Loader></Loader>
    }
    // console.log(clientSecret);

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
        // if (!paymentIntent) {
        //     return <Loader></Loader>
        // }
        if (intentError) {
            setCardError(intentError?.message);
        } else {

            setCardError('');
            setTransactionId(paymentIntent?.id);
            setSuccess('Contreats ! Your Payment is Completed.');



            fetch(`http://localhost:5000/api/v1/busCollection/${_id}`, {
                method: 'PATCH',
                body: JSON.stringify({
                    pay: clientSecret,
                }),
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                },
            })
                .then((response) => response.json())
                .then((mailupdateData) => {
                    toast.success(mailupdateData?.message)
                    // console.log(mailupdateData);

                    // if (!mailupdateData) {
                    //     return <Loader></Loader>
                    // }
                    // toast.success('successfully payment...');
                })
        }
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