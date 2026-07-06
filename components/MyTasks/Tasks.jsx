"use client"
import Link from 'next/link'
import React, { useEffect, useState } from 'react'

function Tasks() {
    const [tasks, setTasks] = useState([])

    useEffect(() => {
        async function fetchTasks(){
            const response = await fetch("/api/tasks")
            if(!response) return
        
            const data = await response.json()
            setTasks(data.taskList)
        }
        fetchTasks()
    }, [])
    

  return (
    <>
        <h1>My Tasks</h1>
            {
                tasks.map((task)=>{
                    return(
                        <Link href={`/my-tasks/${task._id}`} key={task._id}>
                        <div className='p-3 m-3 bg-gray-500 rounded-lg cursor-pointer'>
                            <h2>Title: {task.title}</h2>
                            <p>Description: {task.description}</p>
                            <p>Priority: {task.priority}</p>
                            <p>Status: {task.status}</p>
                        </div>
                        </Link>
                    )
                })
            }     
    </>
  )
}

export default Tasks
