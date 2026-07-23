"use client";
import { SquarePen, Trash2 } from "lucide-react";
import React, { useState } from "react";
import { TaskForm } from "@/components/index";
import { useRouter } from "next/navigation";

function TaskDetail({ userTask }) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const router = useRouter();

  if (!userTask) return null;

  const handleEditTask = async () => {
    setIsDialogOpen(true);
  };

  const handleDeleteTask = async (id) => {
    try {
      const response = await fetch(`/api/tasks?id=${id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        router.push("/dashboard");
      }
    } catch (error) {
      throw new Error("Failed to delete a task");
    }
  };

  return (
    <div className="">
      <TaskForm
        isDialogOpen={isDialogOpen}
        setIsDialogOpen={setIsDialogOpen}
        task={userTask}
      />
      <div className="p-3 max-h-full flex flex-col gap-5 justify-between">
        <div className="flex justify-between items-center">
        <h1 className="font-MarkaziText text-2xl">{userTask.title}</h1>
        <p className="text-[#FBBF24] w-fit h-fit text-xs p-1 rounded-md bg-[#FBBF24]/10 border border-[#FBBF24]/40 shadow-[0_0_10px_rgba(251,191,36,0.3)]">{userTask.priority.toUpperCase()}</p>
        </div>
        <div className="max-h-[35dvh] overflow-y-scroll scrollbar-none ">
        <p className="font-karla text-xs text-justify">{userTask.description}</p>
        </div>
        <div className="text-[#FBBF24] p-2 rounded-md bg-[#FBBF24]/20 border border-[#FBBF24]/40 shadow-[0_0_10px_rgba(251,191,36,0.3)] flex justify-between items-center font-karla">
        <p >Deadline: </p>
        <span className="text-xs">{new Date(userTask.deadline).toLocaleDateString()}</span>
        </div>
        <div className="flex flex-col font-karla gap-2 bg-white/10 backdrop-blur-xl shadow-[0_0_2px_rgba(0,0,0,0.5)] p-2 rounded-md">
          <div className="flex justify-between items-center">
          <p className="">Created At : </p>
        <span className="font-extralight text-xs">{new Date(userTask.createdAt).toLocaleDateString()}</span>
          </div>
        <div className="flex justify-between items-center">
        <p className="">Status: </p>
        <span className="font-extralight text-xs">{userTask.isCompleted === false ? "Not Completed" : "Completed"}</span>
        </div>
        </div>
        
        
       
        
        <div className="flex gap-3 font-karla text-xs">
          <div className="cursor-pointer flex gap-2 justify-center p-2 rounded-md bg-[#414328]/60 border border-[#D1C373]/40 text-[#E8D985] shadow-[0_0_12px_rgba(209,195,115,0.2),inset_0_1px_1px_rgba(255,255,255,0.25)] items-center grow" onClick={handleEditTask}>
            <SquarePen  size={14}/>
            <p>Edit Task</p>
          </div>
          <div className=" rounded-md p-2 cursor-pointer flex gap-2 justify-center items-center bg-[#4A282D]/70 border border-[#E07A85]/30 text-[#EFA3AC] shadow-[0_0_12px_rgba(224,122,133,0.15),inset_0_1px_1px_rgba(255,255,255,0.25)] grow" onClick={() => handleDeleteTask(userTask._id)}>
            <Trash2  size={14}/>
              <p>Delete Task</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TaskDetail;
