"use client";
import { Tasks } from "@/components/index";
import React from "react";
import { CalendarClock } from "lucide-react";

function page() {
  return (
    <div className="">
      <h1>Welcome back, User</h1>
      <div className="bg-green-900 py-3 grow px-5 grid grid-cols-2 gap-3 rounded-md">
        <div className="bg-gray-600 rounded-lg grid grow grid-rows-auto overflow-y-scroll scrollbar-none max-h-[calc(100dvh-56px)]">
          <Tasks limit={2} icon={<CalendarClock />} title="To-Do" />
          {/* <div className="bg-amber-800 rounded-lg">
                </div> */}
          {/* <div className="bg-amber-800 rounded-lg"></div>
                <div className="bg-amber-800 rounded-lg"></div> */}
        </div>
        <div className="grow bg-gray-600 rounded-lg grid grid-rows-2 gap-2">
          <div className="bg-amber-600 rounded-lg flex gap-2 justify-center items-center">
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
                  className="stroke-current text-red-800"
                  strokeWidth="2"
                  strokeDasharray="100"
                  strokeDashoffset="35"
                  strokeLinecap="round"
                ></circle>
              </svg>
              <p className="text-center">Not Completed</p>
              {/* Percentage Text */}
              <div className="absolute top-1/2 inset-s-1/2 transform -translate-y-1/2 -translate-x-1/2">
                <span className="text-center text-2xl font-bold text-red-900">
                  65%
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
                  className="stroke-current text-green-900"
                  strokeWidth="2"
                  strokeDasharray="100"
                  strokeDashoffset="65"
                  strokeLinecap="round"
                ></circle>
              </svg>
              <p className="text-center">Completed</p>

              {/* Percentage Text */}
              <div className="absolute top-1/2 inset-s-1/2 transform -translate-y-1/2 -translate-x-1/2">
                <span className="text-center text-2xl font-bold text-green-900">
                  35%
                </span>
              </div>
              
            </div>
            {/* End Circular Progress */}
          </div>
          <div className="bg-amber-600 rounded-lg grid grid-rows-2 gap-2 p-10">
            <div className="bg-blue-950 rounded-lg"></div>
            <div className="bg-blue-950 rounded-lg"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default page;
