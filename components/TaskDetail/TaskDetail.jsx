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
      <div className="p-3 max-h-full grow rounded-lg">
        <h1 className="font-semibold">Task Title: <span className="font-extralight">{userTask.title}</span></h1>
        <p className="font-semibold">Priority: <span className="font-extralight">{userTask.priority}</span></p>
        <p className="font-semibold">Status: <span className="font-extralight">{userTask.isCompleted === false ? "Not Completed" : "Completed"}</span></p>
        <p className="font-semibold">Created on : <span className="font-extralight">{new Date(userTask.createdAt).toLocaleDateString()}</span></p>
        <p className="font-semibold">Task Description: <span className="font-extralight">{userTask.description}</span></p>
        <p className="font-semibold">Deadline: <span className="font-extralight">{new Date(userTask.deadline).toLocaleDateString()}</span></p>
        <div className="flex gap-3 justify-end">
          <div className="bg-red-400 text-white rounded p-1 hover:scale-105 transition-transform duration-700">
            <SquarePen onClick={handleEditTask} size={14}/>
          </div>
          <div className="bg-red-400 text-white rounded p-1 hover:scale-105 transition-transform duration-400">
            <Trash2 onClick={() => handleDeleteTask(userTask._id)} size={14}/>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TaskDetail;
