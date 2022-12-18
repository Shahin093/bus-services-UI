import { signOut } from 'firebase/auth';
import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Link } from 'react-router-dom';
import auth from '../../firebase.init';
// import auth from '../../firebase.init';
// import OriginalNavbar from '../OriginalNavber/OriginalNavbar';
// import Loading from '../Shared/Loading';
import './Navbar.css';
const Navbar = () => {

    const [user] = useAuthState(auth);
    const logout = () => {
        signOut(auth);
    }

    // if (loading) {
    //     return <Loading></Loading>
    // }
    const myStyle = {
        backgroundImage: `url(https://templatekit.jegtheme.com/shuttle/wp-content/uploads/sites/300/2022/06/image-7ccqBRt94dA-unsplash.jpg)`,
        backgroundColor: "Black",
        fontSize: '20px',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
    };

    return (
        <div className='w-auto absolute mb-28 banner bg-opacity-60' style={myStyle}>

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
                        <li><a href="/">Contact US</a></li>
                        <li tabIndex={"0"}>
                            {
                                user ?
                                    <li onClick={logout} className='btn btn-ghost'>Sign OUt</li> :

                                    <Link to='/login'>Login</Link>
                            }
                        </li>


                    </ul>
                </div>

                {/* navbar end  */}
                <div className="navbar-end">
                    <label tabIndex={"0"} className="btn btn-ghost btn-circle avatar">
                        <div className="w-10 rounded-full">
                            <img src="https://placeimg.com/80/80/people" alt='profile-pic' />
                        </div>
                    </label>
                </div>

            </div>
            {/* <OriginalNavbar></OriginalNavbar> */}

            {/* Banner text design  */}
            <div className='grid grid-cols-1 lg:grid-cols-2'>
                <div className="empty">

                </div>

                <div className="banner-content pt-8">
                    <div data-aos="fade-up" >
                        <h2 className='text-4xl mb-7 lg:text-6xl text-white font-bold'>We Are Best <br /> <span><span className='text-orange-600'>Bus Charter </span>Service</span> In The World</h2>
                    </div>
                    <div data-aos="fade-down">
                        <p className='text-white mb-7'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip</p>
                    </div>
                    <div className='grid grid-cols-2'>
                        <div data-aos="fade-left">
                            <button className="button px-6 py-3 rounded-full"><span>Get Started</span></button>
                        </div>


                    </div>
                </div>
            </div>


        </div>

    );
};

export default Navbar;