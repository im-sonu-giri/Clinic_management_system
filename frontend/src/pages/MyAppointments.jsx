// import React, { useContext, useEffect, useState } from 'react'
// import { AppContext } from '../context/AppContext'
// import axios from 'axios'
// import { toast } from 'react-toastify'
// import KhaltiCheckout from "khalti-checkout-web";
// import {useNavigate} from 'react-router-dom'

// const MyAppointments = () => {

//   const { backendUrl, token } = useContext(AppContext)

//   const [appointments, setAppointments] = useState([])

//   const months = [" ", "Jan", "Feb", "Mar", "Apr", "May", "Jun",
//     "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
//   const navigate = useNavigate()

//   const slotDateFormat = (slotDate) => {
//     const dateArray = slotDate.split('_')
//     return dateArray[0] + " " + months[Number(dateArray[1])] + " " + dateArray[2]
//   }

//   //  GET APPOINTMENTS
//   const getUserAppointments = async () => {
//     try {
//       const { data } = await axios.get(
//         backendUrl + '/api/user/appointments',
//         { headers: { token } }
//       )

//       if (data.success) {
//         setAppointments(data.appointments.reverse())
//       }

//     } catch (error) {
//       console.log(error)
//       toast.error(error.message)
//     }
//   }

//   // 🔥 CANCEL APPOINTMENT
//   const cancelAppointment = async (appointmentId) => {
//     try {
//       const { data } = await axios.post(
//         backendUrl + '/api/user/cancel-appointment',
//         { appointmentId },
//         { headers: { token } }
//       )

//       if (data.success) {
//         toast.success(data.message)
//         getUserAppointments()
//       } else {
//         toast.error(data.message)
//       }

//     } catch (error) {
//       console.log(error)
//       toast.error(error.message)
//     }
//   }

//   // 🔥 VERIFY PAYMENT
//   const verifyKhaltiPayment = async (payload, appointmentId) => {
//     try {
//       const { data } = await axios.post(
//         backendUrl + '/api/user/verify-khalti',
//         {
//           token: payload.token,
//           amount: payload.amount,
//           appointmentId
//         },
//         { headers: { token } }
//       )

//       if (data.success) {
//         toast.success("Payment successful")
//         getUserAppointments()
//       } else {
//         toast.error("Payment verification failed")
//       }

//     } catch (error) {
//       console.log(error)
//       toast.error(error.message)
//     }
//   }

//   // KHALTI PAYMENT
//   const appointmentKhaltipay = async (appointmentId) => {
//     getUserAppointments()
//     navigate('/my-appointments')
//     try {
//       const { data } = await axios.post(
//         backendUrl + '/api/user/payment-khaltipay',
//         { appointmentId },
//         { headers: { token } }
//       )

//       if (data.success) {

//         const config = {
//           publicKey: import.meta.env.VITE_KHALTI_PUBLIC_KEY,

//           productIdentity: appointmentId,
//           productName: "Doctor Appointment",
//           productUrl: backendUrl,

//           eventHandler: {
//             onSuccess(payload) {
//               verifyKhaltiPayment(payload, appointmentId)
//             },
//             onError(error) {
//               console.log(error)
//               toast.error("Payment failed")
//             },
//             onClose() {
//               console.log("Payment widget closed")
//             }
//           },

//           paymentPreference: [
//             "KHALTI",
//             "EBANKING",
//             "MOBILE_BANKING",
//             "CONNECT_IPS",
//             "SCT",
//           ],
//         }

//         const checkout = new KhaltiCheckout(config)

//         //amount must be in paisa
//         checkout.show({ amount: data.amount * 100 })
//       }

//     } catch (error) {
//       console.log(error)
//       toast.error(error.message)
//     }
//   }

//   useEffect(() => {
//     if (token) {
//       getUserAppointments()
//     }
//   }, [token])

//   return (
//     <div>
//       <p className='pb-3 mt-12 font-medium text-zinc-700 border-b'>
//         My Appointment
//       </p>

