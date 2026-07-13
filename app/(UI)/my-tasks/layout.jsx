import React from 'react'

function layout({children, details}) {
  return (

      <div className=' grid grid-cols-9 gap-2 grow max-h-full'>
      <div className='bg-[#ededed] shadow-lg rounded-lg col-span-4 overflow-y-scroll scrollbar-none'>
        {children}
      </div>
      <div className='bg-[#ededed] shadow-lg rounded-lg col-span-5'>
        {details}
      </div>
    </div>
  )
}

export default layout
