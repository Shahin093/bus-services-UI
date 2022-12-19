import React from 'react';
import AboutBusCountering from '../AboutBusCountering/AboutBusCountering';
import BusBookingSerivces from '../BusBookingSerivces/BusBookingSerivces';
import Navbar from '../Navbar/Navbar';
import OurService from '../OurService/OurService';

const HomePage = () => {
    return (
        <div>
            <AboutBusCountering></AboutBusCountering>
            {/* <OurService></OurService>
             */}
            <BusBookingSerivces></BusBookingSerivces>
        </div>
    );
};

export default HomePage;