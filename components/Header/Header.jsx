"use client";
import React, { useEffect, useState } from "react";
import { Search, Bell } from "lucide-react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { useNotifications } from "@/hooks/useNotifications";
import Link from "next/link";


function Header() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const {notifications, unreadCount, markAsRead} = useNotifications()
  const [isNotificationVisible, setIsNotificationVisible] = useState(false)
  const [dateInformation, setDateInformation] = useState({weekDay: "", fullDate: ""})
  const [searchQuery, setSearchQuery] = useState(searchParams.get('search') ?? '');


  useEffect(()=>{
    setDateInformation({
      weekDay: new Date().toLocaleDateString(undefined, { weekday: "long" }),
      fullDate: new Date().toLocaleDateString(),
    });
  },[])

  const handleSearch = (event) => {
    event.preventDefault()
    const params = new URLSearchParams(searchParams.toString());

    if (searchQuery) {
      params.set("search", searchQuery);
    } else {
      params.delete("search");
    }
    setSearchQuery("")
    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <>
      <header className="bg-[#FFFFFF] border-b-[#E5E7EB] grid grid-cols-6 px-5 py-1 shadow-[0_4px_18px_rgba(15,23,42,.05)] justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold font-sans">
            <span className="text-[#4338CA]">Task</span><span className="text-[#16213E]">Easy</span>
          </h1>
        </div>
        <div className="flex col-span-3 py-1 px-3 rounded-lg border border-[#E5E7EB] focus-within:outline-[#4F46E5] focus-within:outline">
          <input
            type="text"
            placeholder="Search your task here..."
            defaultValue={searchParams.get("search") ?? ""}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-lg focus:outline-none outline-none bg-[#FFFFFF] text-[#94A3B8]"
          />
          <span className="bg-[#4F46E5] p-1 rounded-lg" onClick={handleSearch}>
            <Search className="text-[#EEF2FF]" strokeWidth={2} />
          </span>
        </div>
        <div className="col-start-5 flex justify-end relative">
          <span className="p-1 rounded-lg relative bg-[#EEF2FF] border border-gray-300 cursor-pointer" onClick={()=> setIsNotificationVisible(!isNotificationVisible)}>
            <Bell className="text-[#4F46E5]" strokeWidth={2}  />
            <div className={`${unreadCount > 0 ? "block" : "hidden"} w-2 h-2 rounded-full bg-[#EF4444] absolute -right-0.5 -top-0.5`}></div>
          </span>
          <div className={`${isNotificationVisible ? "block z-9999 bg-[#16213E]": "hidden"} absolute max-w-70 w-70 h-80 max-h-80  top-full my-4 rounded-md overflow-x-hidden overflow-y-scroll scrollbar-thin scrollbar-thumb-[#4F46E5] scrollbar-track-sky-100`}>
            <p className="bg-[#FFFFFF] p-3 font-semibold">&bull; Notifications</p>
            {
              notifications.length > 0 ? notifications.map((task)=>(
                <Link key={task._id} href={`/my-tasks/${task.taskId._id}`}>
                <div  className="px-3 py-1 my-5 border-b-2 border-[rgba(255,255,255,0.4)] text-[#EEF2FF] rounded-lg hover:scale-103 transition-transform duration-500"  onClick={()=>{ 
                  markAsRead(task._id)
                  setIsNotificationVisible(false)}}>
                  <h1>{task.taskId.title.slice(0,40)}</h1>
                  <p>Priority: <span className="text-red-500">{task.taskId.priority}</span></p>
                </div>
                </Link>
              )) : (
                <div className="flex justify-center mt-5 text-[#E5E7EB]">No New Notifications</div>

              )
            }
          </div>
        </div>
        <div className="col-start-6 text-end text-[#111827]">
          <span>
            {dateInformation.weekDay || "Loading..."}
          </span>
          <br />
          <span className="text-[#4F46E5]">
            {dateInformation.fullDate}
          </span>
        </div>
      </header>
    </>
  );
}

export default Header;
