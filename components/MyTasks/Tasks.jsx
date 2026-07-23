"use client";

import React, { useState } from "react";
import { TaskForm, TaskItem } from "@/components/index";
import { useTasks } from "@/hooks/useTasks";
import { useSearchParams } from "next/navigation";


function Tasks({ limit, title, filter }) {
  const { tasks } = useTasks();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  
  const searchParams = useSearchParams();
  const currentSearchQuery = searchParams.get("search")?.toLowerCase() || "";
  console.log(currentSearchQuery);

  const tasksDisplay = limit ?? tasks.length;
  const filteredTasks = tasks.filter((task) => {
    if (filter && !filter(task)) return false;

    if (currentSearchQuery) {
      const matchesTitle = task.title
        ?.toLowerCase()
        .includes(currentSearchQuery);
      const matchesDescription = task.description
        ?.toLowerCase()
        .includes(currentSearchQuery);
      return matchesTitle || matchesDescription;
    }

    return true;
  });

  const date = new Date();
  const today = date.toLocaleDateString();

  return (
    <>
      <div className="p-3 max-h-fit col-span-2">
        <div className="flex justify-between items-center ">
          <h1 className="flex gap-2 items-center">
            <span className="font-MarkaziText text-3xl">{title ?? "My Tasks"}</span>
          </h1>
          {title === "To-Do" && (
            <button
              onClick={() => setIsDialogOpen(true)}
              className="py-1.5 px-2 rounded-md bg-[#1AC8B8]/25 border border-[#1AC8B8]/30 shadow-[0_0_12px_rgba(26,200,184,0.3)] hover:bg-[#1AC8B8]/70 text-white font-karla transition-all duration-500"
            >
              <span>+</span> Add Task
            </button>
          )}
        </div>
        <TaskForm
          isDialogOpen={isDialogOpen}
          setIsDialogOpen={setIsDialogOpen}
        />
        <p className="text-[#1AC8B8]/85 font-poppins text-xs">{today}&nbsp; &bull; Today </p>
      </div>

      {filteredTasks.length === 0 ? (
        <div className="p-5 text-center ">No tasks found.</div>
      ) : (
        filteredTasks.map((task, index) => {
          if (index > tasksDisplay) return null;
          return (
            <TaskItem key={task._id} task={task}/>
          );
        })
      )}
    </>
  );
}

export default Tasks;
