import React from 'react'

function layout({children, details}) {
  return (

      <div className=' grid grid-cols-9 gap-2 grow max-h-full'>
      <div className='bg-white/4 backdrop-blur-xl border-white/12 text-white  shadow-[inset_2px_2px_50px_0_rgba(255,255,255,0.20)] rounded-lg col-span-6 overflow-y-scroll scrollbar-none'>
        {children}
      </div>
      <div className='bg-white/4 backdrop-blur-xl border-white/12 text-white  shadow-[inset_2px_2px_50px_0_rgba(255,255,255,0.20)] rounded-lg col-span-3'>
        {details}
      </div>
    </div>
  )
}

export default layout
