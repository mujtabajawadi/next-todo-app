"use client"
import React, { useState } from 'react'
import LoginImage from '@/public/images/login.svg'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { signIn } from "next-auth/react";


function Login() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const router = useRouter()
  
  const handleLogin = async (event)=>{
    event.preventDefault()
    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });
    if (result?.error) {
      console.error("Login Failed Error: ",result.error);
    } else {
      router.push("/dashboard");
    }
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
                    <h1 className='text-black font-bold text-2xl mb-5'>Sign In</h1>
                    <form className='flex flex-col gap-3' onSubmit={handleLogin}>
                      <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} placeholder='Enter Email...'/>
                      <input type="password" value={password} onChange={(e)=> setPassword(e.target.value)} placeholder='Enter Password...'/>
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