import { Route, Routes } from "react-router-dom";
import BusHandalingTimes from "./components/DashBoard/BusHandalingTImes/BusHandalingTimes";
import ComfrimBooking from "./components/DashBoard/ComfirmBooking/ComfrimBooking";
import DashBoard from "./components/DashBoard/DashBoard";
import FeaturedInfo from "./components/DashBoard/FeaturedInfo/FeaturedInfo";
import MyBooking from "./components/DashBoard/MyBooking/MyBooking";
import Payment from "./components/DashBoard/Payment";
import HomePage from "./components/HomePage/HomePage";
import Login from "./components/Login/Login";
import RequiredAuth from "./components/Login/RequiredAuth";
import SignUp from "./components/Login/SignUp";
import NotFound from "./components/NotFound/NotFound";
import OriginalNavber from "./components/OriginalNavber/OriginalNavber";
import SeatRev from "./components/SeatRev/SeatRev";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Footer from "./components/Footer/Footer";
import ReviewPage from "./components/DashBoard/ReviewPage/ReviewPage";
import MyProfile from "./components/DashBoard/MyProfile/MyProfile";
// import useAdmin from './hooks/useAdmin';

function App() {
  // const [admin] = useAdmin();
  // console.log(admin)

  return (
    <div className="">
      <OriginalNavber></OriginalNavber>
      <Routes>
        <Route path="/" element={<HomePage></HomePage>}></Route>
        <Route path="/login" element={<Login></Login>}></Route>
        <Route path="/signup" element={<SignUp></SignUp>}></Route>
        <Route path="/seatRev" element={<SeatRev></SeatRev>}></Route>

        <Route path="/dashboard" element={<DashBoard></DashBoard>}>
          <Route path="/dashboard" element={<MyProfile></MyProfile>}></Route>
          <Route
            path="/dashboard/mybooking"
            element={<MyBooking></MyBooking>}
          ></Route>
          <Route
            path="/dashboard/comfirm"
            element={<ComfrimBooking></ComfrimBooking>}
          ></Route>
          {/* <Route path='/dashboard/chart' element={<ComfrimBooking></ComfrimBooking>}></Route> */}
          <Route
            path="/dashboard/slothandle"
            element={<BusHandalingTimes></BusHandalingTimes>}
          ></Route>
          <Route
            path="/dashboard/featuresinfo"
            element={<FeaturedInfo></FeaturedInfo>}
          ></Route>
          <Route
            path="/dashboard/review"
            element={<ReviewPage></ReviewPage>}
          ></Route>
          <Route
            path="/dashboard/payment/:id"
            element={<Payment></Payment>}
          ></Route>
        </Route>

        <Route path="*" element={<NotFound></NotFound>}></Route>
      </Routes>
      <ToastContainer />
    </div>
  );
}

export default App;
