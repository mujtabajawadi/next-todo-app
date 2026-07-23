"use client";
import React, { useState } from "react";
import Link from "next/link";
import { Checkbox } from "@/components/ui/checkbox";

function TaskItem({ task }) {
  const [checked, setChecked] = useState(task.isCompleted || false);


  const handleCheckboxToggle = async (isChecked)=>{
    setChecked(isChecked);
    try {
      const res = await fetch(`/api/tasks?id=${task._id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          isCompleted: isChecked,
        }),
      });

      if (!res.ok) {
        throw new Error("Failed to update task");
      }
    } catch (error) {
      console.error("Error updating task status:", error);
      setChecked(!isChecked);
    } 
  }


  return (
    <>
      <Link href={`/my-tasks/${task._id}`} key={task._id}>
        <div
          className={`py-2 px-3 m-3 rounded-md cursor-pointer text-sm bg-white/10 backdrop-blur-xl text-white transition-all duration-400 transform-gpu will-change-transform hover:border-[#FBBF24]/80 hover:shadow-[inset_2px_2px_200px_0_rgba(255,255,255,0.10),0_0_10px_2px_rgba(251,187,36,0.5)]
                `}
        >
          <div className="grid grid-cols-12">
            <div
              className="flex col-span-1 items-start"
              onClick={(e) => {
                e.preventDefault()
                e.stopPropagation()}}
            >
              <Checkbox
                checked={checked}
                onCheckedChange={(isChecked) => handleCheckboxToggle(isChecked)}
                className="border-[#1AC8B8]/70 border-2 rounded-full
                    data-checked:bg-[#1AC8B8]/70
                    data-checked:border-none"
              />
            </div>
            <div className="col-span-9 flex flex-col justify-start">
              <p className="text-2xl font-MarkaziText leading-none">{task.title}</p>
              <p className="text-justify font-karla text-xs">
                {task.description.slice(0, 150)}...
              </p>
            </div>
            <div className="col-span-2 flex items-start justify-end">
              <p className="text-[#FBBF24] font-karla w-fit h-fit text-xs p-1 rounded-md bg-[#FBBF24]/10 border border-[#FBBF24]/40 shadow-[0_0_10px_rgba(251,191,36,0.3)]">
                {task.priority.toUpperCase()}
              </p>
            </div>
          </div>
        </div>
      </Link>
    </>
  );
}

export default TaskItem;
