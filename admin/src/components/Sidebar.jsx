import React, { useContext } from 'react'
import { AdminContext } from '../context/AdminContext'
import { NavLink } from "react-router-dom";
import { assets } from '../assets/assets_admin/assets';

const Sidebar = () => {
    const { aToken } = useContext(AdminContext)
    return (
        <div className='min-h-screen bg-white border-r'>
            {
                aToken && <ul className='text-[#515151] mt-5'>
                    <NavLink
                        className={({ isActive }) =>
                            `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive ? 'bg-[#E8F5E9] border-r-4 border-[#81C784]' : ''
                            }`
                        }
                        to={'/admin-dashboard'}>
                        <img 
                        className="w-5 h-5"
                        src={assets.home_icon} alt="" />
                        <p>Dashboard</p>
                    </NavLink>

                    <NavLink 
                    className={({ isActive }) =>
                            `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive ? 'bg-[#E8F5E9] border-r-4 border-[#81C784]' : ''
                            }`
                        }
                    to={'/all-appointments'}>
                        <img 
                        className="w-5 h-5"
                        src={assets.appointments_icon} alt="" />
                        <p>Appointments</p>
                    </NavLink>

                    <NavLink 
                    className={({ isActive }) =>
                            `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive ? 'bg-[#E8F5E9] border-r-4 border-[#81C784]' : ''
                            }`
                        }
                    to={'/add-doctor'}>
                        <img 
                        className="w-5 h-5"
                        src={assets.add_icon} alt="" />
                        <p>Add Doctor</p>
                    </NavLink>

                    <NavLink 
                    className={({ isActive }) =>
                            `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive ? 'bg-[#E8F5E9] border-r-4 border-[#81C784]' : ''
                            }`
                        }
                    to={'/doctor-list'}>
                        <img 
                        className="w-5 h-5"
                        src={assets.people_icon} alt="" />
                        <p>Doctors List</p>
                    </NavLink>
                </ul>
            }

        </div>
    )
}

export default Sidebar
