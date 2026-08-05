"use client";
import React, { useEffect, useState, useContext } from "react";
import { signOut } from "next-auth/react";
import {
  LayoutDashboard,
  CalendarCheck,
  Info,
  Megaphone,
  LogOut,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import { MenuContext } from "@/context/menuContext";

function Sidebar() {
  const {isMenuOpen, toggleSidebar} = useContext(MenuContext)
  const pathname = usePathname();

  const { data: session } = useSession();

  const navItems = [
    { id: 1, name: "Dashboard", icon: <LayoutDashboard size={16}/>, path: "/dashboard" },
    { id: 2, name: "Vital Tasks", icon: <Megaphone size={16}/>, path: "/vital-tasks" },
    { id: 3, name: "My Tasks", icon: <CalendarCheck size={16}/>, path: "/my-tasks" },
    { id: 4, name: "About", icon: <Info size={16}/>, path: "/about" },
  ];


  const handleItemClick = () => {
    if (toggleSidebar) {
      toggleSidebar();
    }
  };

  return (
    <div className={`flex-col grow justify-end min-w-60 max-w-60 md:static fixed left-0  h-full flex transition-transform duration-300 ease-in-out z-99999 md:h-auto md:min-h-full ${isMenuOpen ? " translate-x-0   " : "-translate-x-full md:translate-x-0"}`}>
      <div className="bg-white/4 backdrop-blur-xl  border-white/12 text-white rounded-tr-lg rounded-br-lg flex flex-col items-center grow mt-8  shadow-[inset_2px_2px_50px_0_rgba(255,255,255,0.20)]">
        <div className={`flex flex-col items-center`}>
          <Link href="/profile">
            <div
              className={`w-15 h-15 rounded-full -mt-5 flex justify-center items-center bg-center bg-cover shadow-[0_0_25px_5px_rgba(26,200,184,0.25)]`}
              style={{backgroundImage: `url(${process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT}${session?.user?.image})`}}
              onClick={handleItemClick}
            >
            </div>
          </Link>
          <h2 className="font-MarkaziText text-2xl">{session?.user?.name}</h2>
          <p className="text-[#1AC8B8]/85  font-poppins text-xs">{session?.user?.email}</p>
        </div>
        <nav className="w-[85%] h-full flex flex-col gap-6 px-2 py-4">
          {navItems.map((previous) => {
            const isActive = pathname === previous.path;
            return (
              <ul
                key={previous.id}
                className={`${isActive ? "border border-[#1AC8B8]/60 bg-[#1AC8B8]/12 text-sm font-semibold text-white shadow-[0_0_15px_rgba(26,200,184,0.35),inset_0_1px_1px_rgba(255,255,255,0.2)] rounded-lg" : "hover:bg-white/4 hover:backdrop-blur-xl  hover:border-white/12 rounded-lg"}`}
              >
                <Link href={previous.path}  onClick={handleItemClick}>
                  <li className="flex gap-2 items-center text-sm font-light font-karla p-2">
                    <span className="font-extralight text-xs">
                      {previous.icon}
                    </span>
                    {previous.name}
                  </li>
                </Link>
              </ul>
            );
          })}

          <div
            className=" text-left mt-12 text-sm font-light rounded-lg hover:bg-[#DC2626] p-1 cursor-pointer transition-all duration-400"
            onClick={() => signOut({ callbackUrl: "/login" })}
          >
            <button className="flex gap-2 p-1 items-center font-karla">
              <LogOut size={16}/>
              Logout
            </button>
          </div>
        </nav>
      </div>
    </div>
  );
}

export default Sidebar;
