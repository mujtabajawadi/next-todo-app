import { Profile } from '@/components/index'
import React from 'react'


function page() {
  return (
    <div className='grow bg-white/4 backdrop-blur-xl border-white/12 text-white  shadow-[inset_2px_2px_50px_0_rgba(255,255,255,0.20)] rounded-lg '>
      <Profile/>
    </div>
  )
}

export default page