//       <div>
//         {appointments.map((item, index) => (
//           <div
//             className='grid grid-cols-[1fr_2fr] gap-4 sm:flex sm:gap-6 py-2 border-b'
//             key={index}
//           >

//             <div>
//               <img
//                 className='w-32 bg-light'
//                 src={item.docData.image}
//                 alt=""
//               />
//             </div>

//             <div className='flex-1 text-sm text-zinc-600'>
//               <p className='text-neutral-800 font-semibold'>
//                 {item.docData.name}
//               </p>
//               <p>{item.docData.speciality}</p>

//               <p className='text-zinc-700 font-medium mt-1'>Address:</p>
//               <p className='text-xs'>{item.docData.address.line1}</p>
//               <p className='text-xs'>{item.docData.address.line2}</p>

//               <p className='text-xs mt-1'>
//                 <span className='text-sm text-neutral-700 font-medium'>
//                   Date & Time:
//                 </span>{" "}
//                 {slotDateFormat(item.slotDate)} | {item.slotTime}
//               </p>
//             </div>

//             <div className='flex flex-col gap-2 justify-end'>

//               {!item.cancelled && !item.payment && (
//                 <button
//                   onClick={() => appointmentKhaltipay(item._id)}
//                   className='text-sm text-stone-500 sm:min-w-48 py-2 border rounded hover:bg-green-600 hover:text-white transition-all'>
//                   Pay Online
//                 </button>
//               )}

//               {!item.cancelled && (
//                 <button
//                   onClick={() => cancelAppointment(item._id)}
//                   className='text-sm text-stone-500 sm:min-w-48 py-2 border rounded hover:bg-red-600 hover:text-white transition-all'>
//                   Cancel Appointment
//                 </button>
//               )}

//               {item.cancelled && (
//                 <button className='sm:min-w-48 py-2 border border-red-500 rounded text-red-500'>
//                   Appointment Cancelled
//                 </button>
//               )}

//               {item.payment && (
//                 <button className='sm:min-w-48 py-2 border border-green-500 rounded text-green-500'>
//                   Paid
//                 </button>
//               )}

//             </div>

//           </div>
//         ))}
//       </div>
//     </div>
//   )
// }

// export default MyAppointments

import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../context/AppContext'
import axios from 'axios'
import { toast } from 'react-toastify'
import KhaltiCheckout from "khalti-checkout-web";
import { useNavigate } from 'react-router-dom'

