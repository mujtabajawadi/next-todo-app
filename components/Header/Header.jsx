"use client";
import React, { useEffect, useState, useContext } from "react";
import { Search, Bell } from "lucide-react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { useNotifications } from "@/hooks/useNotifications";
import Link from "next/link";
import {Menu, X} from "lucide-react";
import { MenuContext } from "@/context/menuContext";


function Header() {
  const context = useContext(MenuContext);
  // const {isMenuOpen, toggleSidebar} = useContext(MenuContext)
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const {notifications, unreadCount, markAsRead} = useNotifications()
  const [isNotificationVisible, setIsNotificationVisible] = useState(false)
  const [dateInformation, setDateInformation] = useState({weekDay: "", fullDate: ""})
  const [searchQuery, setSearchQuery] = useState(searchParams.get('search') ?? '');

  const handleMenuClick = (e) => {
    context.toggleSidebar();
  };

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
      <header className="grid grid-cols-12 md:px-5 px-3 py-1 justify-between items-center text-white  bg-white/4 backdrop-blur-xl z-99999 relative">
        <div className="col-span-3 flex items-center gap-3">
        <button
          type="button"
          onClick={handleMenuClick}
          className="py-2 px-1 text-white hover:text-[#1AC8B8] cursor-pointer transition-colors focus:outline-none md:hidden"
          aria-label="Toggle Sidebar Menu"
        >
          {
           context.isMenuOpen ? <X size={20}/> : <Menu size={20} />
          }
          
        </button>
          <h1 className="text-3xl font-MarkaziText text-[#1AC8B8]">
            <span className="">Task</span><span className="">Easy</span>
          </h1>
        </div>
        
        <div className="flex col-span-6 focus-within:outline focus-within:outline-[#1AC8B8]  bg-white/20 backdrop-blur-xl rounded-lg overflow-hidden">
          <input
            type="text"
            placeholder="Search your task here..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full p-2 font-karla  outline-none focus:outline-0 stroke-0 text-white"
          />
          <span className="px-3 py-1 border-l-2 border-l-[#1AC8B8]/40 cursor-pointer bg-white/4 backdrop-blur-xl flex items-center " onClick={handleSearch}>
            <Search className="text-[#EEF2FF]/50" strokeWidth={3} size={18}/>
          </span>
        </div>
        
        <div className="col-span-3 flex md:justify-between justify-end md:items-center">
        <div className="flex justify-end relative ml-10">
          <span className={`p-2 items-center justify-center rounded-lg relative backdrop-blur-xl border border-white/12 shadow-[inset_2px_2px_20px_0_rgba(255,255,255,0.20)] cursor-pointer ${unreadCount > 0 ? "bg-[#FBBF24]/70 text-[#FBBF24]": "bg-white/4"}`} onClick={()=> setIsNotificationVisible(!isNotificationVisible)}>
            <Bell className="text-[#EEF2FF]/50" strokeWidth={2} size={18}  />
            <div className={`${unreadCount > 0 ? "block" : "hidden"} w-2 h-2 rounded-full bg-[#EF4444] absolute -right-0.5 -top-0.5`}></div>
          </span>
          <div className={`${isNotificationVisible ? "block bg-[#081E20]/90 backdrop-blur-3xl border border-[#FBBF24]/80 shadow-[inset_2px_2px_200px_0_rgba(255,255,255,0.20),0_0_10px_2px_rgba(251,187,36,0.5)] ": "hidden"} absolute max-w-70 w-70 h-80 max-h-80  top-full my-2 rounded-md overflow-x-hidden overflow-y-scroll scrollbar-none `}>
            <p className=" p-3 font-semibold">Notifications</p>
            {
              notifications.length > 0 ? notifications.map((task)=>(
                <Link key={task._id} href={`/my-tasks/${task.taskId._id}`}>
                <div  className="px-3 py-1 my-2 text-[#EEF2FF] bg-white/15 backdrop-blur-3xl rounded-lg hover:scale-103 transition-transform duration-500 mx-3 border border-[#FBBF24] shadow-[0_0_10px_rgba(251,191,36,0.6)"  onClick={()=>{ 
                  markAsRead(task._id)
                  setIsNotificationVisible(false)}}>
                  <h1>{task.taskId.title.slice(0,40)}</h1>
                  <p>Priority: <span className="text-red-500">{task.taskId.priority}</span></p>
                </div>
                </Link>
              )) : (
                <div className="flex justify-center mt-5 text-[#E5E7EB] font-karla">No New Notifications</div>

              )
            }
          </div>
        </div>
        <div className="font-karla text-xs text-center hidden md:block">
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
