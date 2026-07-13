"use client";
import React from "react";
import { Search, Bell } from "lucide-react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";

function Header() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const handleSearch = (searchString) => {
    const params = new URLSearchParams(searchParams.toString());

    if (searchString) {
      params.set("search", searchString);
    } else {
      params.delete("search");
    }
    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <>
      <header className="bg-[#ededed] grid grid-cols-6 px-5 py-1 shadow-lg justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold font-sans">
            <span className="text-red-400">Task</span>Easy
          </h1>
        </div>
        <div className="flex col-span-3">
          <input
            type="text"
            placeholder="Search your task here..."
            defaultValue={searchParams.get("search") ?? ""}
            onChange={(event) => handleSearch(event.target.value)}
            className="w-full rounded-lg"
          />
          <span className="bg-red-400 p-1 rounded">
            <Search className="text-white" strokeWidth={2} />
          </span>
        </div>
        <div className="col-start-5 flex justify-end">
          <span className="bg-red-400 p-1 rounded relative">
            <Bell className="text-white" strokeWidth={2} />
            <div className="w-2 h-2 rounded-full bg-red-800 absolute -right-0.5 -top-0.5"></div>
          </span>
        </div>
        <div className="col-start-6 text-end">
          <span>
            {new Date().toLocaleDateString(undefined, { weekday: "long" })}
          </span>
          <br />
          <span className="text-blue-600">
            {new Date().toLocaleDateString()}
          </span>
        </div>
      </header>
    </>
  );
}

export default Header;
