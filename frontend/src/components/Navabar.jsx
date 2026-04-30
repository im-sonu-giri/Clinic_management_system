import React, { useState } from 'react'
import { assets } from '../assets/assets_frontend/assets'
import { NavLink, useNavigate } from 'react-router-dom'
import { useContext } from 'react'
import { AppContext } from '../context/AppContext'

const Navabar = () => {

    const navigate = useNavigate()
    const {token, setToken, userData} = useContext(AppContext)
    const [showMenu, setShowMenu] = useState(false);
    // const [token, setToken] = useState(true);

    const logout = () =>{
        setToken(false)
        localStorage.removeItem('token')
    }

    return (
        <div className="flex items-center justify-between text-sm py-4 mb-5 border-b border-gray-200 bg-white shadow-sm px-4 md:px-8">

            <img
                onClick={() => navigate('/')}
                src={assets.logo}
                alt=""
                className="logo w-44 cursor-pointer"
            />

            <ul className='hidden md:flex items-center gap-6 font-medium text-gray-600'>

                <NavLink to="/">
                    <li className='py-1 hover:text-primary transition-all'>Home</li>
                </NavLink>

                <NavLink to="/doctors">
                    <li className='py-1 hover:text-primary transition-all'>All Doctor</li>
                </NavLink>

                <NavLink to="/about">
                    <li className='py-1 hover:text-primary transition-all'>About</li>
                </NavLink>

                <NavLink to="/contact">
                    <li className='py-1 hover:text-primary transition-all'>Contact</li>
                </NavLink>

            </ul>

            <div className="flex items-center gap-4">

                {token && userData ? (
                    <div className='flex items-center gap-2 cursor-pointer group relative'>

                         <img
                            className='w-9 h-9 rounded-full object-cover border border-gray-200'
                            src={userData.image}
                            alt=""
                        />

                        <img
                            className='w-2.5 opacity-70'
                            src={assets.dropdown_icon}
                            alt=""
                        />

                        <div className="absolute right-0 top-10 z-20 hidden group-hover:block">

                            <div className='min-w-48 bg-white border border-gray-100 rounded-xl shadow-lg flex flex-col gap-3 p-4 text-gray-600'>

                                <p onClick={() => navigate('/my-profile')} className="hover:text-primary cursor-pointer transition-all">
                                    My Profile
                                </p>

                                <p onClick={() => navigate('/my-appointments')} className="hover:text-primary cursor-pointer transition-all">
                                    My Appointment
                                </p>

                                <p onClick={logout} className="hover:text-red-500 cursor-pointer transition-all">
                                    Logout
                                </p>

                            </div>

                        </div>

                    </div>
                ) : (
                    <button
                        onClick={() => navigate("/login")}
                        className='bg-primary hover:opacity-90 text-white px-8 py-2.5 rounded-full font-medium shadow-sm transition-all'
                    >
                        Create Account
                    </button>
                )}

                <img
                    onClick={() => setShowMenu(true)}
                    className='w-6 md:hidden cursor-pointer'
                    src={assets.menu_icon}
                    alt=""
                />

                {/* mobile menu */}
                <div className={`${showMenu ? 'fixed w-full' : 'h-0 w-0'} md:hidden right-0 top-0 bottom-0 z-20 overflow-hidden bg-white transition-all`}>

                    <div className='flex items-center justify-between px-5 py-6 border-b'>

                        <img className='w-36' src={assets.logo} alt="" />

                        <img
                            className='w-7 cursor-pointer'
                            onClick={() => setShowMenu(false)}
                            src={assets.cross_icon}
                            alt=""
                        />

                    </div>

                    <ul className='flex flex-col items-center gap-3 mt-8 px-5 text-lg font-medium text-gray-700'>

                        <NavLink onClick={() => setShowMenu(false)} to='/'>
                            <p className='px-4 py-2 rounded hover:text-primary transition-all'>Home</p>
                        </NavLink>

                        <NavLink onClick={() => setShowMenu(false)} to='/doctors'>
                            <p className='px-4 py-2 rounded hover:text-primary transition-all'>ALL DOCTORS</p>
                        </NavLink>

                        <NavLink onClick={() => setShowMenu(false)} to='/about'>
                            <p className='px-4 py-2 rounded hover:text-primary transition-all'>ABOUT</p>
                        </NavLink>

                        <NavLink onClick={() => setShowMenu(false)} to='/contact'>
                            <p className='px-4 py-2 rounded hover:text-primary transition-all'>CONTACT</p>
                        </NavLink>

                    </ul>

                </div>

            </div>

        </div>
    )
}

export default Navabar