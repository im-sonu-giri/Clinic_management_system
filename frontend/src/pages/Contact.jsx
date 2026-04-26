import React from 'react'
import { assets } from '../assets/assets_frontend/assets'

const Contact = () => {
  return (
    <div>

      {/* Heading */}
      <div className='max-w-5xl mx-auto px-4 text-center text-gray-500 text-2xl pt-10'>
        <p>
          CONTACT <span className='text-gray-700 font-semibold'>US</span>
        </p>
      </div>

      {/* Main Section */}
      <div className='max-w-5xl mx-auto px-4 my-10 flex flex-col md:flex-row items-center justify-center gap-10 mb-28 text-sm'>

        {/* Image */}
        <img
          className='w-full md:w-[360px] rounded-lg'
          src={assets.contact_image}
          alt="contact"
        />

        {/* Office Details */}
        <div className='flex flex-col justify-center items-start gap-6 text-gray-600 max-w-md'>
          
          <p className='text-lg font-semibold text-gray-800'>Our OFFICE</p>
          
          <p>Koteshwor, Kathmandu</p>

          <p>
            Contact: (+977) 1234567890 <br />
            Email: hamrohealth@gmail.com
          </p>

          <div>
            <p className='font-semibold text-lg text-gray-800'>
              Careers at Hamrohealth
            </p>
            <p>Learn more about our teams and job openings.</p>
          </div>

          <button className='border border-black px-8 py-3 rounded hover:bg-black hover:text-white transition-all duration-500'>
            Explore Jobs
          </button>

        </div>

      </div>

    </div>
  )
}

export default Contact