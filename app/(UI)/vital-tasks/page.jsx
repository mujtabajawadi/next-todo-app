"use client"
import { Tasks } from '@/components/index'
import React from 'react'

function page() {
  return (
    <div>
      <Tasks title="Vital Tasks" filter={(item)=>item.priority === "extreme"}/>
    
  </div>
  )
}

export default page
