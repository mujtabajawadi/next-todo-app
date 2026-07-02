import React from "react";
import { Sidebar } from "@/components/index";
function Content() {
  return (
    <div className="flex grow ">
      <Sidebar />
      <div className="flex grow bg-gray-800 px-5">
        <div className="bg-amber-950 w-full h-full pt-8 pb-4 pl-5 flex flex-col">
          <h1>Welcome back, User</h1>
          <div className="bg-green-900 py-3 px-5 grid grid-cols-2 gap-3 grow rounded-md">
            <div className="grow bg-gray-600 rounded-lg grid grid-rows-3 gap-2">
                <div className="bg-amber-800 rounded-lg"></div>
                <div className="bg-amber-800 rounded-lg"></div>
                <div className="bg-amber-800 rounded-lg"></div>
            </div>
            <div className="grow bg-gray-600 rounded-lg grid grid-rows-2 gap-2">
              <div className="bg-amber-600 rounded-lg"></div>
              <div className="bg-amber-600 rounded-lg grid grid-rows-2 gap-2 p-10">
                <div className="bg-blue-950 rounded-lg"></div>
                <div className="bg-blue-950 rounded-lg"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Content;
