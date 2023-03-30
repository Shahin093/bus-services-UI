import React, { useState } from 'react';
import { useEffect } from 'react';
import useUserAuth from '../../../hooks/useUserAuth';

const MyProfile = () => {

    const [user] = useUserAuth()
    console.log(user);
    const [orders, setOrders] = useState([]);
    const [totalSeat, setTotalSeat] = useState(0);
    const [seatCount, setSeatCount] = useState(0);
    useEffect(() => {
        fetch(`http://localhost:5000/api/v1/busCollection?email=${user?.email}`)
            .then(res => res.json())
            .then(data => {
                // console.log(data?.data)
                setTotalSeat(data?.data)
                setOrders(data?.data)
            })
    }, [user]);
    console.log(orders.length);
    // console.log(totalSeat.booked);
    // totalSeat.map(total => setSeatCount(total.booked))



    return (
        <div>
            <div class="p-5">
                <div class="p-8 bg-white shadow mt-24">
                    <div class="grid grid-cols-1 md:grid-cols-3">
                        <div class="grid grid-cols-3 text-center order-last md:order-first mt-20 md:mt-0">
                            <div>        <p class="font-bold text-gray-700 text-xl">{orders.length}</p>
                                <p class="text-gray-400">Booking</p> </div>
                            <div>



                                <p class="font-bold text-gray-700 text-xl">{seatCount}</p>
                                <p class="text-gray-400">Seat</p>
                            </div>
                            <div>           <p class="font-bold text-gray-700 text-xl">89</p> <p class="text-gray-400">Comments</p>      </div>    </div>

                        <div class="relative">
                            <div class="w-48 h-48 bg-indigo-100 mx-auto rounded-full shadow-2xl absolute inset-x-0 top-0 -mt-24 flex items-center justify-center text-indigo-500">
                                {/* <svg xmlns="http://www.w3.org/2000/svg" class="h-24 w-24" viewBox="0 0 20 20" fill="currentColor">  <path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd" /></svg> */}
                                <img className='' src="https://i.ibb.co/SfWPWCS/shahin.png" alt="shahin" border="0" />
                            </div>
                        </div>
                        <div class="space-x-8 flex justify-between mt-32 md:mt-0 md:justify-center">
                            <button disable class="text-white py-2 px-4 uppercase rounded bg-blue-400 hover:bg-blue-500 shadow hover:shadow-lg font-medium transition transform hover:-translate-y-0.5">{user?.role}</button>
                            <button class="text-white py-2 px-4 uppercase rounded bg-gray-700 hover:bg-gray-800 shadow hover:shadow-lg font-medium transition transform hover:-translate-y-0.5">EDIT PROFILE</button>
                        </div>
                    </div>
                    <div class="mt-20 text-center border-b pb-12">
                        <h1 class="text-4xl font-medium text-gray-700">{user?.firstName}<span class="font-light text-gray-500"></span></h1>
                        <p class="font-light text-gray-600 mt-3">{user?.email}</p>
                        <p class="font-light text-gray-600 mt-3">Bucharest, Romania</p>
                        <p class="mt-8 text-gray-500">Solution Manager - Creative Tim Officer</p>
                        <p class="mt-2 text-gray-500">University of Computer Science</p>
                    </div>
                    <div class="mt-12 flex flex-col justify-center">
                        <p class="text-gray-600 text-center font-light lg:px-16">An artist of considerable range, Ryan — the name taken by Melbourne-raised, Brooklyn-based Nick Murphy — writes, performs and records all of his own music, giving it a warm, intimate feel with a solid groove structure. An artist of considerable range.</p>
                        <button class="text-indigo-500 py-2 px-4  font-medium mt-4">  Show more</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MyProfile;