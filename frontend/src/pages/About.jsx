import React from 'react'
import { assets } from '../assets/assets_frontend/assets'

const About = () => {
  return (
    <div>
      <div className='text-center text-2xl pt-10 text-gray-500'>
        <p>ABOUT <span className='text-gray-700 font-medium'>US</span></p>
      </div>

      <div className='my-10 flex flex-col md:flex-row gap-16 items-center'>

        <img
          className='w-full md:max-w-[360px]'
          src={assets.about_image}
          alt=""
        />

        <div className='flex flex-col justify-center gap-6 md:w-2/4 text-sm text-gray-600 md:pl-10'>
          <p>
            Hamro Health is a modern healthcare platform focused on making medical services simple, accessible, and reliable for everyone. It connects patients with experienced doctors, allowing easy appointment booking and quick access to essential health information, helping users save time and receive better care without unnecessary hassle.
          </p>

          <p>
            Our goal is to improve healthcare experiences through technology, efficiency, and trust. Hamro Health ensures patients can find the right doctors, choose suitable time slots, and manage appointments smoothly, creating a convenient and user-friendly system that supports better health outcomes for individuals and communities.
          </p>

          <b className='text-gray-800'>Our Vision</b>

          <p>
            Hamro Health is a modern healthcare platform designed to make medical services accessible, reliable, and efficient. Our vision is to create a connected system where patients easily find doctors, book appointments, and receive quality care anytime, using technology to improve healthcare experiences for individuals and communities.
          </p>
        </div>

      </div>
      <div className='text-xl my-4'>
        <p>WHY <span className='text-gray-700 font-semibold'>CHOOSE US</span> </p>
      </div>

      <div className='flex flex-col md:flex-row mb-20'>
        <div className='border px-10 md:px-16 py-8 sm:py-16 flex flex-col gap-5 text-[15px] hover:[background-color:#388e3c] hover:text-white transition-all duration-300 cursor-pointer'>
          <b>Efficiency:</b>
          <p>Streamlined appointment scheduling that fits into your busy lifestyle.</p>
        </div>

        <div className='border px-10 md:px-16 py-8 sm:py-16 flex flex-col gap-5 text-[15px] hover:[background-color:#388e3c] hover:text-white transition-all duration-300 cursor-pointer'>
          <b>Convenience:</b>
          <p>Access to a network of trusted healthcare professionals in your area.</p>
        </div>

        <div className='border px-10 md:px-16 py-8 sm:py-16 flex flex-col gap-5 text-[15px] hover:[background-color:#388e3c] hover:text-white transition-all duration-300 cursor-pointer'>
          <b>Personalization:</b>
          <p>Tailored recommendations and reminders to help you stay on top of your health.</p>
        </div>
      </div>
    </div>
  )
}

export default About
