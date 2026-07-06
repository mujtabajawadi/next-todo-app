import React from 'react'
import {Tasks} from "@/components/index"

function page() {
  return (
    <div className='grid grid-cols-5 gap-1 grow max-h-full'>
      <div className='bg-yellow-700 rounded-lg col-span-2 overflow-y-scroll scrollbar-none'>
        <Tasks/>
      </div>
      <div className='bg-yellow-700 rounded-lg col-span-3'>
        
      </div>
    </div>
  )
}

export default page