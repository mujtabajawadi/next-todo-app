import { connectDatabase } from "@/lib/dbConnection";
import { SquarePen, Trash2 } from "lucide-react";
import Task from "@/models/Tasks.model";
import { TaskForm, TaskDetail } from "@/components/index";

async function page(props) {
  const task = await props.params;

  await connectDatabase();
  const userTask = await Task.findById({ _id: task.id });
  const taskObject = JSON.parse(JSON.stringify(userTask))

  return (
    <div className="grow max-h-full">
    <TaskDetail userTask={taskObject}/>
    </div>
  );
}

export default page;
