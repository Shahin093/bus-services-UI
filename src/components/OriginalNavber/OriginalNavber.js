import { signOut } from 'firebase/auth';
import React from 'react';
// import { useAuthState } from 'react-firebase-hooks/auth';
import { Link } from 'react-router-dom';
// import auth from '../../firebase.init';
import useToken from '../../hooks/useToken';
import useUserAuth from '../../hooks/useUserAuth';
// import { Link } from 'react-router-dom';
import './originalNavber.css';
const OriginalNavber = () => {
    // const [user] = useAuthState(auth);

    // user auth locally
    const [user] = useUserAuth();

    const logout = () => {
        // signOut(auth);
        localStorage.removeItem('authorization');
        window.location.reload();
    }
    const [tokens] = useToken();

    return (
        <div className="navbar bg-base-100">
            {/* Navbar design  */}
            <div className="navbar mt-2 lg:mt-14 py-5  rounded-lg">

                {/* navbar start  */}
                <div className="navbar-start">
                    <div className="dropdown">
                        <label tabIndex={"0"} className="btn btn-ghost lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                        </label>
                        <ul tabIndex={"0"} className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
                            <li><a href="/">Item 1</a></li>
                            <li><a href="/">Item 1</a></li>
                            <li><a href="/">Item 1</a></li>
                            <li tabIndex={"0"}>
                                <a href="/" className="justify-between">
                                    Parent
                                    <svg className="fill-current" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z" /></svg>
                                </a>
                                <ul className="p-2">
                                    <li><a href="/">Submenu 1</a></li>
                                    <li><a href="/">Submenu 2</a></li>
                                </ul>
                            </li>
                            <li><a href="/">Item 3</a></li>
                        </ul>
                    </div>
                    <img className='navbarImg' src="https://templatekit.jegtheme.com/shuttle/wp-content/uploads/sites/300/2022/06/logo-black-new.png" alt="" />
                </div>

                {/* navbar center  */}
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal p-0">
                        <li><Link to={'/'}>Home</Link></li>
                        <li><Link to={'/aboutSuttle'}>AboutUS</Link></li>
                        <li><Link to={'/services'}>Services</Link></li>

                        <li tabIndex={"0"}>
                            <a href="/">
                                Our bus
                                <svg className="fill-current" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><path d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z" /></svg>
                            </a>
                            <ul className="p-2 bg-white">
                                <li><a href="/">Our bus</a></li>
                                <li><a href="/">Bus Details</a></li>
                            </ul>
                        </li>

                        <li tabIndex={"0"}>
                            <a href="/">
                                Pages
                                <svg className="fill-current" xmlns="http://www.w3.org/2000/svg" strokeWidth={'20'} height="20" viewBox="0 0 24 24"><path d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z" /></svg>
                            </a>
                            <ul className="p-2 bg-white">
                                <li><a href="/">Our bus</a></li>
                                <li><a href="/">Bus Details</a></li>
                            </ul>
                        </li>
                        <li><a href="/dashboard">DashBoard</a></li>
                        <li><a href="/">Contact US</a></li>
                        <li tabIndex={"0"}>
                            {
                                tokens ?
                                    // <li onClick={logout} className='btn btn-ghost'>Sign OUt</li>
                                    <Link onClick={logout}>Sign out</Link> :

                                    <Link to='/login'>Login</Link>
                            }
                        </li>


                    </ul>
                </div>

                {/* navbar end  */}
                <div className="navbar-end">
                    <h2>{user?.email}</h2>
                    <label tabIndex={"0"} className="btn btn-ghost btn-circle avatar">
                        <div className="w-10 rounded-full">
                            <img src="https://placeimg.com/80/80/people" alt='profile-pic' />
                        </div>
                    </label>
                </div>
            </div>
        </div>

    );
};

export default OriginalNavber;