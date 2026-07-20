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
              <div className={`py-2 px-3 mx-3 my-2 mb-4 rounded-md cursor-pointer text-sm hover:scale-102 transition-all duration-500  bg-white/20 backdrop-blur-xl text-white shadow-[inset_2px_2px_30px_0_rgba(255,255,255,0.15)] border hover:border-[#1AC8B8]/20 p-2 hover:shadow-[0_0_8px_rgba(26,200,184,0.3)]`}>
                <input type="checkbox" name="completed" id="" className="" />
                <h2 className="font-semibold text-lg">{task.title}</h2>
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
