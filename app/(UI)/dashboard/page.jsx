"use client";
import { Tasks } from "@/components/index";
import React, { use } from "react";
import { CalendarClock } from "lucide-react";
import { useTasks } from "@/hooks/useTasks";
import { useSession } from "next-auth/react";


function page({ searchParams }) {
  const { tasks } = useTasks();
  const resolvedParams = use(searchParams);
  const currentSearch = resolvedParams.search || "";
  const { data: session ,  } = useSession();

  const completedTasks = tasks.filter((task) => task.isCompleted === true);
  const completedTasksCount = completedTasks.length
  const completionPercentage = tasks.length > 0 ? Math.round((completedTasksCount * 100) / tasks.length) : 0;

  const notCompletedPercentage =
  tasks.length > 0 ? 100 - completionPercentage : 0;

  const date = new Date();
  const today = date.toISOString().split("T")[0];
  console.log(today);
  return (
    <>
      <h1 className="text-3xl font-MarkaziText text-white">Welcome, {session?.user?.name.toLocaleUpperCase()}</h1>
      <div className="rounded-md max-h-full grow overflow-y-scroll scrollbar-none">
        <div className="py-3 grow  min-h-full  grid grid-cols-3 gap-3 rounded-md">
          <div className=" bg-white/4 backdrop-blur-xl border-white/12 border rounded-lg text-white col-span-2  shadow-[inset_2px_2px_50px_0_rgba(255,255,255,0.20)]">
            <Tasks
              limit={2}
              title="To-Do"
              filter={(item) => item.deadline.startsWith(today) && item.isCompleted === false}
            />
          </div>
          <div className="rounded-lg grid grid-rows-5 gap-2 px-3">
            <div className="rounded-lg flex gap-2 py-2 border row-span-2 justify-center bg-white/4 backdrop-blur-xl border-white/12 text-white  shadow-[inset_2px_2px_50px_0_rgba(255,255,255,0.20)] ">
              {/* Circular Progress */}
              <div className="relative size-30">
                <svg
                  className="size-full -rotate-90"
                  viewBox="0 0 36 36"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  {/* Background Circle */}
                  <circle
                    cx="18"
                    cy="18"
                    r="16"
                    fill="none"
                    className="stroke-current text-[#E5E7EB]"
                    strokeWidth="2"
                  ></circle>
                  {/* Progress Circle */}
                  <circle
                    cx="18"
                    cy="18"
                    r="16"
                    fill="none"
                    className="stroke-current text-[#EF4444]"
                    strokeWidth="2"
                    strokeDasharray="100"
                    strokeDashoffset={`${100 - notCompletedPercentage}`}
                    strokeLinecap="round"
                  ></circle>
                </svg>
                <p className="text-center">Not Completed</p>
                {/* Percentage Text */}
                <div className="absolute top-1/2 inset-s-1/2 transform -translate-y-1/2 -translate-x-1/2">
                  <span className="text-center text-xl font-bold">
                    {notCompletedPercentage} %
                  </span>
                </div>
              </div>
              {/* End Circular Progress */}

              {/* Circular Progress */}
              <div className="relative size-30">
                <svg
                  className="size-full -rotate-90"
                  viewBox="0 0 36 36"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  {/* Background Circle */}
                  <circle
                    cx="18"
                    cy="18"
                    r="16"
                    fill="none"
                    className="stroke-current text-[#E5E7EB]"
                    strokeWidth="2"
                  ></circle>
                  {/* Progress Circle */}
                  <circle
                    cx="18"
                    cy="18"
                    r="16"
                    fill="none"
                    className="stroke-current text-[#16A34A]"
                    strokeWidth="2"
                    strokeDasharray="100"
                    strokeDashoffset={100 - completionPercentage || 0}
                    strokeLinecap="round"
                  ></circle>
                </svg>
                <p className="text-center">Completed</p>

                {/* Percentage Text */}
                <div className="absolute top-1/2 inset-s-1/2 transform -translate-y-1/2 -translate-x-1/2">
                  <span className="text-center text-xl font-bold">
                    {completionPercentage || 0} %
                  </span>
                </div>
              </div>
              {/* End Circular Progress */}
            </div>
            <div className="border rounded-lg grid grid-rows-2 row-span-3 gap-2 px-4 py-4 bg-white/4 backdrop-blur-xl border-white/12 text-white  shadow-[inset_2px_2px_50px_0_rgba(255,255,255,0.20)]">
              {
                completedTasks.length === 0 ? (
                  <div className="p-5 text-center">No completed tasks</div>
                ): (
                  completedTasks.slice(0, 2).map((task) => (
                    <div
                      className="shadow-md rounded-lg hover:scale-102 transition-transform duration-500 px-3 py-2  border-2 border-[rgba(0,0,0,0.1)]"
                      key={task._id}
                    >
                      <h1 className="font-semibold">{task.title}</h1>
                      <p>{task.description.slice(0,30)}...</p>
                      <p className="font-semibold">
                        Status:{" "}
                        <span className="font-extralight">
                          {task.isCompleted ? "Completed" : "Not Completed"}
                        </span>
                      </p>
                    </div>
                  ))
                )
              }
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default page;
