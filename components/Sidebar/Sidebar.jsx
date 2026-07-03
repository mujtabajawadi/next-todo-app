"use client";
import Image from "next/image";
import React from "react";
import image from "@/public/images/todoImage.png";
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

function Sidebar() {
  const pathname = usePathname();

  const navItems = [
    { id: 1, name: "Dashboard", icon: <LayoutDashboard />, path: "/dashboard" },
    { id: 2, name: "Vital Task", icon: <Megaphone />, path: "/vital-tasks" },
    { id: 3, name: "My Tasks", icon: <CalendarCheck />, path: "/my-tasks" },
    { id: 4, name: "About", icon: <Info />, path: "/about" },
  ];

  return (
    <div className="max-w-60 flex flex-col grow justify-end">
      <div className="bg-red-400 text-white rounded-tr-lg rounded-br-lg flex flex-col items-center grow mt-8">
        <div className="flex flex-col items-center">
          <Link href="/profile">
            <div className="bg-gray-500 w-15 h-15 rounded-full -mt-5">
              <Image src={image} alt="Profile Image" />
            </div>
          </Link>
          <h2>John Doe</h2>
          <p>johndoe@gmail.com</p>
        </div>
        <nav className="w-[85%] h-full flex flex-col gap-6 px-2 py-4">
          {navItems.map((previous) => {
            const isActive = pathname === previous.path;
            return (
              <ul
                key={previous.id}
                className={`${isActive ? "bg-white text-red-400 rounded-lg" : "hover:bg-[rgba(255,255,255,0.2)] rounded-lg"}`}
              >
                <Link href={previous.path}>
                  <li className="flex gap-2 items-center text-sm font-light p-2">
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
            className=" text-left mt-12 text-sm font-light rounded-lg hover:bg-[rgba(255,255,255,0.2)] p-1"
            onClick={() => signOut({ callbackUrl: "/login" })}
          >
            <button className="flex gap-2 p-1 items-center">
              <LogOut />
              Logout
            </button>
          </div>
        </nav>
      </div>
    </div>
  );
}

export default Sidebar;
