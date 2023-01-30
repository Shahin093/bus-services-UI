import React from 'react';
import AboutBusCountering from '../AboutBusCountering/AboutBusCountering';
import BusBookingSerivces from '../BusBookingSerivces/BusBookingSerivces';
import DownLoadServices from '../DownloadServices/DownLoadServices';
import Footer from '../Footer/Footer';

import OurService from '../OurService/OurService';
import Testiminual from '../Testiminual/Testiminual';

const HomePage = () => {
    return (
        <div>
            <AboutBusCountering></AboutBusCountering>
            <BusBookingSerivces></BusBookingSerivces>
            <OurService></OurService>

            {/* <BusBookingSerivces></BusBookingSerivces> */}
            <Testiminual></Testiminual>
            <DownLoadServices></DownLoadServices>
            <Footer></Footer>

        </div>
    );
};

export default HomePage;