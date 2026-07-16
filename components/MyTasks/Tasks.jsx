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
      <div className="p-3 max-h-fit">
        <div className="flex justify-between ">
          <h1 className="flex gap-2">
            <span className="text-[#16213E]">{icon ?? ""}</span>
            <span className="font-semibold">{title ?? "My Tasks"}</span>
          </h1>
          {title && icon && (
            <button
              onClick={() => setIsDialogOpen(true)}
              className="px-2 py-1 rounded-md bg-[#4F46E5] hover:bg-[#4338CA] text-[#EEF2FF]"
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
        <div className="p-5 text-center text-[#111827]">No tasks found.</div>
      ) : (
        filteredTasks.map((task, index) => {
          if (index > tasksDisplay) return null;

          return (
            <Link href={`/my-tasks/${task._id}`} key={task._id}>
              <div className={`py-2 px-3 mx-3 my-1 mb-2 shadow-[0_10px_30px_rgba(15,23,42,.06)] hover:shadow-[0_15p_x40px_rgba(79,70,229,.12)] rounded-md cursor-pointer text-sm hover:scale-103 transition-transform duration-500 border-2 border-[#E5E7EB] ${task.isCompleted ? "border-l-[#4F46E5]" : "border-l-[#EF4444]"}`}>
                <h2 className="font-semibold text-lg text-[#111827]">{task.title}</h2>
                <p>{task.description}</p>
                <div className="flex justify-between gap-3 text-xs">
                  <p className="font-semibold">
                    Priority:{" "}
                    <span className="font-extralight">{task.priority}</span>
                  </p>
                  <p className="font-semibold">
                    Status:{" "}
                    <span className="font-extralight">
                      {task.isCompleted === false
                        ? "Not Completed"
                        : "Completed"}
                    </span>
                  </p>
                  <p className="font-semibold">
                    Created At:{" "}
                    <span className="font-extralight">
                      {" "}
                      {new Date(task.createdAt).toLocaleDateString()}
                    </span>
                  </p>
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
