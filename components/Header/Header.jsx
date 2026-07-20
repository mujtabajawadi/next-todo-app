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
    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <>
      <header className="grid grid-cols-6 px-5 py-1 justify-between items-center text-white  bg-white/4 backdrop-blur-xl z-99999 relative">
        <div>
          <h1 className="text-2xl font-bold font-sans text-[#1AC8B8]">
            <span className="">Task</span><span className="">Easy</span>
          </h1>
        </div>
        <div className="flex col-span-4 rounded-lg focus-within:outline focus-within:outline-[#1AC8B8]  bg-white/20 backdrop-blur-xl overflow-hidden">
          <input
            type="text"
            placeholder="Search your task here..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-lg outline-none focus:outline-0 stroke-0 text-white"
          />
          <span className="px-3 py-1 border-l-2 border-l-[#1AC8B8] cursor-pointer bg-white/4 backdrop-blur-xl " onClick={handleSearch}>
            <Search className="text-[#EEF2FF]/50" strokeWidth={2} />
          </span>
        </div>
        
        <div className="col-start-6 flex justify-between items-center">
        <div className="flex justify-end relative ml-5">
          <span className={`p-1 rounded-lg relative backdrop-blur-xl border border-white/12 shadow-[inset_2px_2px_20px_0_rgba(255,255,255,0.20)] cursor-pointer ${unreadCount > 0 ? "bg-[#FBBF24]/70 text-[#FBBF24]": "bg-white/4"}`} onClick={()=> setIsNotificationVisible(!isNotificationVisible)}>
            <Bell className="text-[#EEF2FF]/50" strokeWidth={2}  />
            <div className={`${unreadCount > 0 ? "block" : "hidden"} w-2 h-2 rounded-full bg-[#EF4444] absolute -right-0.5 -top-0.5`}></div>
          </span>
          <div className={`${isNotificationVisible ? "block bg-black/80 backdrop-blur-3xl border border-white/12 shadow-[inset_2px_2px_90px_0_rgba(255,255,255,0.60)] ": "hidden"} absolute max-w-70 w-70 h-80 max-h-80  top-full my-2 rounded-md overflow-x-hidden overflow-y-scroll scrollbar-none`}>
            <p className=" p-3 font-semibold">Notifications</p>
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
        <div>
          <span>
            {dateInformation.weekDay || "Loading..."}
          </span>
          <br />
          <span className="">
            {dateInformation.fullDate}
          </span>
          </div>
        </div>
      </header>
    </>
  );
}

export default Header;
