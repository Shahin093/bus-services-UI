import React, { useEffect, useState } from 'react';
import doneIcon from '../../../assets/icons/done.svg';
import CancelIcon from '../../../assets/icons/cancel.svg';
import { Link } from 'react-router-dom';
import BusComfirmModal from '../BusComfirmModal/BusComfirmModal';

// http://localhost:5000/api/v1/register

const ComfrimBooking = () => {
    // modal 
    const [modalOpen, setModalOpen] = useState(true);
    const [email, setEmail] = useState('');
    const [ids, setIds] = useState('');
    // console.log(ids);
    const [orders, setOrders] = useState([]);
    useEffect(() => {
        fetch(`http://localhost:5000/api/v1/busCollection/allbuscollection`)
            .then(res => res.json())
            .then(data => setOrders(data?.data))
    }, []);

    // console.log(orders);

    // const [statusDelete, setStatusDelete] = useState([]);
    // Simple DELETE request with fetch
    // useEffect(() => {
    //     fetch(`http://localhost:5000/api/v1/busCollection/allbuscollection/${ids}`
    //         , { method: 'UPDATE' })
    //         .then(res => res.json())
    //         .then(data => {
    //             if (!data) {
    //                 return 'loading...'
    //             } else {
    //                 return window.location.reload();
    //                 // alert('Successfully deleted')

    //             }
    //         })
    // }, [ids])
    return (
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
                    <th>Comfirmation</th>
                </thead>
                {

                    orders?.map(order => <tbody>

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

                            <td><span>{order.seat}</span></td>

                            <td><span>{order.amount}</span></td>


                            <td><span>${
                                order.amount * order.seat
                            }</span></td>

                            {
                                order?.status === 'active' ?
                                    // <button onClick={() => setIds(order?._id)} className='font-bold p-3 btn-secondary'>Confirm</button>
                                    <div className='w-full mt-3 '>
                                        {/* <!-- The button to open modal --> */}
                                        <label htmlFor="my-modal-6" onClick={() => setIds(order?._id)} onChange={() => setEmail(order?.email)} className="px-6 py-3 bg-orange-700 hover:bg-black text-white text-1xl font-bold rounded-full">Comfirm</label>

                                    </div>
                                    :
                                    <>
                                        {/* <img width={"40px"} src="https://image.similarpng.com/very-thumbnail/2020/09/Right-mark-icon-on-transparent-background-PNG.png" alt="" /> */}
                                        <button disabled className='font-bold p-3 bg-black text-yellow-400'>{order.status}</button>

                                    </>
                            }


                            {/* payment  */}
                            {/* {
                                order?.dates === new Date().toISOString().slice(0, 10) ?
                                   
                                    : <td><span>Unpaid</span></td>
                            } */}
                            {/* <td><Link to={`/dashboard/payment/${order?._id}`} disabled={order.status === 'cancel'} className='btn bg-primary w-4 h-10'>PAY</Link></td> */}
                            {/* edit button  */}
                            {/* {
                                order?.dates === new Date().toISOString().slice(0, 10) &&
                                // <td><span className="btn bg-green-600  w-4 h-10">Edit</span></td>
                                <td><Link className='btn bg-green-600  w-4 h-10' to='/editBusCollection'>Edit

                                </Link></td>
                            } */}

                            {/* delete button  */}
                            {/* {
                                order?.dates === new Date().toISOString().slice(0, 10) &&
                                <td><span onClick={() => setIds(order?._id)} className='text-4xl  w-4 h-1 bg-red-500 text-red-500' ><RiDeleteBin6Fill /></span></td>
                            } */}


                        </tr>



                    </tbody>)
                }

            </table>

            {
                modalOpen && <BusComfirmModal setModalOpen={setModalOpen} email={email} key={ids} id={ids}></BusComfirmModal>
            }
        </div>
    );
};

export default ComfrimBooking;