'use client'
import React, { useState } from 'react'
import Link from 'next/link'
import {useRouter} from 'next/navigation'

const RegisterForm = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const router = useRouter()

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !email || !password) {
      setError('All fields are necessary!');
      return;
    }

    try {
      const res = await fetch('/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await res.json();

      if (res.status === 400 && data.error) {
        setError(data.error);
      } else if (res.ok) {
        setError('');
        const form = e.target;
        form.reset();
        router.push('/');
      } else {
        setError('User registration failed. Please try again.');
      }
    } catch (error) {
      console.error('Error during user registration: ', error);
      setError('An error occurred. Please try again later.');
    }
  }

  return (
    <div className='grid place-items-center h-screen'>
      <div className='shadow-lg p-5 rounded-lg border-t-4 border-red-400'>
        <h1 className='text-xl font-bold my-4'>Register Now</h1>
        <form onSubmit={handleSubmit} className='flex flex-col gap-3'>
          <input
            onChange={(e) => setName(e.target.value)}
            type='text'
            placeholder='Full Name'
          />
          <input
            onChange={(e) => setEmail(e.target.value)}
            type='text'
            placeholder='Email'
          />
          <input
            onChange={(e) => setPassword(e.target.value)}
            type='password'
            placeholder='Password'
          />
          <button className='bg-red-600 text-white font-bold cursor-pointer px-4 py-2 rounded'>
            Register
          </button>
          {error && (
            <div className='text-yellow-600 flex flex-col place-items-center text-sm py-1 px-3 rounded-md mt-2'>
              {error}
            </div>
          )}
          <Link href="/" className='text-sm mt-3 text-gray-400 flex items-center justify-center place-items-center'>Already have an account?<span className='underline'>Login</span></Link>
        </form>
      </div>
    </div>
  )
}

export default RegisterForm;
