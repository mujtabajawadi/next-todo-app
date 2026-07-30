"use client"
import { usePathname } from "next/navigation";
import React from 'react'

function layout({children, details}) {

  
    const pathname = usePathname();
    const isTaskSelected = pathname !== "/my-tasks";


  return (

      <div className={` grid md:grid-cols-9 gap-2 grow max-h-full`}>
      <div className={`${isTaskSelected ? "hidden md:block" : "block"} bg-white/4 backdrop-blur-xl border-white/12 text-white  shadow-[inset_2px_2px_50px_0_rgba(255,255,255,0.20)] rounded-lg col-span-6 overflow-y-scroll scrollbar-none`}>
        {children}
      </div>
      <div className={`${isTaskSelected ? "block" : "hidden md:block"} bg-white/4 backdrop-blur-xl border-white/12 text-white  shadow-[inset_2px_2px_50px_0_rgba(255,255,255,0.20)] rounded-lg col-span-3`}>
        {details}
      </div>
    </div>
  )
}

export default layout
