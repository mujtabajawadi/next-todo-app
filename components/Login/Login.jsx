"use client"
import React from 'react'
import LoginImage from '@/public/images/login.svg'
import Image from 'next/image'
import Link from 'next/link'




function Login() {


  const handleLogin = (event)=>{
    event.preventDefault()
  }

  return (
    <>
          <div className='w-screen h-screen bg-red-400 py-15 px-30'>
            <div className='w-full h-full bg-white rounded-lg'>
              <div className='flex flex-row-reverse justify-center gap-20 items-center'>
                <div className='left-side'>
                  <Image src={LoginImage} alt='Signup-Image'/>
                </div>
                <div className='right-side'>
                  <div className='h-full'>
                    <h1 className='text-black font-bold text-2xl mb-5'>Sign Up</h1>
                    <form className='flex flex-col gap-3' onSubmit={handleLogin}>
                      <input type="text" placeholder='Enter Email...'/>
                      <input type="password" placeholder='Enter Password...'/>
                      <button className='w-fit bg-red-400 text-sm font-extralight text-white rounded-sm px-4 py-2'>Login</button>
                      <p className='text-black text-sm font-light'>Don't have an account? <span className='text-blue-500'>
                        <Link href="/signup">
                        Create One
                        </Link>
                        </span>
                        </p>
                    </form>
                  </div>
                </div>
              </div> 
            </div>
          </div>
        </>
  )
}

export default Login