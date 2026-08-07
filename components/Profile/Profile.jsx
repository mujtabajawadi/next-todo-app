"use client";
import React from "react";
import { useSession } from "next-auth/react";
import { CalendarCheck, ClipboardClock, ClipboardList, ClipboardCheck, UserRound, SquarePen} from "lucide-react";

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
        <div className="text-center md:text-left  ">
        <p className={`${session?.user?.name ? "": "opacity-0 select-none "} font-MarkaziText text-3xl font-bold`}>{session?.user?.name || "Loading Name..."}</p>
        <p className={`${session?.user?.name ? "": "opacity-0 select-none"} text-[#1AC8B8]/85 font-poppins text-xs`} >{session?.user?.email || "Loading Email..."}</p>
        <p className="hidden md:block">‴Stay Productive, Stay Focused‷</p>
        </div>
      </div>
      <div className=" grid col-span-full grid-cols-2 md:grid-cols-4 gap-2">
        <div className="flex gap-2 items-center justify-between bg-white/4 backdrop-blur-xl border-white/12 text-white  shadow-[inset_2px_2px_50px_0_rgba(255,255,255,0.20)] rounded-lg p-3">
          <CalendarCheck className="text-[#1AC8B8]/90" size={24} strokeWidth={2}/>
          <div className="flex flex-col items-center">
            <p className="font-MarkaziText text-lg">Member Since</p>
            <p className="text-xs">28 July 2025</p>
          </div>
        </div>
        <div className="flex gap-2 items-center justify-between bg-white/4 backdrop-blur-xl border-white/12 text-white  shadow-[inset_2px_2px_50px_0_rgba(255,255,255,0.20)] rounded-lg p-3">
        <ClipboardList className="text-[#1AC8B8]/90" size={24} strokeWidth={2}/>         
         <div className="flex flex-col items-center">
            <p className="font-MarkaziText text-lg">Total Tasks</p>
            <p className="text-xs">100</p>
          </div>
        </div>
        <div className="flex gap-2 items-center justify-between bg-white/4 backdrop-blur-xl border-white/12 text-white  shadow-[inset_2px_2px_50px_0_rgba(255,255,255,0.20)] rounded-lg p-3">
          <ClipboardClock className="text-[#1AC8B8]/90" size={24} strokeWidth={2}/>
          <div className="flex flex-col items-center">
            <p className="font-MarkaziText text-lg">Pending</p>
            <p className="text-xs">04</p>
          </div>
        </div>
        <div className="flex gap-2 items-center justify-between bg-white/4 backdrop-blur-xl border-white/12 text-white  shadow-[inset_2px_2px_50px_0_rgba(255,255,255,0.20)] rounded-lg p-3">
          <ClipboardCheck className="text-[#1AC8B8]/90" size={24} strokeWidth={2}/>
          <div className="flex flex-col items-center">
            <p className="font-MarkaziText text-lg">Completed</p>
            <p className="text-xs">96</p>
          </div>
        </div>
      </div>
      <div className="grid md:grid-cols-2 col-span-full gap-2 rounded-lg">
        <div className=" bg-white/4 backdrop-blur-xl border-white/12 text-white  shadow-[inset_2px_2px_50px_0_rgba(255,255,255,0.20)] p-3 rounded-lg">
        <div className="flex justify-between">
          <div className="flex gap-2">
          <UserRound className="text-[#1AC8B8]/90" size={24} strokeWidth={2}/>
          <p className="font-MarkaziText text-2xl font-bold">Personal Information</p>
          </div>
          <div className="py-0.5 px-2 cursor-pointer flex gap-2 justify-center p-2 rounded-md bg-[#414328]/60 border border-[#D1C373]/40 text-[#E8D985] shadow-[0_0_12px_rgba(209,195,115,0.2),inset_0_1px_1px_rgba(255,255,255,0.25)] text-xs items-center">
          <SquarePen size={14} />
          <button className="">Edit</button>
          </div>
        </div>
        <div className="grid grid-cols-2">
          <div className="p-2 flex flex-col gap-2 md:text-right font-bold">
            <p>Username</p>
            <p>Full Name</p>
            <p>Email Address</p>
            <p>Password</p>
          </div>
          <div className="p-2 flex flex-col gap-2 font-extralight">
            <p>mujtaba123</p>
            <p>Mujtaba Jawadi</p>
            <p>mujtaba123@gmail.com</p>
            <p>●●●●●●●●</p>
          </div>
        </div>
        </div>
        <div className="bg-white/4 backdrop-blur-xl border-white/12 text-white  shadow-[inset_2px_2px_50px_0_rgba(255,255,255,0.20)] p-3 rounded-lg">Right Area</div>
      </div>
    </div>
  );
}

export default Profile;
