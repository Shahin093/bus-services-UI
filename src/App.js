import './App.css';
import BusCollection from './components/BusCollection/BusCollection';
// import OriginalNavber from './components/OriginalNavber/OriginalNavber';
import Navbar from './components/Navbar/Navbar';
// import { Route, Router } from 'react-router-dom';

function App() {
  return (
    <div className="">
      {/* <OriginalNavber></OriginalNavber> */}
      <Navbar></Navbar>
      <BusCollection></BusCollection>
      {/* <Router>
        <Route></Route>
      </Router> */}
    </div>
  );
}

export default App;
