import React, { useEffect, useState } from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useAuthState } from 'react-firebase-hooks/auth';
import { useForm } from 'react-hook-form';
import { Link, Navigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import auth from '../../firebase.init';
import SeatBookingModal from '../SeatBookingModal/SeatBookingModal';
import SeatRev from '../SeatRev/SeatRev';
const BusModal = ({ bookingBus, setBookingBus }) => {

    // modal 
    const [modalOpen, setModalOpen] = useState(false);




    // user auth 
    const [user] = useAuthState(auth);

    // date 
    const [startDate, setStartDate] = useState(new Date());

    // react from 
    const { register, formState: { errors }, handleSubmit } = useForm();

    // option From 
    const optionsFrom = [
        { value: '', text: '--Choose an option--' },
        { value: 'Dhaka', text: 'Dhaka 🍏' },
        { value: 'Chittagong', text: 'Chittagong 🍌' },
        { value: 'Cumilla', text: 'Cumilla 🍌' },
        { value: 'Feni', text: 'Feni 🍌' }
    ];
    const [selectedFrom, setSelectedFrom] = useState(optionsFrom[0].value);
    const handleChangeFrom = event => {
        // console.log(event.target.value);
        setSelectedFrom(event.target.value);

    };
    // option TO 
    const optionsTo = [
        { value: '', text: '--Choose an option--' },
        { value: 'Dhaka', text: 'Dhaka 🍏' },
        { value: 'Chittagong', text: 'Chittagong 🍌' },
        { value: 'Cumilla', text: 'Cumilla 🍌' },
        { value: 'Feni', text: 'Feni 🍌' }
    ];
    const [selectedTo, setSelectedTo] = useState(optionsTo[0].value);
    const handleChangeTo = event => {
        // console.log(event.target.value);
        setSelectedTo(event.target.value);

    };
    // auto timing systems 

    const date = new Date();
    const showTime = date.getHours()
        + ':' + date.getMinutes()
        + ":" + date.getSeconds();
    // console.log(showTime.split(':', 1)[0])
    // option slot 
    const optionsSlot = [
        { value: '00000', text: '--Choose an option--' },
        { value: '13:00PM', text: '1:00PM' },
        { value: '14:00PM', text: '2:00PM' },
        { value: '15:00PM', text: '3:00PM' },
        { value: '16:00PM', text: '4:00PM' },
        { value: '17:00PM', text: '5:00PM' },
        { value: '18:00PM', text: '6:00PM' },
        { value: '19:00PM', text: '7:00PM' },
        { value: '20:00PM', text: '8:00PM' },
        { value: '21:00PM', text: '9:00PM' },
        { value: '22:00PM', text: '10:00PM' },
        { value: '23:00PM', text: '11:00PM' },
        { value: '24:00PM', text: '12:00PM' }
    ];

    // optionsSlot.map(opsl =>
    //     {
    //     if (showTime.split(':', 1)[0] === opsl.value.split(':', 1)) {
    //         opsl?.value?.remove(opsl.value)
    //     }
    // }
    // console.log(opsl)
    // )



    const [selectedSlot, setSelectedSlot] = useState(optionsSlot[0].value);

    const dates = new Date().toISOString().slice(0, 10);

    const handleChangeSlot = event => {
        setSelectedSlot(event.target.value);
        // window.location.reload();

    };
    // console.log(selectedSlot.split(':', 1)[0]);
    const [slotDataHandle, setSlotDataHandle] = useState([]);


    var btn = document.querySelectorAll(".btn");

    let occ = JSON.parse(localStorage.getItem("booked")) || [];

    let selected = JSON.parse(localStorage.getItem("tickets1")) || [];
    let [co, setCo] = useState([]);
    let demost = [];


    useEffect(() => {
        fetch(`http://localhost:5000/api/v1/busCollection/slots?slot=${selectedSlot}&from=${selectedFrom}&to=${selectedTo}&bus_name=${bookingBus?.bus_name}&&dates=${dates}`)
            .then(res => res.json())
            .then(data =>
                data?.data?.map(sl => {

                    // setSlotDataHandle(demost.push(...sl?.booked))
                    // demost.push(...sl?.booked);
                    demost.push(...sl?.booked)
                    setCo(demost);
                    // console.log(demost);


                    // demost = null;
                    // console.log(demost);
                })

            );
    })


    // console.log(co);
    // Object?.values(btn)?.map((value) => {
    // if (co.includes(value.innerText)) {
    //     // console.log("val" + value.innerText);
    //     value.classList.add("occupied");
    //     // console.log("hello");
    // }
    // if (selected.includes(value.innerText)) {
    //     // console.log("val" + value.innerText);
    //     value.classList.add("selected");
    //     // console.log("hello");
    // }
    // }

    // )
    // cart tickets session 
    let cart = JSON.parse(localStorage.getItem("tickets1")) || [];
    const handle = (e) => {
        var tickets = e.target.innerText;

        if (
            !e.target.classList.contains("selected") &&
            !e.target.classList.contains("occupied")
        ) {
            cart.push(tickets);
            // cart3.push(tickets);
            // JSON.stringify(localStorage.setItem("Selected", cart3));
            e.target.classList.add("selected");
        } else {
            if (e.target.classList.contains("occupied")) {
                toast.success("Already booked,Please Select Another Seat");
            } else {
                e.target.classList.remove("selected");
                // console.log(e.target.innerText);

                // console.log(e.target.innerText);
                cart.splice(cart.indexOf(e.target.innerText), 1);
                // cart3.splice(cart3.indexOf(e.target.innerText), 1);
                // JSON.stringify(localStorage.setItem("Selected", cart3));
            }
        }
        localStorage.setItem("tickets1", JSON.stringify(cart));
        // localStorage.setItem("tickets1", cart);
        // console.log(cart);
        // window.location.reload();
    };





    // const [sl, setSl] = useState([]);
    // console.log(sl);
    // var btn = document.querySelectorAll(".btn");

    // let occ = JSON.parse(localStorage.getItem("booked")) || [];

    // let selected = JSON.parse(localStorage.getItem("tickets1")) || [];
    // console.log(selected);
    useEffect(() => {
        // console.log("hello world");

        // setSl(selected);
        // console.log(selected);
        // console.log(btn);
        // Object?.values(btn)?.map((value) => {
        //     // value.classList.add("selected");
        //     if (co.includes(value.innerText)) {
        //         // console.log("val" + value.innerText);
        //         value.classList.add("occupied");
        //         // co = [];
        //         // console.log("hello");
        //     }
        //     if (selected.includes(value.innerText)) {
        //         // console.log("val" + value.innerText);
        //         value.classList.add("selected");
        //         // console.log("hello");
        //     }

        //     // if (demost.includes(value.innerText)) {
        //     //     // console.log("val" + value.innerText);
        //     //     value.classList.add("occupied");
        //     //     // console.log("hello");
        //     // }

        //     // if (selected.includes(value.innerText)) {
        //     //     // console.log("val" + value.innerText);
        //     //     value.classList.add("selected");
        //     //     // console.log("hello");
        //     // }

        // });

        document.getElementById("count").innerHTML = occ.length;
        document.getElementById("total").innerHTML =
            "Total Seats Avaliable:" + localStorage.getItem("Total");
        var arr = localStorage.getItem("tickets1");
        // console.log(arr);
        //     var arr1=[]
        //     arr1 = JSON.parse(localStorage.getItem("booked"));
        //     if(localStorage.getItem("Selected"))
        // arr.map((value) => {
        //       if (value.id != arr1) {
        //         arr.splice(arr.indexOf(value), 1);
        //         console.log(arr);
        //       JSON.parse(localStorage.setItem("Selected",arr))
        //       }
        //     });
    });

    const list = [
        { seat1: "A1", seat2: "A2", seat3: "A3", seat4: "A4" },
        { seat1: "5", seat2: "6", seat3: "7", seat4: "8" },
        { seat1: "9", seat2: "10", seat3: "11", seat4: "12" },
        { seat1: "13", seat2: "14", seat3: "15", seat4: "16" },
        { seat1: "17", seat2: "18", seat3: "19", seat4: "20" },
        { seat1: "21", seat2: "22", seat3: "23", seat4: "24" },
        { seat1: "25", seat2: "26", seat3: "27", seat4: "28" },
        { seat1: "29", seat2: "30", seat3: "31", seat4: "32" },
        { seat1: "33", seat2: "34", seat3: "35", seat4: "36" },
        { seat1: "37", seat2: "38", seat3: "39", seat4: "40" }
    ];



    var st = 0;
    // console.log(slotDataHandle);
    // demost.map(d => console.log(d))
    // slotDataHandle?.map(sl =>
    //     setCo(sl)

    //     // seat = seat + sl.seat
    //     // setCo(st + sl.seat)
    //     // setCo(...co, sl?.booked)

    // )
    var seat = st + 0

    const [seatCount, setSeatCount] = useState(0);
    const onChangeCaptureHandler = (e) => {
        setSeatCount(e.target.value);
    };

    const bo = ['A1', 'A2', 'A3', 'A4', 'B1', 'B2', 'B3', 'B4', 'C1', 'C2', 'C3', 'C4'];
    // const bt = ['A2', 'B3', 'C4', 'A4'];


    const [dataValid, setDataValid] = useState(false);

    // onsubmit 
    const onSubmit = async data => {
        const bus_name = bookingBus?.bus_name;
        const district_from = selectedFrom;
        const district_to = selectedTo;
        // const when = startDate;
        const customer_name = user?.name;
        const email = user?.email;
        const slot = selectedSlot;
        // console.log(district_from, district_to, slot);
        const status = 'active';
        const seat = data.seat;
        // const dates = data.when;
        const dates = new Date().toISOString().slice(0, 10);
        // console.log(dates);
        const amount = 400;
        const driver_staf = 2;
        const booked = selected;

        console.log(booked)




        const databody = {
            bus_name, district_from, district_to, customer_name, email, slot, seat, booked, amount, status, dates, driver_staf
        }
        // let dataValid = false
        // console.log(cart)
        // console.log(databody);
        fetch('http://localhost:5000/api/v1/busCollection', {
            method: 'POST',
            body: JSON.stringify(databody),
            headers: {
                'Content-Type': 'application/json'
            },
        })
            .then(res => res.json())
            .then(data => {

                toast.success(data.message);

                setDataValid(data);
                if (data) {
                    // return < Navigate to="/dashboard/mybooking" replace={true} />
                    setDataValid(data);
                }

                console.log(data);
            });

        localStorage.removeItem("tickets1");
    }

    // console.log(slotDataHandle);



    var items = list.map((i) => {
        // console.log(i);
        // return (
        //     <div>
        //         <div className="grid grid-cols-2 lg:grid-cols-5">

        //             <div className="container">
        //                 <button
        //                     className="btn"
        //                     style={{ margin: 10 }}
        //                     type="button"
        //                     onClick={handle}
        //                     class="btn btn-primary"
        //                 >
        //                     {i.seat1}
        //                 </button>
        //                 <button
        //                     className="btn"
        //                     style={{ margin: 10 }}
        //                     type="button"
        //                     onClick={handle}
        //                     class="btn btn-primary"
        //                 >
        //                     {i.seat2}
        //                 </button>
        //                 <button
        //                     className="btn"
        //                     style={{ margin: 10 }}
        //                     type="button"
        //                     onClick={handle}
        //                     class="btn btn-primary"
        //                 >
        //                     {i.seat3}
        //                 </button>
        //                 <button
        //                     className="btn"
        //                     style={{ margin: 10 }}
        //                     type="button"
        //                     onClick={handle}
        //                     class="btn btn-primary"
        //                 >
        //                     {i.seat4}
        //                 </button>
        //             </div>
        //         </div>
        //     </div>
        // );
    });



    return (
        <div>
            {/* {modalOpen && <SeatBookingModal selected={selected} setOpenModal={setModalOpen} />} */}
            {/* <!-- Put this part before </body> tag-- > */}
            <input type="checkbox" id="my-modal-6" className="modal-toggle" />
            <div className="modal modal-bottom sm:modal-middle">
                <div className="modal-box ">
                    <div className='flex  justify-center items-center'>
                        <div className=" card w-full bg-gray-200 shadow-xl">
                            <div className="card-body">
                                <form action="/dashboard" onSubmit={handleSubmit(onSubmit)}>

                                    <h2 className='mx-auto text-blue-600 text-3xl font-bold'>Welcome to <span className='underline decoration-pink-500 decoration-[10px] text-yellow-500'>{bookingBus?.bus_name}</span> Bus</h2>

                                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-2">
                                        {/* Where  */}
                                        <div className="form-control w-full">
                                            <label className="label">
                                                <span className="label-text">Where</span>
                                            </label>
                                            <select value={selectedFrom} onChange={handleChangeFrom} className="input input-bordered w-full max-w-xs" required  >


                                                {

                                                    optionsFrom.map((option, index) => (
                                                        <option key={index} value={option.value}>
                                                            {option.text}
                                                        </option>
                                                    ))

                                                }

                                                {/* <option className='bg-orange-500 font-bold' value="">Select Destination</option> */}
                                                {/* {
                                                bookingBus?.district_from.map(df => <option className='bg-orange-500 font-bold' value={df}>{df}</option>)
                                            } */}
                                            </select>
                                            <label className="label">
                                            </label>
                                        </div>

                                        {/* To  */}
                                        <div className="form-control w-full max-w-xs">
                                            <label className="label">
                                                <span className="label-text">To</span>
                                            </label>
                                            <select value={selectedTo} onChange={handleChangeTo} name="select" className="input input-bordered w-full max-w-xs" required

                                            // {...register("to", {
                                            //     required: {
                                            //         value: true,
                                            //     }
                                            // })}

                                            >
                                                <option className='bg-orange-500 font-bold' value="">Select Destination</option>
                                                {
                                                    bookingBus?.district_to.map((dt, index) => <option key={index} className='bg-orange-500 font-bold' value={dt}>{dt}</option>)
                                                }
                                            </select>
                                            <label className="label">
                                            </label>
                                        </div>

                                        {/* when  */}
                                        <div className="form-control w-full max-w-xs">
                                            <label className="label">
                                                <span className="label-text">When</span>
                                            </label>
                                            <DatePicker
                                                {...register("when", {

                                                })}
                                                className="input input-bordered w-full max-w-xs" selected={startDate} onChange={(date) => setStartDate(date)} />

                                        </div>
                                        {/* <h2>{selects}</h2> */}
                                        {/* Time */}
                                        <div className="form-control w-full max-w-xs">
                                            <label className="label">
                                                <span className="label-text">Time</span>
                                            </label>
                                            {/* <select value={selectValue} onChange={onChange} name="select"

                                            className="input input-bordered w-full max-w-xs" required  {...register("time", {
                                                required: {
                                                    // value: true,
                                                }
                                            })
                                            }
                                        >
                                            <option defaultValue disabled className='bg-orange-500 font-bold' >Select Time</option >
                                            {
                                                bookingBus?.slot.map(s =>
                                                    <option className='bg-orange-500  font-bold' key={s} value={s}>{s}</option>)
                                            }
                                        </select> */}
                                            <select className="input input-bordered w-full max-w-xs" value={selectedSlot} onChange={handleChangeSlot}>
                                                {optionsSlot.map((option, index) => (
                                                    <option key={index} value={option.value}>
                                                        {option.text}
                                                    </option>
                                                ))}
                                            </select>

                                            <label className="label">
                                                {/* {selectValue && <h2 className="mt-3">{selectValue}</h2>} */}
                                            </label>
                                        </div>

                                        {/*seat*/}
                                        {/* <div className="form-control w-full max-w-xs">
                                            <label className="label">
                                                <span className="label-text">Seat</span>
                                            </label>
                                            <input
                                                onChangeCapture={onChangeCaptureHandler}
                                                type="number"
                                                placeholder="Enter the Seat Number"
                                                className="input input-bordered w-full max-w-xs"
                                                {...register("seat", {
                                                    required: {
                                                        value: true,
                                                        message: 'Seat  is Required'
                                                    }
                                                })}
                                            />
                                            <label className="label">
                                                {
                                                    seatCount > 50 - seat && <span className='label-text-alt text-red-500'>Please don't avaiable seat</span>
                                                }
                                                {errors.seat?.type === 'required' && <span className="label-text-alt text-red-500">{errors.seat.message}</span>}
                                            </label>
                                        </div> */}

                                        <div className='grid grid-cols-4 text-yellow-400 bg-black'>
                                            {
                                                bo?.map(b =>

                                                    co.includes(b) ? <span>
                                                        <img width={"40px"} src="https://image.similarpng.com/very-thumbnail/2020/09/Right-mark-icon-on-transparent-background-PNG.png" alt="" />
                                                    </span> :
                                                        <button className='btn' type="button"
                                                            onClick={handle}>{b}</button>
                                                )
                                            }
                                            <label className="label">
                                                {
                                                    !cart &&
                                                    <span>Please selete your seat regervation !</span>
                                                }
                                            </label>
                                        </div>
                                        <div className='form-control w-full max-w-xs'>
                                            <label className="label">
                                                <span className="label-text mx-auto">
                                                    {
                                                        showTime.split(":", 1)[0] >= selectedSlot.split(':', 1)[0] ?
                                                            <p className='label-text-alt text-red-500'>Time OUt This slot : {selectedSlot.split(':', 1)[0]}</p>
                                                            :
                                                            <div>  <h2 className='label-text-alt text-green-500'>Everything is Okay</h2>
                                                                <img width={"80px"} src="https://image.similarpng.com/very-thumbnail/2020/09/Right-mark-icon-on-transparent-background-PNG.png" alt="" /></div>
                                                    }
                                                </span>
                                            </label>
                                        </div>

                                        {/* seat booking modal  */}
                                        {/* {modalOpenSeat && <SeatRev></SeatRev>
                                        } */}
                                        <input disabled=
                                            {
                                                parseInt(showTime.split(":", 1)[0]) >= parseInt(selectedSlot.split(':', 1)[0])
                                                ||
                                                seatCount > 50 - seat || localStorage.setItem("tickets1", JSON.stringify(cart))?.length === 0
                                            }
                                            className='p-5 bg-yellow-500 submit-button' type="submit" value="Booking Now"
                                        />
                                        {dataValid && (
                                            <Navigate to="/dashboard/mybooking" replace={true} />
                                        )}

                                    </div>

                                </form>

                            </div>
                        </div >

                    </div >

                    {/* seat regervaiton  */}

                    {/* <div className='grid grid-cols-4 text-yellow-400 bg-black'>
                        {
                            bo?.map(b =>

                                bt.includes(b) ? <button style={{ margin: 10 }}
                                    className='btn btn-primary occupied'>{b}Booked</button> : <button className='btn' type="button"
                                        onClick={handle}>{b}</button>
                            )
                        }
                    </div> */}

                    <div>
                        <>

                            < div class="Book-seat" >
                                {/* <p>
                                    <div class="Showcase mt-52 lg:mt-96">
                                        <ul>
                                            <li>
                                                <div
                                                    class="grid-item selected1"
                                                    style={{ height: "1px" }}
                                                ></div>
                                                <small>Available</small>
                                            </li>
                                            <li>
                                                <div
                                                    id="grid-item"
                                                    class="grid-item selected "
                                                    style={{ height: "1px" }}
                                                ></div>
                                                <small>Selected</small>
                                            </li>
                                            <li>
                                                <div
                                                    id="grid-item"
                                                    class="grid-item occupied"
                                                    style={{ height: "1px" }}
                                                ></div>
                                                <small>Occupied</small>
                                            </li>
                                        </ul>
                                    </div>
                                </p> */}
                                <></>
                                {/* <div id="button1"></div> */}
                            </div >


                            {" "}
                            < div className="grid1" > {items}</div >
                            <div className="App">
                                {/* <button
                                    id="button1"
                                    // className="button1"

                                    className='button1 p-5 bg-orange-500'
                                    onClick={() => {
                                        setModalOpen(true);
                                    }}>Booking
                                </button> */}

                            </div>

                            < div className="total" >
                                <p>
                                    Booked Seat: <span id="count">&nbsp; </span>
                                </p>
                                <span id="total" style={{ position: "relative", top: "5px" }}></span>
                            </div >


                            {/* <div className="Booked Seats">
          <button onClick={handleChange}> Booked Items</button>
        </div> */}
                            {/* <Popup trigger={<button> Trigger</button>} position="right center">
          <div>Popup content here !!</div>
        </Popup> */}
                        </>
                    </div>
                    <div>
                        {/* <p>
                            Avalable Seat :  <span className='text-blue-700 font-bold '>{50}</span>
                        </p> */}


                    </div>

                    <div className="modal-action">
                        <label htmlFor="my-modal-6" className="bg-yellow-500">Close</label>
                    </div>
                </div >
                {/* <div className='w-52 h-52'>
                    <SeatRev></SeatRev>
                </div> */}
            </div >

        </div >
    );
};

export default BusModal;