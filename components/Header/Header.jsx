"use client"
import React from 'react'
import { Search, Bell } from 'lucide-react';

function Header() {
  return (
    <>
    <header className='bg-[#ededed] grid grid-cols-6 px-5 py-1 shadow-lg justify-between items-center'>
      <div>
        <h1 className='text-2xl font-bold font-sans'><span className='text-red-400'>Task</span>Easy</h1>
      </div>
      <div className='flex col-span-3'>
        <input type="text" placeholder='Search your task here...' className='w-full rounded-lg'/><span className='bg-red-400 p-1 rounded'><Search className='text-white' strokeWidth={3} /></span>
      </div>
      <div className='col-start-5 flex'>
        <input type="text" className='opacity-0 pointer-events-none' /><Bell className='bg-red-400 text-2xl p-1 rounded text-white h-full' strokeWidth={3} size={24}/>
      </div>
      <div className='col-start-6 text-end'>
        <span>

        {
          new Date().toLocaleDateString(undefined, {weekday: 'long'})
        }
        </span>
        <br />
        <span className='text-blue-600'>
          {
            new Date().toLocaleDateString()
          }
        </span>
      </div>
    </header>
    </>
  )
}

export default Header