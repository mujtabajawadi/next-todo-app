"use client";
import Link from "next/link";
import React, { useState } from "react";
import { TaskForm } from "@/components/index";
import { useTasks } from "@/hooks/useTasks";

function Tasks({ limit, icon, title, filter }) {
  const { tasks } = useTasks();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const tasksDisplay = limit ?? tasks.length;
  const filteredTasks = filter ? tasks.filter(filter) : tasks;

  const date = new Date();
  const today = date.toLocaleDateString();

  return (
    <>
      <div className="p-3 max-h-fit">
        <div className="flex justify-between ">
          <h1 className="flex gap-2">
            <span className="text-red-400">{icon ?? ""}</span>
            <span>{title ?? "My Tasks"}</span>
          </h1>
          {title && icon && (
            <button onClick={() => setIsDialogOpen(true)} className="p-1 rounded-lg bg-red-400 hover:scale-103 text-[#ededed] transition-transform duration-600">
              <span>+</span> Add Task
            </button>
          )}
        </div>
        <TaskForm
          isDialogOpen={isDialogOpen}
          setIsDialogOpen={setIsDialogOpen}
        />
        <p>{today}&nbsp; &bull; Today </p>
      </div>
      {filteredTasks.map((task, index) => {
        if (index > tasksDisplay) return null;

        return (
          <Link href={`/my-tasks/${task._id}`} key={task._id}>
            <div className="p-3 mx-3 my-1 mb-2  shadow-md rounded-lg cursor-pointer text-sm hover:scale-103 transition-transform duration-500 border border-l-red-400">
              <h2>Title: {task.title}</h2>
              <p>Description: {task.description}</p>
              <p>Priority: {task.priority}</p>
              <p>
                Status:{" "}
                {task.isCompleted === false ? "Not Completed" : "Completed"}
              </p>
              <p>Created At: {task.createdAt}</p>
            </div>
          </Link>
        );
      })}
    </>
  );
}

export default Tasks;
