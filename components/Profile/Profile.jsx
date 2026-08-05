"use client";
import React from "react";
import { useSession } from "next-auth/react";
import { CalendarCheck, ClipboardClock, ClipboardList, ClipboardCheck, UserRound} from "lucide-react";

function Profile() {
  const { data: session } = useSession();
  return (
    <div className="gap-2 grid grid-cols-12">
      <div
        className="flex flex-col md:flex-row gap-2 md:gap-5 items-center justify-center md:justify-start p-3 md:p-7 col-span-full md:h-[35dvh] bg-cover bg-center bg-no-repeat rounded-lg"
        style={{ backgroundImage: "url(/images/profile-bg.png)" }}
      >
        <div
          className="h-20 w-20 md:h-30 md:w-30 rounded-full flex justify-center items-center bg-center bg-cover shadow-[0_0_25px_5px_rgba(26,200,184,0.25)]"
          style={{
            backgroundImage: `url(${process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT}${session?.user?.image})`,
          }}
        ></div>
        <div className="text-center md:text-left">
        <p className={`${session?.user?.name ? "": "opacity-0 select-none"}`}>{session?.user?.name || "Loading Name..."}</p>
        <p className={`${session?.user?.name ? "": "opacity-0 select-none"}`} >{session?.user?.email || "Loading Email..."}</p>
        <p className="hidden md:block">"Stay Productive, Stay Focused"</p>
        </div>
      </div>
      <div className=" grid col-span-full grid-cols-2 md:grid-cols-4 gap-2">
        <div className="flex gap-2 items-center justify-between md:justify-around bg-white/4 backdrop-blur-xl border-white/12 text-white  shadow-[inset_2px_2px_50px_0_rgba(255,255,255,0.20)] rounded-lg p-3">
          <CalendarCheck className="text-[#1AC8B8]/90" size={24} strokeWidth={2}/>
          <div>
            <p>Member Since</p>
            <p>28 July 2025</p>
          </div>
        </div>
        <div className="flex gap-2 items-center justify-between md:justify-around bg-white/4 backdrop-blur-xl border-white/12 text-white  shadow-[inset_2px_2px_50px_0_rgba(255,255,255,0.20)] rounded-lg p-3">
        <ClipboardList className="text-[#1AC8B8]/90" size={24} strokeWidth={2}/>          <div>
            <p>Total Tasks</p>
            <p>100</p>
          </div>
        </div>
        <div className="flex gap-2 items-center justify-between md:justify-around bg-white/4 backdrop-blur-xl border-white/12 text-white  shadow-[inset_2px_2px_50px_0_rgba(255,255,255,0.20)] rounded-lg p-3">
          <ClipboardClock className="text-[#1AC8B8]/90" size={24} strokeWidth={2}/>
          <div>
            <p>Pending Tasks</p>
            <p>04</p>
          </div>
        </div>
        <div className="flex gap-2 items-center justify-between md:justify-around bg-white/4 backdrop-blur-xl border-white/12 text-white  shadow-[inset_2px_2px_50px_0_rgba(255,255,255,0.20)] rounded-lg p-3">
          <ClipboardCheck className="text-[#1AC8B8]/90" size={24} strokeWidth={2}/>
          <div>
            <p>Completed</p>
            <p>96</p>
          </div>
        </div>
      </div>
      <div className="grid md:grid-cols-2 col-span-full gap-2 rounded-lg">
        <div className="flex justify-between bg-gray-600 p-3 ">
          <div className="flex gap-2">
          <UserRound className="text-[#1AC8B8]/90" size={24} strokeWidth={2}/>
          <p>Personal Information</p>
          </div>
          <button>Edit</button>
        </div>
        <div className="bg-gray-800 p-3">Right Area</div>
      </div>
    </div>
  );
}

export default Profile;
