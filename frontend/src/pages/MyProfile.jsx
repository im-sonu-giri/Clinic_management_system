import React, { useState } from 'react'
import { assets } from '../assets/assets_frontend/assets'

const MyProfile = () => {
  const [userData, setUserData] = useState({
    name: "Sonu giri",
    Image: assets.profile_pic,
    email: 'sonu@gmail.com',
    phone: '9812345676',
    address: {
      line1: 'amarawoti marga',
      line2: 'koteshwor,kathmandu',
    },
    gender: 'female',
    dob: '2003-06-08'
  })

  const [isEdit, setIsEdit] = useState(false)

  return (
    <div className='max-w-lg mx-auto flex flex-col gap-3 text-sm bg-white p-6 rounded-2xl shadow-lg border border-gray-100'>

      <img
        className='w-36 h-36 object-cover rounded-full border-4 border-gray-100 shadow-sm'
        src={userData.Image}
        alt=""
      />

      {
        isEdit
          ? (
            <input
              className='bg-gray-50 text-3xl font-medium max-w-60 mt-4 px-2 py-1 rounded-md border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary'
              type='text'
              value={userData.name}
              onChange={e =>
                setUserData(prev => ({
                  ...prev,
                  name: e.target.value
                }))
              }
            />
          )
          : <p className='font-medium text-3xl text-neutral-800 mt-4'>{userData.name}</p>
      }

      <hr className='h-[1px] bg-gray-200 border-none' />

      <div>
        <p className='text-gray-500 underline mt-3 font-medium tracking-wide'>Contact Information</p>

        <div className='grid grid-cols-[1fr_3fr] gap-y-3 mt-3 text-neutral-700'>

          <p className='font-medium'>Email id:</p>
          <p className='text-primary font-medium'>{userData.email}</p>

          <p className='font-medium'>Phone:</p>
          {
            isEdit
              ? (
                <input
                  className='bg-gray-50 max-w-52 px-2 py-1 rounded border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary'
                  type='text'
                  value={userData.phone}
                  onChange={e =>
                    setUserData(prev => ({
                      ...prev,
                      phone: e.target.value
                    }))
                  }
                />
              )
              : <p className='text-gray-600'>{userData.phone}</p>
          }

          <p className='font-medium'>Address:</p>
          {
            isEdit ?
              <p>
                <input
                  className='bg-gray-50 px-2 py-1 rounded border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary'
                  type="text"
                  onChange={(e) => setUserData(prev => ({
                    ...prev,
                    address: {
                      ...prev.address,
                      line1: e.target.value
                    }
                  }))}
                  value={userData.address.line1}
                />
                <br />

                <input
                  className='bg-gray-50 mt-2 px-2 py-1 rounded border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary'
                  type="text"
                  onChange={(e) => setUserData(prev => ({
                    ...prev,
                    address: {
                      ...prev.address,
                      line2: e.target.value
                    }
                  }))}
                  value={userData.address.line2}
                />
              </p>
              :
              <p className='text-gray-500 leading-relaxed'>
                {userData.address.line1}
                <br />
                {userData.address.line2}
              </p>
          }

        </div>
      </div>

      <div>
        <p className='text-gray-500 underline mt-3 font-medium tracking-wide'>BASIC INFORMATION</p>

        <div className='grid grid-cols-[1fr_3fr] gap-y-3 mt-3 text-neutral-700'>

          <p className='font-medium'>Gender:</p>

          {
            isEdit ? (
              <select
                className='max-w-24 bg-gray-50 px-2 py-1 rounded border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary'
                onChange={(e) =>
                  setUserData(prev => ({
                    ...prev,
                    gender: e.target.value
                  }))
                }
                value={userData.gender}
              >
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            ) : (
              <p className='text-gray-500'>{userData.gender}</p>
            )
          }

          <p className='font-medium'>Birthday:</p>

          {
            isEdit ?
              <input
                className='max-w-32 bg-gray-50 px-2 py-1 rounded border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary'
                type="date"
                onChange={(e) =>
                  setUserData(prev => ({
                    ...prev,
                    dob: e.target.value
                  }))
                }
                value={userData.dob}
              />
              :
              <p className='text-gray-500'>{userData.dob}</p>
          }

        </div>
      </div>

      <div className='mt-10'>
        {
          isEdit ?
            <button
              className='border border-[#388e3c] px-8 py-2 rounded-full text-[#388e3c] hover:bg-[#388e3c] hover:text-white transition-all duration-200'
              onClick={() => setIsEdit(false)}
            >
              Save Information
            </button>
            :
            <button
              className='border border-[#388e3c] px-8 py-2 rounded-full bg-[#388e3c] text-white hover:bg-white hover:text-[#388e3c] transition-all duration-200'
              onClick={() => setIsEdit(true)}
            >
              Edit
            </button>
        }
      </div>

    </div>
  )
}

export default MyProfile