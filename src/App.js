import './App.css';
import AboutBusCountering from './components/AboutBusCountering/AboutBusCountering';
import BusBookingSerivces from './components/BusBookingSerivces/BusBookingSerivces';
import BusCollection from './components/BusCollection/BusCollection';
import DownLoadServices from './components/DownloadServices/DownLoadServices';
// import OriginalNavber from './components/OriginalNavber/OriginalNavber';
import Navbar from './components/Navbar/Navbar';
import OurService from './components/OurService/OurService';
import Testiminual from './components/Testiminual/Testiminual';
// import { Route, Router } from 'react-router-dom';

function App() {
  return (
    <div className="">
      {/* <OriginalNavber></OriginalNavber> */}
      <Navbar></Navbar>
      <BusCollection></BusCollection>
      <AboutBusCountering></AboutBusCountering>
      <OurService></OurService>
      <DownLoadServices></DownLoadServices>
      <BusBookingSerivces></BusBookingSerivces>
      <Testiminual></Testiminual>
      {/* <Router>
        <Route></Route>
      </Router> */}
    </div>
  );
}

export default App;
