import React from "react";
import { Globe, Crosshair, Star, ChartColumn, CircleCheck, CodeXml, Sparkles } from "lucide-react";
import Image from "next/image";
import AboutImage from '@/public/images/about-image.png'

function About() {
  return (
    <div className="flex flex-col gap-3 py-2">
      <div>
        <h1 className="text-[#16213E] font-semibold text-2xl">About TaskEasy</h1>
        <p>Learn more about the mission, features and technology behind TaskEasy</p>
      </div>
      <div className="flex justify-between bg-[#FFFFFF] p-3 border border-gray-200 shadow-md  h-50 rounded-md overflow-hidden">
        <div className="w-[50%] flex flex-col p-3 gap-3 ">
          <div className="flex gap-2 items-center">
            <span className="bg-[#4F46E5] rounded-full border p-1">
            <Globe className="text-[#EEF2FF]" size={26}/>
            </span>
            <h1>TaskEasy</h1>
          </div>
          <p>A modern task management application designed to help you organize your work, stay productive and never miss important deadlines</p>
          <p className="flex gap-2 text-[#4F46E5] p-1 rounded-md bg-[#EEF2FF] border w-fit items-center justify-center">
            <Sparkles  size={16}/><span>Version 1.0</span>
          </p>
        </div>
        <div className="w-[50%] flex items-center justify-center">
          <Image src={AboutImage} height={150} alt="Hero-Image"/>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-3 p-3o verflow-hidden">
        <div className="flex flex-col justify-between p-3 bg-[#FFFFFF] border border-gray-200 shadow-md rounded-md">
          <div className="flex gap-2 ites-center">
            <span className="bg-[#EEF2FF] rounded-md border p-1">
            <Crosshair className="text-[#4F46E5]" size={20}/>
            </span>
            <h1>Our Mission</h1>
          </div>
          <div>
            <p className="text-xs leading-loose text-justify">We believe task management should be simple, fast and distraction-free. TaskEasy helps individuals focus on what truly matters - getting things done.</p>
          </div>
        </div>
        <div className="col-span-2 p-3 flex flex-col justify-between gap-2 bg-[#FFFFFF] border border-gray-200 shadow-md rounded-md">
        <div className="flex gap-2 items-center">
          <span className="bg-[#EEF2FF] rounded-md border p-1">
            <Star className="text-[#4F46E5]" size={20}/>
          </span>
            <h1>Key Features</h1>
        </div>
          <div className="grid grid-cols-2 gap-2 text-xs">
            <p className="flex gap-1"><span><CircleCheck className="text-[#4F46E5]" size={18}/></span>Create, edit and delete tasks</p>
            <p className="flex gap-1"><span><CircleCheck className="text-[#4F46E5]" size={18}/></span>Priority levels and due dates</p>
            <p className="flex gap-1"><span><CircleCheck className="text-[#4F46E5]" size={18}/></span>Daily deadline notifications</p>
            <p className="flex gap-1"><span><CircleCheck className="text-[#4F46E5]" size={18}/></span>Track progress with analytics</p>
            <p className="flex gap-1"><span><CircleCheck className="text-[#4F46E5]" size={18}/></span>Instant searching</p>
            <p className="flex gap-1"><span><CircleCheck className="text-[#4F46E5]" size={18}/></span>Clean Interface</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;
