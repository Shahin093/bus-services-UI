import React, { useEffect, useState } from 'react';
import { useSignInWithEmailAndPassword, useSignInWithGoogle } from 'react-firebase-hooks/auth';
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import auth from '../../firebase.init';
import useAdmin from '../../hooks/useAdmin';
import useToken from '../../hooks/useToken';
import Loader from '../Loader/Loader';
import { toast } from 'react-toastify';
const Login = () => {
    let navigate = useNavigate();
    let location = useLocation();
    let from = location.state?.from?.pathname || "/";
    const [signInWithGoogle, gUser, gLoading, gError] = useSignInWithGoogle(auth);
    const [
        signInWithEmailAndPassword,
        user,
        loading,
        error,
    ] = useSignInWithEmailAndPassword(auth);

    // const [token, setToken] = useState(" ");


    const { register, formState: { errors }, handleSubmit } = useForm();

    const onSubmit = (data) => {
        // data.preventDefault();
        const emailauth = data.email;
        const databody = {
            email: data.email,
            password: data.password
        };
        // console.log(databody);
        fetch('http://localhost:5000/api/v1/user/login', {
            method: 'POST',
            body: JSON.stringify(databody),
            headers: {
                'Content-Type': 'application/json'
            },
        })
            // accessToken
            .then(res => res.json())
            .then(data => {
                // console.log(data)
                // useToken(data?.data?.token);
                // console.log(data?.data?.user?.email)
                // console.log(data?.data?.token);
                // setToken(data?.data?.token);
                // console.log(data?.data?.user?.email);
                // console.log(data?.data);
                localStorage.setItem('authorization', data?.data?.user?.email);
                toast.success(data?.message);
            });

        // console.log(token);

        // console.log(data);
        signInWithEmailAndPassword(data.email, data.password);

        // window.location.reload();

        // console.log(data)
    }







    let signInError;

    const [tokens] = useToken();
    // const [admin] = useAdmin();
    // console.log(admin);
    const us = user || gUser;
    useEffect(() => {
        if (tokens) {
            navigate(from, { replace: true });
            // console.log('you founded a token')
        }
        if (us) {
            navigate(from, { replace: true });
        }

    }, [tokens, us, from, navigate])

    if (gLoading || loading) {
        return <Loader></Loader>
    }

    if (gError || error) {
        signInError = <p className='text-red-500'><small>{gError?.message || error?.message}</small></p>
    }


    return (
        <div className='flex h-screen justify-center items-center'>
            <div className="card w-96 bg-base-100 shadow-xl">
                <div className="card-body">
                    <h2 className="text-2xl font-bold">Login</h2>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="form-control w-full max-w-xs">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input
                                type="email"
                                placeholder="Your Email"
                                className="input input-bordered w-full max-w-xs"
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
                        <div className="form-control w-full max-w-xs">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <input
                                type="password"
                                placeholder="password"
                                className="input input-bordered w-full max-w-xs"
                                {...register("password", {
                                    required: {
                                        value: true,
                                        message: 'password is Required'
                                    },
                                    minLength: {
                                        value: 6,
                                        message: 'Provide a vilid Password'
                                    }
                                })}
                            />
                            <label className="label">
                                {errors.password?.type === 'required' && <span className="label-text-alt text-red-500">{errors.password.message}</span>}
                                {errors.password?.type === 'minLength' && <span className="label-text-alt text-red-500">{errors.password.message}</span>}
                            </label>
                        </div>

                        {signInError}

                        <input className=' btn  w-full max-w-xs' type="submit" value="LOgin" />
                    </form>
                    <p><small>New to Doctors Portal <Link className='text-secondary' to='/signup'>Create New Account</Link></small></p>

                    <div className="divider">OR</div>
                    <button onClick={() => signInWithGoogle()} className="btn btn-outline">Continue with Google</button>
                </div>
            </div>
        </div>
    );
};

export default Login;