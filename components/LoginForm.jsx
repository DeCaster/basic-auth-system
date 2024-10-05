'use client'
import Link from 'next/link'
import React from 'react'
import { useState } from 'react'
import {signIn} from 'next-auth/react'
import { useRouter } from 'next/navigation'

const LoginForm = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const router = useRouter()


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
     const res = await signIn('credentials', { email, password, redirect: false })
     if(res.error) {
      setError("Invalid Credentials")
      return
     }
     router.replace('dashboard');
    } catch (error) {
      console.log(error);
    }
    
  }

  return (
    <div className='grid place-items-center h-screen'>
      <div className='shadow-lg p-5 rounded-lg border-t-4 border-red-400'>
        <h1 className='text-xl font-bold my-4'>Login details</h1>
        <form onSubmit={handleSubmit} className='flex flex-col gap-3 '>
          <input onChange={(e) => setEmail(e.target.value)} type="text" placeholder='Email' />
          <input onChange={(e) => setPassword(e.target.value)} type="password" placeholder='password' />
          <button className='bg-red-600 text-white font-bold cursor-pointer px-4 py-2 rounded'>Login</button>
          {error && (
            <div className='text-yellow-600 flex flex-col place-items-center text-sm py-1 px-3 rounded-md mt-2'>
            Error message
          </div>
          )

          }
          
          <Link href="/register" className='text-sm mt-3 text-gray-400 flex items-center justify-center place-items-center'>Don't have an account?<span className='underline'>Register</span></Link>
        </form>
      </div>
    </div>
  )
}

export default LoginForm