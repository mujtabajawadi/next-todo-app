import React from 'react'

function page() {
  return (
    <div className='grid grid-cols-5 gap-3 grow'>
      <div className='bg-yellow-700 rounded-lg col-span-2'>My Tasks</div>
      <div className='bg-yellow-700 rounded-lg col-span-3'>Right</div>
    </div>
  )
}

export default page