import React, { useContext, useEffect } from 'react'
import { AdminContext } from '../../context/AdminContext'
import { assets } from '../../assets/assets_admin/assets'
import { AppContext } from '../../context/AppContext'

const Dashboard = () => {

  const { aToken, getDashData, cancelAppointment, dashData } = useContext(AdminContext)
  const { slotDateFormat } = useContext(AppContext)

  useEffect(() => {
    if (aToken) {
      getDashData()
    }
  }, [aToken])

  return dashData && (
    <div className='m-5'>

      {/* STATS CARDS */}
      <div className='flex flex-wrap gap-4 mb-8'>

        <div className='flex items-center gap-4 bg-gradient-to-br from-white to-emerald-50 p-6 min-w-64 rounded-2xl border border-emerald-100 cursor-pointer hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl'>
          <div className="p-3 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl">
            <img className='w-8 invert' src={assets.doctor_icon} alt="" />
          </div>
          <div>
            <p className='text-3xl font-bold text-gray-800'>{dashData.doctors}</p>
            <p className='text-sm text-emerald-600 font-medium'>Total Doctors</p>
          </div>
        </div>

        <div className='flex items-center gap-4 bg-gradient-to-br from-white to-blue-50 p-6 min-w-64 rounded-2xl border border-blue-100 cursor-pointer hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl'>
          <div className="p-3 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl">
            <img className='w-8 invert' src={assets.appointment_icon} alt="" />
          </div>
          <div>
            <p className='text-3xl font-bold text-gray-800'>{dashData.appointments}</p>
            <p className='text-sm text-blue-600 font-medium'>Total Appointments</p>
          </div>
        </div>

        <div className='flex items-center gap-4 bg-gradient-to-br from-white to-purple-50 p-6 min-w-64 rounded-2xl border border-purple-100 cursor-pointer hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl'>
          <div className="p-3 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl">
            <img className='w-8 invert' src={assets.patients_icon} alt="" />
          </div>
          <div>
            <p className='text-3xl font-bold text-gray-800'>{dashData.patients}</p>
            <p className='text-sm text-purple-600 font-medium'>Total Patients</p>
          </div>
        </div>

      </div>

      {/* LATEST BOOKINGS */}
      <div className='bg-white rounded-2xl shadow-lg overflow-hidden'>

        <div className='flex items-center gap-3 px-6 py-5 bg-gradient-to-r from-emerald-500 to-teal-600'>
          <img className='w-6 invert' src={assets.list_icon} alt="" />
          <p className='font-bold text-white text-lg'>Latest Bookings</p>
        </div>

        <div className='divide-y divide-gray-100'>

          {(dashData.latestAppointments || []).map((item, index) => (
            <div
              key={index}
              className='flex items-center px-6 py-4 gap-4 hover:bg-emerald-50 transition-all'
            >

              <img
                className='rounded-full w-12 h-12 object-cover border'
                src={item.docData.image}
                alt=""
              />

              <div className='flex-1'>
                <p className='font-semibold text-gray-800'>{item.docData.name}</p>
                <p className='text-sm text-gray-600'>
                  📅 {slotDateFormat(item.slotDate)}
                </p>
              </div>

              <div>
                {item.cancelled ? (
                  <span className='text-red-500 text-sm font-medium'>Cancelled</span>
                ) : item.isCompleted ? (
                  <span className='text-green-500 text-sm font-medium'>Completed</span>
                ) : (
                  <img
                    onClick={() => cancelAppointment(item._id)}
                    className='w-6 cursor-pointer'
                    src={assets.cancel_icon}
                    alt=""
                  />
                )}
              </div>

            </div>
          ))}

        </div>
      </div>

    </div>
  )
}

export default Dashboard