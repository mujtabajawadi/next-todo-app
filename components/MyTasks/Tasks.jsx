"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { TaskForm } from "@/components/index";

function Tasks({ limit, icon, title }) {
  const [tasks, setTasks] = useState([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const router = useRouter();
  const tasksDisplay = limit ?? tasks.length;

  useEffect(() => {
    async function fetchTasks() {
      const response = await fetch("/api/tasks");
      if (!response) return;

      const data = await response.json();
      setTasks(data.taskList);
    }
    fetchTasks();
  }, [router]);

  const date = new Date()
  const today = date.toLocaleDateString()

  return (
    <>
    <div className="p-3">

      <div className="flex justify-between">
        <h1 className="flex gap-2">
          <span>{icon ?? ""}</span>
          <span>{title ?? "My Tasks"}</span>
        </h1>
        {
            title && icon && 
            <button onClick={()=> setIsDialogOpen(true)}><span>+</span> Add Task</button>
        }
      </div>
      <TaskForm isDialogOpen={isDialogOpen} setIsDialogOpen={setIsDialogOpen}/>
      <p>{today} &nbsp;&nbsp;  &bull; Today </p>
        </div>
      {tasks.map((task, index) => {
        if (index > tasksDisplay) return null;
        return (
          <Link href={`/my-tasks/${task._id}`} key={task._id}>
            <div className="p-3 m-3 bg-gray-500 rounded-lg cursor-pointer text-sm">
              <h2>Title: {task.title}</h2>
              <p>Description: {task.description}</p>
              <p>Priority: {task.priority}</p>
              <p>Status: {task.status}</p>
              <p>Created At: {task.createdAt}</p>
            </div>
          </Link>
        );
      })}
    </>
  );
}

export default Tasks;
