import React from 'react'
import { assets } from '../assets/assets_frontend/assets'
import { Link } from "react-router-dom";

const Footer = () => {
    return (
        <div className='md:md-10'>
            <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm'>
                {/* description  */}
                <div>
                    <img src={assets.logo} alt="" className="logo mb-5 w-40" />
                    <p className='w-full md:w-2/3 text-gray-600 leading-6 text-justify'>
                        Mero Health Clinic provides accessible, reliable healthcare by connecting patients with trusted doctors. We simplify appointment booking and aim to improve healthcare through technology, compassion, and efficiency.</p>

                </div>

                {/* company */}
                <div>
                    <p className='text-xl font-medium mb-5'>Company</p>
                    <ul className='flex flex-col gap-2 text-gray-600'>
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/about">About Us</Link></li>
                        <li><Link to="/contact">Contact Us</Link></li>
                        <li>Privacy Policy</li>
                    </ul>
                </div>

                {/* get in touch */}
                <div>
                    <p className='text-xl font-medium mb-5'>Get in Touch</p>
                    <ul className='flex flex-col gap-2  text-gray-600'>
                        <li>www.sonugiri.com.np</li>
                        <li>sonugiri1410@gmail.com</li>
                    </ul>

                </div>

            </div>
            {/* copyright */}
            <hr />
            <p className='py-5 text-sm text-center'>Copyright@ 2026 Mero Health Clinic. All rights reserved.</p>

        </div>
    )
}

export default Footer
