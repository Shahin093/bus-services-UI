import React from 'react';
import './MyBooking.css'
import { RiDeleteBin6Fill } from 'react-icons/ri';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../../../firebase.init';
import { useState } from 'react';
import { useEffect } from 'react';
import doneIcon from '../../../assets/icons/done.svg';
import CancelIcon from '../../../assets/icons/cancel.svg';
// import Loading from '../../Shared/Loading';
import { Link } from 'react-router-dom';
import Loader from '../../Loader/Loader';
import useUserAuth from '../../../hooks/useUserAuth';
// import EditBusCollection from '../EditBusCollection/EditBusCollection';


const MyBooking = () => {
    // const [user, loading] = useAuthState(auth);

    const [user] = useUserAuth()

    const [orders, setOrders] = useState([]);
    useEffect(() => {
        fetch(`http://localhost:5000/api/v1/busCollection?email=${user?.email}`)
            .then(res => res.json())
            .then(data => setOrders(data?.data))
    }, [user]);

    // get id in useState
    const [ids, setIds] = useState('');
    // deleting state 
    // const [statusDelete, setStatusDelete] = useState([]);
    // Simple DELETE request with fetch
    useEffect(() => {
        fetch(`http://localhost:5000/api/v1/busCollection/${ids}`
            , { method: 'DELETE' })
            .then(res => res.json())
            .then(data => {
                if (!data) {
                    return '<Loading></Loading>'
                } else {
                    window.location.reload();
                    return alert('Successfully deleted')

                }
            })
    }, [ids])
    // if (loading) {
    //     return <Loader></Loader>
    // }
    return (
        // <div className='chart'>
        //     {
        //         orders?.map(order => <Order key={order._id} order={order}></Order>)
        //     }
        // </div>


        <div className='dashboard-content-container'>
            <div className='dashboard-content-header'>
                <h2>Orders List</h2>
                <div className='dashboard-content-search'>

                </div>
            </div>

            <table>
                <thead>
                    <th>BUS</th>
                    <th>FROM-TO</th>
                    <th>STATUS</th>
                    <th>SLOT</th>
                    <th>SEAT</th>
                    <th>AMOUNT</th>
                    <th>TOTAL AMOUNT</th>
                    <th>PAYMENT</th>
                    <th>RE-ASSIGN</th>
                </thead>
                {

                    orders?.map(order => <tbody>
                        {/* {console.log(order?.booked?.length)} */}
                        <tr >
                            <td>
                                <div>
                                    <img
                                        src={order.img}
                                        className='dashboard-content-avatar'
                                        alt='/' />
                                    <span>{order.bus_name}</span>
                                </div>
                            </td>

                            <td><span>{order.district_from}-{order.district_to}</span></td>

                            <td>
                                <div disabled={order.status === 'cancel'}>
                                    {/* || */}
                                    {/* {  ||  order?.status === 'active' ?
                                        <img
                                            src={doneIcon}
                                            alt='paid-icon'
                                            className='dashboard-content-icon' />
                                        : order.status === 'cancel' ?
                                            <img
                                                src={CancelIcon}
                                                alt='canceled-icon'
                                                className='dashboard-content-icon' />

                                            : null} */}
                                    {/* <span>{order.status}</span> */}
                                    {
                                        order?.dates === new Date().toISOString().slice(0, 10) ?
                                            <img
                                                src={doneIcon}
                                                alt='paid-icon'
                                                className='dashboard-content-icon' />
                                            :
                                            <img
                                                src={CancelIcon}
                                                alt='canceled-icon'
                                                className='dashboard-content-icon' />
                                    }
                                </div>
                            </td>


                            <td><span>{order.slot}</span></td>

                            <td><span>,{order?.booked},</span></td>

                            <td><span>{order.amount}</span></td>


                            <td><span>$
                                {
                                    order?.amount * order?.booked?.length
                                }
                            </span></td>

                            {/* payment  */}
                            {/* {
                                order?.dates === new Date().toISOString().slice(0, 10) ?
                                   
                                    : <td><span>Unpaid</span></td>
                            } */}
                            <td>
                                {
                                    order?.pay === 'unPaid' ?
                                        <Link to={`/dashboard/payment/${order?._id}`} disabled={order.status === 'cancel'} className='btn bg-primary w-4 h-10'>PAY</Link>
                                        :
                                        <span>Paid</span>
                                }
                            </td>
                            {/* edit button  */}
                            {
                                order?.dates === new Date().toISOString().slice(0, 10) &&
                                // <td><span className="btn bg-green-600  w-4 h-10">Edit</span></td>
                                <td><Link className='btn bg-green-600  w-4 h-10' to='/editBusCollection'>Edit

                                </Link></td>
                            }

                            {/* delete button  */}
                            {
                                order?.dates === new Date().toISOString().slice(0, 10) &&
                                <td><span onClick={() => setIds(order?._id)} className='text-4xl  w-4 h-1 bg-red-500 text-red-500' ><RiDeleteBin6Fill /></span></td>
                            }

                            {/* <div
                                class=" text-center cursor-pointer select-none h-4  inline-flex items-center justify-center mx-auto transition-colors bg-gray-100 active:text-white active:bg-blue-600 font-medium text-gray-900  hover:bg-blue-100 disabled:opacity-50"
                            >
                                ...
                            </div> */}


                        </tr>



                    </tbody>)
                }

            </table>

            {

            }
        </div>

    );
};

export default MyBooking;