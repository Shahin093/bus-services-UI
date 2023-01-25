import React from 'react';
import { TripleMaze } from 'react-spinner-animated';
import 'react-spinner-animated/dist/index.css';


const Loader = () => {
    return (
        <div>
            <TripleMaze className="mx-auto" text={"Loading..."} bgColor={"#F0A500"}
                center={true} width={"150px"} height={"150px"} />
        </div>
    );
};

export default Loader;