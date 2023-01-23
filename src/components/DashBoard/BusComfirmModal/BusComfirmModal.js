import React from 'react';
import { useState } from 'react';

const BusComfirmModal = ({ id, setModalOpen }) => {
    console.log(id);
    const handleCancle = () => {
        setModalOpen(false);
        window.location.reload();
    }

    const handleupdate = () => {
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
                if (json) {
                    window.location.reload();
                }
                // setModalOpen(false)
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