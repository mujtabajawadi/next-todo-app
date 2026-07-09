"use client";
import { SquarePen, Trash2 } from "lucide-react";
import React, { useState } from "react";
import { TaskForm } from "@/components/index";
import { useRouter } from "next/navigation";

function TaskDetail({ userTask }) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const router = useRouter();

  if (!userTask) return null;

  const handleEditTask = async (event, task) => {
    setIsDialogOpen(true);
  };

  const handleDeleteTask = async (id) => {
    try {
      const response = await fetch(`/api/tasks?id=${id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        console.log("Task Deleted");
        router.push("/dashboard");
      }
    } catch (error) {
      throw new Error("Failed to delete a task");
    }
  };

  return (
    <div className="p-3 max-h-full grow">
      <TaskForm
        isDialogOpen={isDialogOpen}
        setIsDialogOpen={setIsDialogOpen}
        task={userTask}
      />
      <div className="bg-gray-500 p-3 max-h-full grow rounded-lg">
        <h1>{userTask.title}</h1>
        <p>{userTask.description}</p>
        <p>{userTask.priority}</p>
        <p>{userTask.isCompleted === false ? "Not Completed" : "Completed"}</p>
        <p>{userTask.deadline}</p>
        <div className="flex gap-5">
          <div>
            <SquarePen onClick={handleEditTask} />
          </div>
          <div>
            <Trash2 onClick={() => handleDeleteTask(userTask._id)} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default TaskDetail;
