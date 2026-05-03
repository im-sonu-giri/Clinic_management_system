import React, { useState, useContext } from 'react'
import { AdminContext } from '../context/AdminContext'
import axios from "axios";
import { toast } from 'react-toastify';
import { DoctorContext } from '../context/DoctorContext';

const Login = () => {
    const [state, setState] = useState('Admin')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const { setAToken, backendUrl } = useContext(AdminContext)
    const {setDToken} = useContext(DoctorContext)

    const onSubmitHandler = async (event) => {
        event.preventDefault()

        try {
            // API block
            if (state === 'Admin') {
                console.log('Frontend login attempt - backendUrl:', backendUrl);
                console.log('Frontend login attempt - email:', email, 'password provided:', !!password);
                
                const { data } = await axios.post(
                    backendUrl + '/api/admin/login',
                    { email, password }
                )

                if (data.success) {
                    setAToken(data.token)
                    localStorage.setItem("aToken", data.token)
                } else {
                    toast.error(data.message)
                }
            }else{
                const {data}= await axios.post(backendUrl +'/api/doctor/login', {email, password})
                 if (data.success) {
                    setDToken(data.token)
                    localStorage.setItem("dToken", data.token)
                    console.log(data.token);
                } else {
                    toast.error(data.message)
                }
                

            }

        } catch (error) {
            console.error('Frontend login error:', error);
            console.error('Error response:', error.response?.data);
            toast.error(error.response?.data?.message || 'Login failed. Please check console for details.');
        }
    }

    return (
        <form
            onSubmit={onSubmitHandler}
            className='min-h-[80vh] flex items-center'
        >
            <div className='flex flex-col gap-3 m-auto items-start p-8 min-w-[340px] sm:min-w-96 border rounded-xl text-[#5E5E5E] text-sm shadow-lg'>

                <p className='text-2xl font-semibold m-auto'>
                    <span className='text-primary'> {state} </span> Login
                </p>

                {/* EMAIL */}
                <div className='w-full'>
                    <p>Email</p>
                    <input
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                        className='border border-[#DADADA] rounded w-full p-2 mt-1'
                        type="email"
                        required
                    />
                </div>

                {/* PASSWORD */}
                <div className='w-full'>
                    <p>Password</p>
                    <input
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                        className='border border-[#DADADA] rounded w-full p-2 mt-1'
                        type="password"
                        required
                    />
                </div>

                {/* BUTTON */}
                <button className='bg-green-500 hover:bg-green-600 text-white w-full py-2.5 rounded-lg text-base font-semibold transition shadow-md'>
                    Login
                </button>

                {/* SWITCH UI (your original logic improved styling kept same) */}
                {
                    state === 'Admin'
                        ? (
                            <p className='text-gray-400 text-sm text-center w-full mt-2'>
                                Doctor login instead?{" "}
                                <span
                                    className='text-green-400 font-medium underline decoration-green-400/50 underline-offset-4 cursor-pointer hover:text-green-300 transition'
                                    onClick={() => setState('Doctor')}
                                >
                                    Switch here
                                </span>
                            </p>
                        )
                        : (
                            <p className='text-gray-400 text-sm text-center w-full mt-2'>
                                Admin login instead?{" "}
                                <span
                                    className='text-green-400 font-medium underline decoration-green-400/50 underline-offset-4 cursor-pointer hover:text-green-300 transition'
                                    onClick={() => setState('Admin')}
                                >
                                    Switch here
                                </span>
                            </p>
                        )
                }

            </div>
        </form>
    )
}

export default Login