const MyAppointments = () => {

  const { backendUrl, token } = useContext(AppContext)

  const [appointments, setAppointments] = useState([])
  const [loading, setLoading] = useState(false)

  const navigate = useNavigate()

  const months = ["", "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

  const slotDateFormat = (slotDate) => {
    const [day, month, year] = slotDate.split('_')
    return `${day} ${months[Number(month)]} ${year}`
  }

  // ================= GET APPOINTMENTS =================
  const getUserAppointments = async () => {
    try {
      setLoading(true)

      const { data } = await axios.get(
        `${backendUrl}/api/user/appointments`,
        { headers: { token } }
      )

      if (data.success) {
        setAppointments(data.appointments.reverse())
      }

    } catch (error) {
      console.log(error)
      toast.error(error.message)
    } finally {
      setLoading(false)
    }
  }

  // ================= CANCEL APPOINTMENT =================
  const cancelAppointment = async (appointmentId) => {
    try {
      const { data } = await axios.post(
        `${backendUrl}/api/user/cancel-appointment`,
        { appointmentId },
        { headers: { token } }
      )

      if (data.success) {
        toast.success("Appointment cancelled")
        getUserAppointments()
      } else {
        toast.error(data.message)
      }

    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }

  // ================= VERIFY PAYMENT =================
  const verifyKhaltiPayment = async (payload, appointmentId) => {
    try {
      const { data } = await axios.post(
        `${backendUrl}/api/user/verify-khalti`,
        {
          token: payload.token,
          amount: payload.amount,
          appointmentId
        },
        { headers: { token } }
      )

      if (data.success) {
        toast.success("Payment successful")
        getUserAppointments()
      } else {
        toast.error("Payment verification failed")
      }

    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }

  // ================= KHALTI PAYMENT =================
  const appointmentKhaltipay = async (appointmentId) => {
    try {

      const { data } = await axios.post(
        `${backendUrl}/api/user/payment-khaltipay`,
        { appointmentId },
        { headers: { token } }
      )

      if (!data.success) {
        return toast.error(data.message)
      }

      const config = {
        publicKey: import.meta.env.VITE_KHALTI_PUBLIC_KEY,

        productIdentity: appointmentId,
        productName: "Doctor Appointment",
        productUrl: window.location.origin,

        eventHandler: {
          onSuccess(payload) {
            verifyKhaltiPayment(payload, appointmentId)
          },
          onError(error) {
            console.log(error)
            toast.error("Payment failed")
          },
          onClose() {
            console.log("Payment closed")
          }
        },

        paymentPreference: [
          "KHALTI",
          "EBANKING",
          "MOBILE_BANKING",
          "CONNECT_IPS",
          "SCT"
        ],
      }

      const checkout = new KhaltiCheckout(config)

      // ⚠️ amount in paisa
      checkout.show({ amount: data.amount * 100 })

    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }

  useEffect(() => {
    if (token) {
      getUserAppointments()
    }
  }, [token])

  // ================= UI =================
  return (
    <div className="max-w-5xl mx-auto px-4">

      <p className="pb-3 mt-12 font-semibold text-xl text-zinc-700 border-b">
        My Appointments
      </p>

      {loading ? (
        <p className="mt-6 text-gray-500">Loading appointments...</p>
      ) : (
        <div className="mt-6 space-y-4">

          {appointments.map((item, index) => (
            <div
              key={index}
              className="flex flex-col sm:flex-row gap-4 p-4 border rounded-xl shadow-sm bg-white"
            >

              {/* Doctor Image */}
              <img
                className="w-28 h-28 object-cover rounded-lg"
                src={item.docData.image}
                alt="doctor"
              />

              {/* Info */}
              <div className="flex-1 text-sm text-zinc-600">

                <p className="text-lg font-semibold text-neutral-800">
                  {item.docData.name}
                </p>

                <p>{item.docData.speciality}</p>

                <div className="mt-2">
                  <p className="font-medium">Address</p>
                  <p className="text-xs">{item.docData.address.line1}</p>
                  <p className="text-xs">{item.docData.address.line2}</p>
                </div>

                <p className="mt-2 text-sm">
                  <span className="font-medium">Date & Time: </span>
                  {slotDateFormat(item.slotDate)} | {item.slotTime}
                </p>
              </div>

              {/* Actions */}
              <div className="flex flex-col gap-2 justify-center">

                {!item.cancelled && !item.payment && !item.isCompleted && (
                  <button
                    onClick={() => appointmentKhaltipay(item._id)}
                    className="px-4 py-2 text-sm border rounded-md hover:bg-green-600 hover:text-white transition"
                  >
                    Pay Online
                  </button>
                )}

                {!item.cancelled && !item.payment && !item.isCompleted && (
                  <button
                    onClick={() => cancelAppointment(item._id)}
                    className="px-4 py-2 text-sm border rounded-md hover:bg-red-600 hover:text-white transition"
                  >
                    Cancel
                  </button>
                )}

                {item.cancelled && !item.isCompleted &&(
                  <span className="px-4 py-2 text-sm border border-red-500 text-red-500 rounded-md text-center">
                    Cancelled
                  </span>
                )}

                {item.payment && !item.isCompleted &&(
                  <span className="px-4 py-2 text-sm border border-green-500 text-green-600 rounded-md text-center">
                    Paid
                  </span>
                )}
                {item.isCompleted && <button className='sm:min-w-48 py-2 border border-green-500 rounded text-green-500'>completed</button> }

              </div>

            </div>
          ))}

        </div>
      )}

    </div>
  )
}

export default MyAppointments