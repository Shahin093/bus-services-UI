import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useForm } from 'react-hook-form';
import auth from '../../firebase.init';
import SeatBookingModal from '../SeatBookingModal/SeatBookingModal';
import './SeatRev.css';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Link } from 'react-router-dom';

const SeatRev = ({ bookingBus }) => {

    // modal 
    const [modalOpen, setModalOpen] = useState(false);

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
                alert("Already booked,Please Select Another Seat");
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
    };





    // const [sl, setSl] = useState([]);
    // console.log(sl);
    var btn = document.querySelectorAll(".btn");

    let occ = JSON.parse(localStorage.getItem("booked")) || [];

    let selected = JSON.parse(localStorage.getItem("tickets1")) || [];
    // console.log(selected);
    useEffect(() => {
        // console.log("hello world");

        // setSl(selected);
        // console.log(selected);
        // console.log(btn);
        Object?.values(btn)?.map((value) => {
            if (occ.includes(value.innerText)) {
                // console.log("val" + value.innerText);
                value.classList.add("occupied");
                // console.log("hello");
            }
            if (selected.includes(value.innerText)) {
                // console.log("val" + value.innerText);
                value.classList.add("selected");
                // console.log("hello");
            }
        });

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



    var items = list.map((i) => {
        return (
            <div>
                <div className="grid grid-cols-2 lg:grid-cols-5">

                    <div className="container">
                        <button
                            className="btn"
                            style={{ margin: 10 }}
                            type="button"
                            onClick={handle}
                            class="btn btn-primary"
                        >
                            {i.seat1}
                        </button>
                        <button
                            className="btn"
                            style={{ margin: 10 }}
                            type="button"
                            onClick={handle}
                            class="btn btn-primary"
                        >
                            {i.seat2}
                        </button>
                        <button
                            className="btn"
                            style={{ margin: 10 }}
                            type="button"
                            onClick={handle}
                            class="btn btn-primary"
                        >
                            {i.seat3}
                        </button>
                        <button
                            className="btn"
                            style={{ margin: 10 }}
                            type="button"
                            onClick={handle}
                            class="btn btn-primary"
                        >
                            {i.seat4}
                        </button>
                    </div>
                </div>
            </div>
        );
    });

    return (
        <>
            < div class="Book-seat" >
                <p>
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
                </p>
                <></>
                <div id="button1"></div>
            </div > {" "}
            < div className="grid1" > {items}</div >
            <div className="App">
                <button
                    id="button1"
                    // className="button1"

                    className='button1 p-5 bg-orange-500'
                    onClick={() => {
                        setModalOpen(true);
                    }}>Booking
                </button>
                {modalOpen && <SeatBookingModal selected={selected} setOpenModal={setModalOpen} />}
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
    );
};

export default SeatRev;