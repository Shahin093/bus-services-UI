import React, { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
// import Loading from '../Shared/Loading';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import CheckoutForm from './CheckoutForm';


// const stripePromise = loadStripe('pk_test_51L2XcOFWzcOdRAbZsuNZhvcbN6GZ7t1rox7AFNxmUbySY6mLsRUsjwqXK1YafHTJtKqMk4vwUdTYDfb0oQb0asjM00JlEmDWJs');


const stripePromise = loadStripe('pk_test_51L2XcOFWzcOdRAbZsuNZhvcbN6GZ7t1rox7AFNxmUbySY6mLsRUsjwqXK1YafHTJtKqMk4vwUdTYDfb0oQb0asjM00JlEmDWJs');


// import(useQuery)

const Payment = () => {
    const { id } = useParams();

    const url = `http://localhost:5000/api/v1/busCollection/${id}`;
    // console.log(url);
    // const { data: booking, isLoading } = useQuery(['busCollection', id], () => fetch(url, {
    //     method: 'GET',
    //     headers: {
    //         // 'authorization': `Bearer ${localStorage.getItem('accessToken')}`
    //     }
    // })
    //     .then(res => res.json())
    // );
    // // console.log(booking)
    // if (isLoading) {
    //     return "<Loading></Loading>"
    // }
    // console.log(booking);
    const [booking, setBooking] = useState({});

    useEffect(() => {
        fetch(`http://localhost:5000/api/v1/busCollection/${id}`)
            .then(res => res.json())
            .then(data => setBooking(data?.data));
    }, [id])

    console.log(booking);
    return (


        <div>
            <div class="card w-50 max-w-md bg-base-100  my-12 shadow-xl">
                <div class="card-body">
                    <p className='font-bold'>HEllo {booking?.bus_name}</p>

                    <h2 class="card-title">Pay for </h2>
                    <p>Your booking <span className='text-orange-200'>{booking?.dates}</span> at {booking?.slot}</p>
                    <p>Please pay : ${booking?.amount}</p>
                </div>
            </div>
            <div className='card w-50 flex-shrink-0 max-w-md bg-base-100 shadow-xl'>
                <div className='card-body'>
                    <Elements stripe={stripePromise}>
                        <CheckoutForm booking={booking} />
                    </Elements>
                </div>
            </div>
        </div>





    );
};

export default Payment;