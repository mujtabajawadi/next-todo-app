import React from 'react'

function layout({children, details}) {
  return (

      <div className='grid grid-cols-5 gap-1 grow max-h-full'>
      <div className='bg-yellow-700 rounded-lg col-span-2 overflow-y-scroll scrollbar-none'>
        {children}
      </div>
      <div className='bg-yellow-700 rounded-lg col-span-3'>
        {details}
      </div>
    </div>
  )
}

export default layout
