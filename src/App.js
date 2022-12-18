import { Route, Routes } from 'react-router-dom';
import BusHandalingTimes from './components/DashBoard/BusHandalingTImes/BusHandalingTimes';
import DashBoard from './components/DashBoard/DashBoard';
import MyBooking from './components/DashBoard/MyBooking/MyBooking';
import HomePage from './components/HomePage/HomePage';
import Login from './components/Login/Login';
import RequiredAuth from './components/Login/RequiredAuth';
import SignUp from './components/Login/SignUp';
import OriginalNavber from './components/OriginalNavber/OriginalNavber';

function App() {
  return (
    <div className="">
      {/* <OriginalNavber></OriginalNavber> */}
      {/* <Navbar></Navbar> */}
      {/* <BusCollection></BusCollection>
      <AboutBusCountering></AboutBusCountering>
      <OurService></OurService>
      <DownLoadServices></DownLoadServices>
      <BusBookingSerivces></BusBookingSerivces>
      <Testiminual></Testiminual> */}

      <OriginalNavber></OriginalNavber>
      <Routes>
        <Route path='/' element={<HomePage></HomePage>}></Route>
        <Route path='/login' element={<Login></Login>}></Route>
        <Route path='/signup' element={<SignUp></SignUp>}></Route>
        <Route path='/dashboard' element={
          <RequiredAuth>
            <DashBoard></DashBoard>
          </RequiredAuth>
        }>
          <Route path='/dashboard/mybooking' element={<MyBooking></MyBooking>}></Route>
          <Route path='/dashboard/slothandle' element={<BusHandalingTimes></BusHandalingTimes>}></Route>

        </Route>



      </Routes>

    </div>
  );
}

export default App;
