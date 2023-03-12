import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from "react-hook-form";
import { Link } from 'react-router-dom';
import { useCreateUserWithEmailAndPassword, useSignInWithGoogle, useUpdateProfile } from 'react-firebase-hooks/auth';
import auth from '../../firebase.init';
import Loader from '../Loader/Loader';
// import useToken from '../../hooks/useToken';
const SignUp = () => {
    const navigate = useNavigate();
    const [signInWithGoogle, gUser, gLoading, gError] = useSignInWithGoogle(auth);
    const [updateProfile, updating, uError] = useUpdateProfile(auth);
    const [
        createUserWithEmailAndPassword,
        user,
        loading,
        error,
    ] = useCreateUserWithEmailAndPassword(auth);
    // const [token] = useToken(gUser || user);

    if (user || gUser) {
        navigate('/');
    }
    // if (token) {
    //     navigate('/');
    // }
    const { register, formState: { errors }, handleSubmit } = useForm();

    let signInError;
    if (gLoading || loading || updating) {
        return <Loader></Loader>
    }



    if (gError || error || uError) {
        signInError = <p className='text-red-500'><small>{gError?.message || error?.message}</small></p>
    }

    const onSubmit = async data => {

        const bus_name = "ANA";
        const email = data.email;
        const firstName = data?.name;
        const lastName = ' islam';
        const password = data.password;
        const confirmPassword = data.password;
        const role = 'user';
        const contactNumber = '01774623000';
        const imageURL = 'immmg.png';
        const databody = {
            email, firstName, lastName, password, confirmPassword, role, contactNumber, imageURL
        };

        fetch('http://localhost:5000/api/v1/user/signup', {
            method: 'POST',
            body: JSON.stringify(databody),
            headers: {
                'Content-Type': 'application/json'
            },
        })
            .then(res => res.json())
            .then(data => console.log(data));

        // console.log(data);
        await createUserWithEmailAndPassword(data.email, data.password);
        await updateProfile({ displayName: data.name });
        // console.log('update done');
        navigate('/');

    }


    return (
        <div className='flex h-screen justify-center items-center'>
            <div className="card w-96 bg-base-100 shadow-xl">
                <div className="card-body">
                    <h2 className="text-2xl font-bold">Sign Up</h2>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="form-control w-full max-w-xs">
                            <label className="label">
                                <span className="label-text">Name</span>
                            </label>
                            <input
                                type="text"
                                placeholder="Your Name"
                                className="input input-bordered w-full max-w-xs"
                                {...register("name", {
                                    required: {
                                        value: true,
                                        message: 'name is Required'
                                    }
                                })}
                            />
                            <label className="label">
                                {errors.name?.type === 'required' && <span className="label-text-alt text-red-500">{errors.name.message}</span>}
                            </label>
                        </div>
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

                        <input className=' btn  w-full max-w-xs' type="submit" value="Sign Up" />
                    </form>
                    <p><small>Already have an account<Link className='text-secondary' to='/login'>Please Login</Link></small></p>

                    <div className="divider">OR</div>
                    <button onClick={() => signInWithGoogle()} className="btn btn-outline">Continue with Google</button>
                </div>
            </div>
        </div>
    );
};

export default SignUp;