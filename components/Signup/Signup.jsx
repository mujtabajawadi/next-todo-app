"use client"
import React from 'react'
import Image from 'next/image'
import signupImage from "../../public/images/signup.svg"
import Link from 'next/link'

function Signup() {




  const handleSignup = (event)=>{

    event.preventDefault()
  }


  return (
    <>
      <div className='w-screen h-screen bg-red-400 py-15 px-30'>
        <div className='w-full h-full bg-white rounded-lg'>
          <div className='flex justify-center gap-20 items-center'>
            <div className='left-side'>
              <Image src={signupImage} alt='Signup-Image'/>
            </div>
            <div className='right-side'>
              <div className='h-full'>
                <h1 className='text-black font-bold text-2xl mb-5'>Sign Up</h1>
                <form className='flex flex-col gap-3' onSubmit={handleSignup}>
                  <input type="text" placeholder='Enter FullName...'/>
                  <input type="text" placeholder='Enter Username...'/>
                  <input type="text" placeholder='Enter Email...'/>
                  <input type="password" placeholder='Enter Password...'/>
                  <input type="password" placeholder='Confirm Password...'/>
                  <button className='w-fit bg-red-400 font-light text-sm text-white rounded-sm px-4 py-2'>Register</button>
                  <p className='text-black text-sm font-light'>Already have an account? <span className='text-blue-500'>
                    <Link href="/login">
                    Sign In
                    </Link>
                    </span></p>
                </form>
              </div>
            </div>
          </div> 
        </div>
      </div>
    </>
  )
}

export default Signup
