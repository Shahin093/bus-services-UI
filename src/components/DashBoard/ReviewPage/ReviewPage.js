import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
// import { useIdToken } from 'react-firebase-hooks/auth';
import { Navigate } from 'react-router-dom';
// import useUserAuth from '../../../hooks/useUserAuth';
import './ReviewPage.css';
import Loader from '../../Loader/Loader';
const ReviewPage = () => {

    // img host key
    const imgageHosting = process.env.REACT_APP_imgbb_key;
    // user auth locally
    // const [user] = useUserAuth();
    // console.log(user)
    // react from 
    const { register, formState: { errors }, handleSubmit } = useForm();
    // onsubmit 
    const [dataValid, setDataValid] = useState(false);
    const onSubmit = async data => {
        console.log(data)
        const image = data.img[0];
        const formData = new FormData();
        formData.append('image', image);
        const url = `https://api.imgbb.com/1/upload?expiration=600&key=${imgageHosting}`;

        fetch(url, {
            method: "POST",
            body: formData
        })
            .then(res => res.json())
            .then(imgData => {
                // http://localhost:5000/api/v1/rating/review/
                if (!imgData.success) {
                    return <Loader></Loader>
                } else {
                    // console.log(imgData.data.url);
                    const review = {
                        name: data?.name,
                        email: data?.email,
                        ratingNumber: data?.rating,
                        description: data?.info,
                        image: imgData.data.url
                    };
                    fetch('http://localhost:5000/api/v1/rating/review/', {
                        method: 'POST',
                        body: JSON.stringify(review),
                        headers: {
                            'Content-Type': 'application/json'
                        },
                    })
                        // accessToken
                        .then(res => res.json())
                        .then(data => {
                            console.log(data)
                            toast.success(data?.message);
                            setDataValid(data)
                        });
                }
            })


    }
    return (
        <div>
            {/* <script src="https://use.fontawesome.com/a6f0361695.js"></script> */}
            <form onSubmit={handleSubmit(onSubmit)} id="feedback" className=''>
                <div class="pinfo">Your personal info</div>
                <div className="form-control w-full  form-group">
                    <label className="label">
                        <span className="label-text">name</span>
                    </label>
                    <input
                        type="name"
                        placeholder="Your Name"
                        className="input input-bordered w-full "
                        {...register("name", {
                            required: {

                                message: 'Name is Required'
                            }
                        })}
                    />
                    <label className="label">
                        {errors.name?.type === 'required' && <span className="label-text-alt text-red-500">{errors.name.message}</span>}
                    </label>
                </div>
                {/* email  */}
                <div className="form-control w-full">
                    <label className="label">
                        <span className="label-text">Email</span>
                    </label>
                    <input
                        type="email"
                        placeholder="Your Email"
                        className="input input-bordered w-full"
                        {...register("email", {
                            required: {
                                value: true,
                                message: 'Email is Required'
                            },
                            pattern: {
                                // value: /[a-z0-9]+@[a-z]+\.[a-z]{2, 3}/,
                                message: 'Provide a vilid Email'
                            }
                        })}
                    />
                    <label className="label">
                        {errors.email?.type === 'required' && <span className="label-text-alt text-red-500">{errors.email.message}</span>}
                        {errors.email?.type === 'pattern' && <span className="label-text-alt text-red-500">{errors.email.message}</span>}
                    </label>
                </div>

                <div class="pinfo">Rate our overall services.</div>

                {/* rating number  */}
                <div className='form-control w-full '>
                    <div >
                        <div class="input-group">
                            <span class="input-group-addon"><i class="fa fa-heart"></i></span>
                            <select
                                {...register("rating")}
                                class="form-control" id="rate">
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5</option>
                            </select>
                        </div>
                    </div>
                </div>

                {/* feedback description  */}
                <div class="pinfo">Write your feedback.</div>
                <div className='form-control w-full'>
                    <div>
                        <div class="input-group">
                            <span class="input-group-addon"><i class="fa fa-pencil"></i></span>
                            <textarea  {...register("info", {
                                required: {
                                    message: 'Rating info is Required'
                                }
                            })} class="form-control" id="review" rows="3"></textarea>
                            {errors.info && <p className='text-red-500'>{errors.info.message}</p>}
                        </div>
                    </div>
                </div>

                {/* img bb uploder file  */}
                <div>
                    <div className='form-control mx-auto'>
                        <label className='label'> <span className='label-text'>Photo</span></label>
                        <input type="file" {...register("img", { required: "Photo is Required" })} className='input-bordered ' />
                        {errors.img && <p className='text-red-500'>{errors.img.message}</p>}
                    </div>
                </div>

                <input className="btnn btnn-primary" type="submit" />
                {/* <button type="submit" class="btnn btnn-primary">Submit</button> */}

                {dataValid && (
                    <Navigate to="/" replace={true} />
                )}
            </form>
        </div>
    );
};

export default ReviewPage;