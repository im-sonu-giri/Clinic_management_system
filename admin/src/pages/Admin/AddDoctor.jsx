import React, { useContext } from 'react'
import { assets } from '../../assets/assets_admin/assets'
import { useState } from 'react'
import { AdminContext } from '../../context/AdminContext'
import { toast } from 'react-toastify'
import axios from 'axios'

const AddDoctor = () => {

  const [docImg, setDocImg] = useState(false)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [experience, setExperience] = useState('1 year')
  const [fees, setFees] = useState('')
  const [speciality, setSpeciality] = useState('General Physician')
  const [degree, setDegree] = useState('')
  const [address1, setAddress1] = useState('')
  const [address2, setAddress2] = useState('')
  const [about, setAbout] = useState('')

  // backend url form the context and get the admin url
  const { backendUrl, aToken } = useContext(AdminContext)

  // apicall

  const onSubmitHandler = async (event) => {
    event.preventDefault()

    try {
      if (!docImg) {
        return toast.error('Image Not Selected')
      }

      const formData = new FormData()

      formData.append('image', docImg)
      formData.append('name', name)
      formData.append('email', email)
      formData.append('password', password)
      formData.append('experience', experience)
      formData.append('fees', fees)
      formData.append('speciality', speciality)
      formData.append('degree', degree)
      formData.append('address', JSON.stringify({ line1: address1, line2: address2 }))
      formData.append('about', about)

      //console log formdata
      formData.forEach((value, key) => {
        console.log(`${key} :${value}`);
      })

      const { data } = await axios.post(
        backendUrl + '/api/admin/add-doctor',
        formData,
        {
          headers: {
            Authorization: `Bearer ${aToken}`
          }
        }
      )

      if (data.success) {
        toast.success(data.message)
        setDocImg(false)
        setName('')
        setEmail('')
        setPassword('')
        setExperience('1 year')
        setFees('')
        setSpeciality('General Physician')
        setDegree('')
        setAddress1('')
        setAddress2('')
        setAbout('')
      } else {
        toast.error(data.message)
      }

    } catch (error) {
      console.error('Form submission error:', error)
      toast.error(error.response?.data?.message || 'Failed to add doctor. Please try again.')
    }
  }

  return (
    <div className="w-full flex justify-center px-4 sm:px-6 lg:px-8">
      <form onSubmit={onSubmitHandler}
        className="w-full max-w-5xl p-8 bg-white rounded-2xl shadow-md border m-5 overflow-y-scroll">

        {/* Heading */}
        <p className="text-xl font-semibold text-gray-800 mb-3">
          Add Doctor
        </p>

        {/* Upload Picture */}
        <div className="flex items-center gap-4 mb-10 cursor-pointer">
          <label htmlFor="doc-img" className="flex items-center gap-4 cursor-pointer">
            <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center overflow-hidden">
              <img
                className="w-8 opacity-60"
                src={docImg ? URL.createObjectURL(docImg) : assets.upload_area}
                alt=""
              />
            </div>
            <p className="text-gray-500 text-sm">
              Upload doctor <br /> picture
            </p>
          </label>
          <input
            onChange={(e) => setDocImg(e.target.files[0])}
            type="file"
            id="doc-img"
            hidden
          />
        </div>

        {/* MAIN 2 COLUMN LAYOUT */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

          {/* LEFT SIDE */}
          <div className="flex flex-col gap-5">

            {/* Doctor Name */}
            <div>
              <label className="text-sm font-medium text-gray-700">Doctor Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Name"
                className="w-full mt-1 border border-gray-200 rounded-lg px-4 py-2.5 text-sm outline-none focus:border-green-400 bg-gray-50"
              />
            </div>

            {/* Email */}
            <div>
              <label className="text-sm font-medium text-gray-700">Doctor Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                className="w-full mt-1 border border-gray-200 rounded-lg px-4 py-2.5 text-sm outline-none focus:border-green-400 bg-gray-50"
              />
            </div>

            {/* Password */}
            <div>
              <label className="text-sm font-medium text-gray-700">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                className="w-full mt-1 border border-gray-200 rounded-lg px-4 py-2.5 text-sm outline-none focus:border-green-400 bg-gray-50"
              />
            </div>

            {/* Experience */}
            <div>
              <label className="text-sm font-medium text-gray-700">Experience</label>
              <select
                value={experience}
                onChange={(e) => setExperience(e.target.value)}
                className="w-full mt-1 border border-gray-200 rounded-lg px-4 py-2.5 text-sm outline-none focus:border-green-400 bg-gray-50"
              >
                <option value="">Select experience</option>
                {[...Array(10)].map((_, i) => (
                  <option key={i}>{i + 1} year</option>
                ))}
                <option>10+ year</option>
              </select>
            </div>

            {/* Fees */}
            <div>
              <label className="text-sm font-medium text-gray-700">Fees</label>
              <input
                type="number"
                value={fees}
                onChange={(e) => setFees(e.target.value)}
                placeholder="Consultation fees"
                className="w-full mt-1 border border-gray-200 rounded-lg px-4 py-2.5 text-sm outline-none focus:border-green-400 bg-gray-50"
              />
            </div>

          </div>

          {/* RIGHT SIDE */}
          <div className="flex flex-col gap-5">

            {/* Speciality */}
            <div>
              <label className="text-sm font-medium text-gray-700">Speciality</label>
              <select
                value={speciality}
                onChange={(e) => setSpeciality(e.target.value)}
                className="w-full mt-1 border border-gray-200 rounded-lg px-4 py-2.5 text-sm outline-none focus:border-green-400 bg-gray-50"
              >
                <option>General Physician</option>
                <option>Cardiologist</option>
                <option>Dermatologist</option>
                <option>Neurologist</option>
                <option>Gastroenterologist</option>
                <option>Gynecologist</option>
              </select>
            </div>

            {/* Education */}
            <div>
              <label className="text-sm font-medium text-gray-700">Education</label>
              <input
                type="text"
                value={degree}
                onChange={(e) => setDegree(e.target.value)}
                placeholder="Education"
                className="w-full mt-1 border border-gray-200 rounded-lg px-4 py-2.5 text-sm outline-none focus:border-green-400 bg-gray-50"
              />
            </div>

            {/* Address */}
            <div>
              <label className="text-sm font-medium text-gray-700">Address</label>
              <input
                type="text"
                value={address1}
                onChange={(e) => setAddress1(e.target.value)}
                placeholder="Address Line 1"
                className="w-full mt-1 mb-2 border border-gray-200 rounded-lg px-4 py-2.5 text-sm outline-none focus:border-green-400 bg-gray-50"
              />
              <input
                type="text"
                value={address2}
                onChange={(e) => setAddress2(e.target.value)}
                placeholder="Address Line 2"
                className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm outline-none focus:border-green-400 bg-gray-50"
              />
            </div>

          </div>

        </div>

        {/* ABOUT */}
        <div className="mt-8">
          <label className="text-sm font-medium text-gray-700">About Me</label>
          <textarea
            rows={5}
            value={about}
            onChange={(e) => setAbout(e.target.value)}
            placeholder="Write about doctor"
            className="w-full mt-1 border border-gray-200 rounded-lg px-4 py-2.5 text-sm outline-none focus:border-green-400 bg-gray-50 resize-none"
          />
        </div>

        {/* BUTTON */}
        <button
          type="submit"
          className="mt-8 bg-green-500 hover:bg-green-600 text-white text-sm font-semibold px-8 py-3 rounded-lg transition shadow-sm">
          Add Doctor
        </button>

      </form>
    </div>
  )
}

export default AddDoctor