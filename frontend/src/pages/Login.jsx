import React, { useState } from 'react'

const Login = () => {
  const [state, setState] = useState('Sign Up')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')

  const onSubmitHandler = async (event) => {
    event.preventDefault()
  }

  return (
    <form className='min-h-[80vh] flex items-center justify-center bg-gradient-to-b from-gray-50 to-gray-100 px-4'>

      <div className='flex flex-col gap-4 m-auto items-start p-10 w-full max-w-md bg-white border border-gray-200 rounded-2xl shadow-2xl'>

        <p className='text-3xl font-semibold text-gray-800 tracking-tight leading-tight'>
          {state === 'Sign Up' ? "create Account" : 'Login'}
        </p>

        <p className='text-sm text-gray-500 -mt-2'>
          Please {state === 'Sign Up' ? 'sign up' : 'Log in'} to book appointments
        </p>
        {state === 'Sign Up' && 
        <div className='w-full'>
          <p className='text-sm font-medium text-gray-600 mb-1'>Full Name</p>
          <input
            className='border border-gray-300 rounded-lg w-full p-3 mt-1 text-sm 
            focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 
            hover:border-green-400 transition-all'
            type="text"
            onChange={(e) => setName(e.target.value)}
            value={name}
            required
          />
        </div> 
        }

        {/* Full Name */}
        

        {/* Email */}
        <div className='w-full'>
          <p className='text-sm font-medium text-gray-600 mb-1'>Email</p>
          <input
            className='border border-gray-300 rounded-lg w-full p-3 mt-1 text-sm 
            focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 
            hover:border-green-400 transition-all'
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            required
          />
        </div>

        {/* Password */}
        <div className='w-full'>
          <p className='text-sm font-medium text-gray-600 mb-1'>Password</p>
          <input
            className='border border-gray-300 rounded-lg w-full p-3 mt-1 text-sm 
            focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 
            hover:border-green-400 transition-all'
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            required
          />
        </div>

        {/* Button */}
        <button className='bg-primary hover:opacity-90 active:scale-[0.99] transition-all text-white w-full py-3 rounded-lg text-base font-medium shadow-md'>
          {state === 'Sign Up' ? 'Create account' : 'Login'}
        </button>

        {/* Toggle Text */}
        {
          state === 'Sign Up'
            ? (
              <p className='text-sm text-gray-600'>
                Already have an account?{" "}
                <span onClick={()=> setState('Login')}
                className='text-primary font-medium cursor-pointer hover:underline'>
                  Login here
                </span>
              </p>
            )
            : (
              <p className='text-sm text-gray-600'>
                Create an new account?{" "}
                <span onClick={()=> setState('Sign Up')}
                className='text-primary font-medium cursor-pointer hover:underline'>
                  click here
                </span>
              </p>
            )
        }

      </div>

    </form>
  )
}

export default Login