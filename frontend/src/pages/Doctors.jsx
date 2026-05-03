import React, { useContext, useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext'

const Doctors = () => {
  const { speciality } = useParams()
  const { doctors } = useContext(AppContext)
  const navigate = useNavigate()
  const [filterDoc, setFilterDoc] = useState([])
  const [showFilter, setShowFilter] = useState(false)

  const applyFilter = () => {
    // if we find the speciality in the url then we will filter the doctors based on speciality and set it to filterDoc state otherwise we will  show all doctors
    if (speciality) {
      setFilterDoc(doctors.filter(doc => 
        doc.speciality.toLowerCase().trim() === speciality.toLowerCase().trim()
      ))
    } else {
      setFilterDoc(doctors)
    }
  }

  useEffect(() => {
    applyFilter()
  }, [doctors, speciality])

  return (
    <div>
      <p className='text-gray-600'> Browse through the doctor specialist.</p>

        <div className='flex flex-col sm:flex-row items-start gap-6 mt-6'>
        <button
          className={`py-2 px-4 border-2 rounded-lg text-sm font-medium transition-all duration-300 sm:hidden shadow-sm ${showFilter ? 'bg-gradient-to-r from-emerald-500 to-teal-600 text-white border-emerald-500 shadow-lg transform scale-105' : 'bg-white text-gray-700 border-gray-200 hover:border-emerald-300 hover:shadow-md'}`}
          onClick={() => setShowFilter(prev => !prev)}
        >
          {showFilter ? '✕ Clear Filters' : '☰ Filters'}
        </button>

        {/* for speciality  */}
        <div className={`flex-col gap-3 text-sm ${showFilter ? 'flex' : 'hidden sm:flex'}`}>

          <p onClick={() => speciality === 'General Physician' ? navigate('/doctors') : navigate('/doctors/General Physician')}
            className={`w-[94vw] sm:w-auto py-2.5 px-4 border-2 rounded-lg font-medium transition-all duration-300 cursor-pointer shadow-sm hover:shadow-md transform hover:-translate-y-0.5 ${speciality === "General Physician" ? "bg-gradient-to-r from-emerald-500 to-teal-600 text-white border-emerald-500 shadow-lg" : "bg-white text-gray-700 border-gray-200 hover:border-emerald-300 hover:bg-emerald-50"}`}>
            General Physician
          </p>

          <p onClick={() => speciality === 'Gynecologist' ? navigate('/doctors') : navigate('/doctors/Gynecologist')}
            className={`w-[94vw] sm:w-auto py-2.5 px-4 border-2 rounded-lg font-medium transition-all duration-300 cursor-pointer shadow-sm hover:shadow-md transform hover:-translate-y-0.5 ${speciality === "Gynecologist" ? "bg-gradient-to-r from-emerald-500 to-teal-600 text-white border-emerald-500 shadow-lg" : "bg-white text-gray-700 border-gray-200 hover:border-emerald-300 hover:bg-emerald-50"}`}>
            Gynecologist
          </p>

          <p onClick={() => speciality === 'Dermatologist' ? navigate('/doctors') : navigate('/doctors/Dermatologist')}
            className={`w-[94vw] sm:w-auto py-2.5 px-4 border-2 rounded-lg font-medium transition-all duration-300 cursor-pointer shadow-sm hover:shadow-md transform hover:-translate-y-0.5 ${speciality === "Dermatologist" ? "bg-gradient-to-r from-emerald-500 to-teal-600 text-white border-emerald-500 shadow-lg" : "bg-white text-gray-700 border-gray-200 hover:border-emerald-300 hover:bg-emerald-50"}`}>
          Dermatologist
          </p>

          <p onClick={() => speciality === 'Pediatricians' ? navigate('/doctors') : navigate('/doctors/Pediatricians')}
            className={`w-[94vw] sm:w-auto py-2.5 px-4 border-2 rounded-lg font-medium transition-all duration-300 cursor-pointer shadow-sm hover:shadow-md transform hover:-translate-y-0.5 ${speciality === "Pediatricians" ? "bg-gradient-to-r from-emerald-500 to-teal-600 text-white border-emerald-500 shadow-lg" : "bg-white text-gray-700 border-gray-200 hover:border-emerald-300 hover:bg-emerald-50"}`}>
            Pediatricians
          </p>

          <p onClick={() => speciality === 'Neurologist' ? navigate('/doctors') : navigate('/doctors/Neurologist')}
            className={`w-[94vw] sm:w-auto py-2.5 px-4 border-2 rounded-lg font-medium transition-all duration-300 cursor-pointer shadow-sm hover:shadow-md transform hover:-translate-y-0.5 ${speciality === "Neurologist" ? "bg-gradient-to-r from-emerald-500 to-teal-600 text-white border-emerald-500 shadow-lg" : "bg-white text-gray-700 border-gray-200 hover:border-emerald-300 hover:bg-emerald-50"}`}>
             Neurologist
          </p>

          <p onClick={() => speciality === 'Cardiologist' ? navigate('/doctors') : navigate('/doctors/Cardiologist')}
            className={`w-[94vw] sm:w-auto py-2.5 px-4 border-2 rounded-lg font-medium transition-all duration-300 cursor-pointer shadow-sm hover:shadow-md transform hover:-translate-y-0.5 ${speciality === "Cardiologist" ? "bg-gradient-to-r from-emerald-500 to-teal-600 text-white border-emerald-500 shadow-lg" : "bg-white text-gray-700 border-gray-200 hover:border-emerald-300 hover:bg-emerald-50"}`}>
            Cardiologist
          </p>

          <p onClick={() => speciality === 'Gastroenterologist' ? navigate('/doctors') : navigate('/doctors/Gastroenterologist')}
            className={`w-[94vw] sm:w-auto py-2.5 px-4 border-2 rounded-lg font-medium transition-all duration-300 cursor-pointer shadow-sm hover:shadow-md transform hover:-translate-y-0.5 ${speciality === "Gastroenterologist" ? "bg-gradient-to-r from-emerald-500 to-teal-600 text-white border-emerald-500 shadow-lg" : "bg-white text-gray-700 border-gray-200 hover:border-emerald-300 hover:bg-emerald-50"}`}>
            Gastroenterologist
          </p>

        </div>

        {/* for doctor profile */}
        <div className='w-full grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-6 gap-y-8 mt-8'>
          {
            filterDoc.map((item, index) => (
              <div
                key={index}
                onClick={() => navigate(`/appointment/${item._id}`)}
                className="group bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden cursor-pointer transform transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:border-emerald-300"
              >

                <div className="relative overflow-hidden bg-gradient-to-br from-emerald-50 to-teal-50">
                  <img
                    className='w-full h-56 object-cover transition-transform duration-500 group-hover:scale-110'
                    src={item.image}
                    alt={item.name}
                  />
                  <div className={`absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-medium backdrop-blur-sm ${item.available ? 'bg-emerald-500/90 text-white' : 'bg-gray-500/90 text-white'}`}>
                    {item.available ? '✓ Available' : '✗ Busy'}
                  </div>
                </div>

                <div className='p-6'>
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <h3 className='text-gray-900 text-xl font-bold mb-1 group-hover:text-emerald-600 transition-colors'>{item.name}</h3>
                      <p className='text-gray-600 text-sm font-medium'>{item.speciality}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-gray-500 mb-1">Experience</p>
                      <p className="text-sm font-semibold text-emerald-600">{item.experience || 'N/A'}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-gray-500">Fees:</span>
                      <span className="text-sm font-bold text-gray-900">Rs. {item.fees || 'N/A'}</span>
                    </div>
                    <button className="px-4 py-2 bg-gradient-to-r from-emerald-500 to-teal-600 text-white text-sm font-medium rounded-lg hover:from-emerald-600 hover:to-teal-700 transition-all duration-300 transform hover:scale-105">
                      Book Now
                    </button>
                  </div>
                </div>

              </div>
            ))
          }
        </div>
      </div>

    </div>
  )
}

export default Doctors