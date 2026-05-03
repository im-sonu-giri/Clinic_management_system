import React from 'react'
import { useContext } from 'react'
import { AdminContext } from '../../context/AdminContext'
import { useEffect } from 'react'
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
      <div className='flex flex-wrap gap-4 mb-8'>
        <div className='flex items-center gap-4 bg-gradient-to-br from-white to-emerald-50 p-6 min-w-64 rounded-2xl border border-emerald-100 cursor-pointer hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl'>
          <div className="p-3 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl">
            <img
              className='w-8 invert'
              src={assets.doctor_icon} alt="" />
          </div>
          <div>
            <p className='text-3xl font-bold text-gray-800 mb-1'>{dashData.doctors}</p>
            <p className='text-sm font-medium text-emerald-600'>Total Doctors</p>
          </div>
        </div>

        <div className='flex items-center gap-4 bg-gradient-to-br from-white to-blue-50 p-6 min-w-64 rounded-2xl border border-blue-100 cursor-pointer hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl'>
          <div className="p-3 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl">
            <img className='w-8 invert' src={assets.appointment_icon} alt="" />
          </div>
          <div>
            <p className='text-3xl font-bold text-gray-800 mb-1'>{dashData.appointments}</p>
            <p className='text-sm font-medium text-blue-600'>Total Appointments</p>
          </div>
        </div>

        <div className='flex items-center gap-4 bg-gradient-to-br from-white to-purple-50 p-6 min-w-64 rounded-2xl border border-purple-100 cursor-pointer hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl'>
          <div className="p-3 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl">
            <img className='w-8 invert' src={assets.patients_icon} alt="" />
          </div>
          <div>
            <p className='text-3xl font-bold text-gray-800 mb-1'>{dashData.patients}</p>
            <p className='text-sm font-medium text-purple-600'>Total Patients</p>
          </div>
        </div>

      </div>

      <div className='bg-white rounded-2xl shadow-lg overflow-hidden'>
        <div className='flex items-center gap-3 px-6 py-5 bg-gradient-to-r from-emerald-500 to-teal-600 border-b border-emerald-100'>
          <img className='w-6 invert' src={assets.list_icon} alt="" />
          <p className='font-bold text-white text-lg'>
            Latest Bookings
          </p>
        </div>
        <div className='divide-y divide-gray-100'>
          {
            dashData.latestAppointments.map((item, index) => (
              <div className='flex items-center px-6 py-4 gap-4 hover:bg-gradient-to-r hover:from-emerald-50 hover:to-teal-50 transition-all duration-200 group' key={index}>
                <div className="relative">
                  <img
                    className='rounded-full w-12 h-12 object-cover border-2 border-emerald-200 group-hover:border-emerald-400 transition-colors'
                    src={item.docData.image} alt={item.docData.name} />
                  <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white ${item.cancelled ? 'bg-red-500' : item.isCompleted ? 'bg-green-500' : 'bg-yellow-500'}`}></div>
                </div>
                <div className='flex-1'>
                  <div className="flex items-center gap-2 mb-1">
                    <p className='text-gray-900 font-semibold text-sm'>{item.docData.name}</p>
                    <span className="text-xs text-gray-500">•</span>
                    <span className="text-xs text-gray-500">{item.docData.speciality}</span>
                  </div>
                  <div className="flex items-center gap-3 text-xs text-gray-600">
                    <span className="flex items-center gap-1">
                      📅 {slotDateFormat(item.slotDate)}
                    </span>
                    <span className="flex items-center gap-1">
                      💰 Rs. {item.docData.fees}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  {item.cancelled ? (
                    <span className='px-3 py-1 bg-red-100 text-red-600 text-xs font-medium rounded-full'>
                      Cancelled
                    </span>
                  ) : item.isCompleted ? (
                    <span className='px-3 py-1 bg-green-100 text-green-600 text-xs font-medium rounded-full'>
                      Completed
                    </span>
                  ) : (
                    <div className="flex items-center gap-2">
                      <button 
                        onClick={() => cancelAppointment(item._id)}
                        className="p-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors group"
                        title="Cancel Appointment"
                      >
                        <img className='w-4 group-hover:scale-110 transition-transform' src={assets.cancel_icon} alt="Cancel" />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))
          }
        </div>
      </div>

    </div>
  )
}

export default Dashboard
