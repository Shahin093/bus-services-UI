import React from 'react';
import { useState } from 'react';
import { toast } from 'react-toastify';


const BusComfirmModal = ({ id, setModalOpen, email }) => {
    // console.log(email);
    const handleCancle = () => {
        setModalOpen(false);
        window.location.reload();
    }


    // send mail 
    const sendEmail = async () => {
        // e.preventDefault();

        const res = await fetch("/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email
            })
        });

        const data = await res.json();
        console.log(data);

        // if (data.status === 401 || !data) {
        //     console.log("error")
        // } else {
        //     setShow(true);
        //     setEmail("")
        //     console.log("Email sent")
        // }
    }

    const handleupdate = async () => {
        fetch(`http://localhost:5000/api/v1/busCollection/${id}`, {
            method: 'PATCH',
            body: JSON.stringify({
                status: 'success',
            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        })
            .then((response) => response.json())
            .then((json) => {
                console.log(json);
                if (json) {
                    // window.location.reload();
                }
                const email = json?.updateData?.email;
                console.log('email ', email)

                // send email 
                fetch('http://localhost:5000/api/v1/register', {
                    method: 'POST',
                    body: JSON.stringify({ email: email }),
                    headers: {
                        'Content-Type': 'application/json'
                    },
                })
                    .then(res => res.json())
                    .then(data => {
                        // console.log(data)
                        // console.log(data);

                        if (data?.status === 201) {
                            fetch(`http://localhost:5000/api/v1/busCollection/${id}`, {
                                method: 'PATCH',
                                body: JSON.stringify({
                                    status: 'success',
                                }),
                                headers: {
                                    'Content-type': 'application/json; charset=UTF-8',
                                },
                            })
                                .then((response) => response.json())
                                .then((mailupdateData) => {
                                    toast.success(json?.message)
                                    console.log(mailupdateData)
                                })
                        }

                    });

            });

        // window.location.reload();
    }



    return (
        <div>

            {/* <!-- Put this part before </body> tag-- > */}
            <input type="checkbox" id="my-modal-6" className="modal-toggle" />
            <div className="modal modal-bottom sm:modal-middle">
                <div className="modal-box ">
                    <div>
                        <h2>{id}</h2>
                        <h2>{email}</h2>
                        <button onClick={handleCancle} className="px-6 py-3 bg-orange-700 hover:bg-black text-white text-1xl font-bold rounded-full">Cencle</button>
                        <button onClick={handleupdate} className="px-6 py-3 bg-orange-700 hover:bg-black text-white text-1xl font-bold rounded-full">Comfirm Success</button>
                    </div>
                    <div className="modal-action">
                        <label htmlFor="my-modal-6" className="bg-yellow-500">Close</label>
                    </div>
                </div>

            </div>

        </div >
    );
};

export default BusComfirmModal;