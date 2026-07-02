"use client"
import Image from "next/image";
import React from "react";
import image from "@/public/images/todoImage.png";
import { signOut } from "next-auth/react";
import {LayoutDashboard, CalendarCheck, ListOrdered , Info, Megaphone  } from 'lucide-react';

function Sidebar() {
  const navItems = [
    { id: 1, name: "Dashboard", icon:<LayoutDashboard/>, path: "/dashboard" },
    { id: 2, name: "Vital Task", icon:<Megaphone/>, path: "/vital-tasks" },
    { id: 3, name: "My Tasks", icon:<CalendarCheck/>, path: "/my-tasks" },
    { id: 4, name: "Task Categories", icon:<ListOrdered />, path: "/categories" },
    { id: 5, name: "About", icon:<Info/>, path: "/about" },
  ];


  return (
    <div className="max-w-60 flex flex-col grow justify-end">
      <div className="bg-red-400 text-white rounded-tr-lg rounded-br-lg flex flex-col items-center grow mt-8">
        <div className="flex flex-col items-center">
          <div className="bg-gray-500 w-15 h-15 rounded-full -mt-5">
            <Image src={image} alt="Profile Image"/>
          </div>
          <h2>John Doe</h2>
          <p>johndoe@gmail.com</p>
        </div>
        <nav className="w-[85%] h-full flex flex-col gap-8 px-2 py-4">
          {navItems.map((previous) => (
            <ul key={previous.id}>
              <li className="flex gap-3 items-center text-sm font-light"><span className="font-extralight text-xs">{previous.icon}</span>{previous.name}</li>
            </ul>
          ))}
        </nav>
        <button className="text-left" onClick={() => signOut({ callbackUrl: "/login"})}>Logout</button>
      </div>
    </div>
  );
}

export default Sidebar;
