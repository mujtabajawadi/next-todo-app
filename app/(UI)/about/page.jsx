import { About } from '@/components/index'
import React from 'react'


function page() {
  return (
    <div className='bg-[#ededed] shadow-lg rounded-lg grow max-h-full overflow-y-scroll scrollbar-none p-3'>
      <About/>
    </div>
  )
}

export default page