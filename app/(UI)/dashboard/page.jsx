"use client";
import { Tasks } from "@/components/index";
import React, { use } from "react";
import { CalendarClock } from "lucide-react";
import { useTasks } from "@/hooks/useTasks";

function page({ searchParams }) {
  const { tasks } = useTasks();
  const resolvedParams = use(searchParams);
  const currentSearch = resolvedParams.search || "";
  console.log("User Seacrhes for:", currentSearch);

  const completedTasks = tasks.filter((task) => task.isCompleted === true);
  const isCompletedTasks = completedTasks.length;
  const completionPercentage =
    completedTasks.length !== 0
      ? ((isCompletedTasks * 100) / tasks.length).toFixed(0)
      : 0;

  const date = new Date();
  const today = date.toISOString().split("T")[0];
  console.log(today);
  return (
    <>
      <h1 className="px-5 text-xl font-semibold">Welcome back, User</h1>
      <div className="bg-[#ededed] shadow-lg rounded-md max-h-full grow overflow-y-scroll scrollbar-none">
        <div className="py-3 grow px-5  min-h-full  grid grid-cols-2 gap-3 rounded-md">
          <div className="shadow-lg rounded-lg grid grid-rows-4">
            <Tasks
              limit={2}
              icon={<CalendarClock />}
              title="To-Do"
              filter={(item) => item.deadline.startsWith(today)}
            />
          </div>
          <div className="shadow-lg rounded-lg grid grid-rows-5 gap-2 p-3 ">
            <div className="shadow-md rounded-lg flex gap-2 row-span-2 justify-center ">
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
                    className="stroke-current text-gray-800/10"
                    strokeWidth="2"
                  ></circle>
                  {/* Progress Circle */}
                  <circle
                    cx="18"
                    cy="18"
                    r="16"
                    fill="none"
                    className="stroke-current text-red-700"
                    strokeWidth="2"
                    strokeDasharray="100"
                    strokeDashoffset={`${completionPercentage}`}
                    strokeLinecap="round"
                  ></circle>
                </svg>
                <p className="text-center">Not Completed</p>
                {/* Percentage Text */}
                <div className="absolute top-1/2 inset-s-1/2 transform -translate-y-1/2 -translate-x-1/2">
                  <span className="text-center text-xl font-bold">
                    {100 - completionPercentage} %
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
                    className="stroke-current text-gray-800/10"
                    strokeWidth="2"
                  ></circle>
                  {/* Progress Circle */}
                  <circle
                    cx="18"
                    cy="18"
                    r="16"
                    fill="none"
                    className="stroke-current text-green-700"
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
            <div className="shadow-lg rounded-lg grid grid-rows-2 row-span-3 gap-2 p-10 ">
              {
                completedTasks.length === 0 ? (
                  <div className="p-5 text-center text-gray-500">No tasks found</div>
                ): (
                  completedTasks.slice(0, 2).map((task) => (
                    <div
                      className="shadow-md rounded-lg hover:scale-102 transition-transform duration-500 px-3 py-2  border-2 border-[rgba(0,0,0,0.1)]"
                      key={task._id}
                    >
                      <h1 className="font-semibold">{task.title}</h1>
                      <p>{task.description}</p>
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
