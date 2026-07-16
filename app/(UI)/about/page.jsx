import { About } from '@/components/index'
import React from 'react'


function page() {
  return (
    <div className='rounded-lg grow max-h-full overflow-y-scroll scrollbar-none px-3'>
      <About/>
    </div>
  )
}

export default page