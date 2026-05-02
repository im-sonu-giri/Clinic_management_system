// import React from 'react'
// import { useContext } from 'react'
// import { useState } from 'react'
// import { AdminContext } from '../../context/AdminContext'
// import { useEffect } from 'react'

// const Appointments = () => {
//   const{aToken, appointments, getAllAppointments}= useContext(AdminContext)

//   useEffect(()=>{
//     if(aToken){
//       getAllAppointments()
//     }

//   },[aToken])

//   return (
//     <div className='w-full max-w-6xl m-5'>
//       <p className='mb-3 text-lg font-medium'>All Appointments</p>
//       <div className='bg-white border rounded text-sm max-h-[80vh] min-h-[60vh] overflow-y-scroll'>
//         <div className="hidden sm:grid grid-cols-[0.5fr_3fr_1fr_3fr_3fr_1fr_1fr] grid-flow-col py-3 px-6 border-b">
//           <p>#</p>
//           <p>Patient</p>
//           <p>age</p>
//           <p>Date and time</p>
//           <p>Doctor</p>
//           <p>fees</p>
//           <p>Action</p>
//         </div>
//       </div>
//       {appointments.map((item, index)=>(
//         <div 
//         key={index}>
//           <p >
//             {index+1}
//           </p>
//           <div>
//             <img src={item.userData.image} alt="" /><p>{item.userData.name}</p>
//           </div>

//         </div>
//       ))}
      
//     </div>
//   )
// }

// export default Appointments

import React, { useContext, useEffect } from 'react'
import { AdminContext } from '../../context/AdminContext'
import { AppContext } from '../../context/AppContext'
import { assets } from '../../assets/assets_admin/assets'

const Appointments = () => {

  const { aToken, appointments, getAllAppointments,cancelAppointment} = useContext(AdminContext)
  const {calculateAge }= useContext(AppContext)

  useEffect(() => {
    if (aToken) {
      getAllAppointments()
    }
  }, [aToken])

  return (
    <div className='w-full max-w-6xl mx-auto p-5'>

      <p className='mb-4 text-xl font-semibold text-gray-700'>
        All Appointments
      </p>

      <div className='bg-white border rounded-xl shadow-sm overflow-hidden'>

        {/* HEADER */}
        <div className="hidden sm:grid grid-cols-[0.5fr_2fr_1fr_2fr_2fr_1fr_1fr] py-3 px-6 bg-gray-50 border-b text-gray-600 font-medium">
          <p>#</p>
          <p>Patient</p>
          <p>Age</p>
          <p>Date & Time</p>
          <p>Doctor</p>
          <p>Fees</p>
          <p>Action</p>
        </div>

        {/* BODY */}
        <div className='max-h-[70vh] overflow-y-auto'>

          {appointments.length === 0 && (
            <p className='p-6 text-gray-500 text-center'>
              No appointments found
            </p>
          )}

          {appointments.map((item, index) => (
            <div
              key={index}
              className="grid grid-cols-1 sm:grid-cols-[0.5fr_2fr_1fr_2fr_2fr_1fr_1fr] items-center gap-3 py-4 px-6 border-b hover:bg-gray-50 transition"
            >

              {/* Index */}
              <p className='font-medium text-gray-700'>
                {index + 1}
              </p>

              {/* Patient */}
              <div className='flex items-center gap-3'>
                <img
                  className='w-10 h-10 rounded-full object-cover border'
                  src={item.userData.image}
                  alt="user"
                />
                <p>{item.userData.name}</p>
              </div>

              {/* Age */}
              <p className='max-sm:hidden'>
                {calculateAge(item.userData.dob)
                  ? calculateAge(item.userData.dob)
                  : 'N/A'}
              </p>

              {/* Date & Time */}
              <p>
                {item.slotDate.replaceAll('_', '/')} | {item.slotTime}
              </p>

              {/* Doctor */}
              <div className='flex items-center gap-2'>
                <img
                  className='w-8 h-8 rounded-full object-cover'
                  src={item.docData.image}
                  alt="doctor"
                />
                <p>{item.docData.name}</p>
              </div>

              {/* Fees */}
              <p className='font-medium text-green-600'>
                Rs. {item.amount}
              </p>
                {item.cancelled ? 
                  <span className='text-red-500 text-sm font-medium'>
                    Cancelled
                  </span>
                 : <img 
                 onClick={()=>cancelAppointment(item._id)}
                className='w-10 cursor-pointer'
                src={assets.cancel_icon} alt="" />
                }
              </div>
          ))}

        </div>
      </div>

    </div>
  )
}

export default Appointments
