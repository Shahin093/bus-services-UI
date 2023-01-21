import React from 'react';
import AboutBusCountering from '../AboutBusCountering/AboutBusCountering';
import BusBookingSerivces from '../BusBookingSerivces/BusBookingSerivces';
import DownLoadServices from '../DownloadServices/DownLoadServices';

import OurService from '../OurService/OurService';
import Testiminual from '../Testiminual/Testiminual';

const HomePage = () => {
    return (
        <div>
            <AboutBusCountering></AboutBusCountering>
            <BusBookingSerivces></BusBookingSerivces>
            <OurService></OurService>
            <DownLoadServices></DownLoadServices>
            {/* <BusBookingSerivces></BusBookingSerivces> */}
            <Testiminual></Testiminual>

        </div>
    );
};

export default HomePage;