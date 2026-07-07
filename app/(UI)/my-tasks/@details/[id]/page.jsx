import { connectDatabase } from "@/lib/dbConnection"
import Task from "@/models/Tasks.model"


async function page(props) {
    const task = await props.params
    
    await connectDatabase()
    const userTask = await Task.findById({_id: task.id})


  return (
    <>
    <div className="bg-gray-500 ">
      <h1>{userTask.title}</h1>
      <p>{userTask.description}</p>
      <p>{userTask.priority}</p>
      <p>{userTask.status}</p>
      <p>{userTask.deadline.toDateString()}</p>
     
    </div>
    </>
  )
}

export default page
