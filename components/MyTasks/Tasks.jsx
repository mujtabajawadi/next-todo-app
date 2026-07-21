"use client";
import Link from "next/link";
import React, { useState } from "react";
import { TaskForm } from "@/components/index";
import { useTasks } from "@/hooks/useTasks";
import { useSearchParams } from "next/navigation";

function Tasks({ limit, icon, title, filter }) {
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
            <span className="">{icon ?? ""}</span>
            <span className="font-semibold">{title ?? "My Tasks"}</span>
          </h1>
          {title && icon && (
            <button
              onClick={() => setIsDialogOpen(true)}
              className="px-2 py-1 rounded-md bg-[#1AC8B8]/25 border border-[#1AC8B8]/30 p-2 shadow-[0_0_12px_rgba(26,200,184,0.3)] hover:bg-[#1AC8B8]/70 text-white"
            >
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

      {filteredTasks.length === 0 ? (
        <div className="p-5 text-center ">No tasks found.</div>
      ) : (
        filteredTasks.map((task, index) => {
          if (index > tasksDisplay) return null;

          return (
            <Link href={`/my-tasks/${task._id}`} key={task._id}>
              <div
                className={`py-2 px-3 mx-3 rounded-md cursor-pointer text-sm bg-white/10 backdrop-blur-xl text-white transition-all duration-400 transform-gpu will-change-transform hover:border-[#FBBF24]/80 hover:shadow-[inset_2px_2px_200px_0_rgba(255,255,255,0.10),0_0_10px_2px_rgba(251,187,36,0.5)]
                `}
              >
                <div className="flex justify-between items-start gap-2">
                  <div className="flex gap-3">
                    <input
                      type="checkbox"
                      name="completed"
                      id=""
                      className=""
                    />
                  </div>
                  <div>
                    <p className="font-semibold text-lg m-0 p-0">{task.title}</p>
                    <p>{task.description.slice(0, 150)}...</p>
                  </div>
                  <div>
                    <p className="text-[#FBBF24] w-fit h-fit text-xs p-1 rounded-md bg-[#FBBF24]/10 border border-[#FBBF24]/40 shadow-[0_0_10px_rgba(251,191,36,0.3)]">
                      {task.priority.toUpperCase()}
                    </p>
                  </div>
                </div>
              </div>
            </Link>
          );
        })
      )}
    </>
  );
}

export default Tasks;
