import React from "react";
import {
  Globe,
  Crosshair,
  Star,
  ChartColumn,
  CircleCheck,
  CodeXml,
  Sparkles,
} from "lucide-react";
import Image from "next/image";
import AboutImage from "@/public/images/about-image.png";

function About() {
  return (
    <div className="flex flex-col gap-2">
      <div className="text-white">
        <h1 className="font-MarkaziText text-3xl">
          About TaskEasy
        </h1>
        <p className="font-karla">
          Learn more about the mission, features and technology behind TaskEasy
        </p>
      </div>
      <div className="relative flex justify-between bg-white/4 backdrop-blur-xl border border-white/12 rounded-[20px] py-2  shadow-[inset_2px_2px_50px_0_rgba(255,255,255,0.20)]">
        {/* Cyan Radial Glow Background (Positioned behind the image) */}
        <div className="pointer-events-none absolute right-30 top-1/2 -translate-y-1/2 h-62.5 w-62.5 rounded-full bg-[radial-gradient(circle,rgba(26,200,184,0.75)_0%,rgba(26,200,184,0)_70%)] blur-2xl"></div>

        {/* Left Content Area */}
        <div className="relative z-10 w-[50%] flex flex-col p-3 gap-3">
          <div className="flex gap-2 items-center">
            <span className="bg-[#1AC8B8]/15 rounded-full border border-[#1AC8B8]/30 p-2 shadow-[0_0_12px_rgba(26,200,184,0.3)]">
              <Globe className="text-[#1AC8B8]" size={26} />
            </span>
            <h1 className="text-2xl font-MarkaziText text-white">TaskEasy</h1>
          </div>

          <p className="text-white text-sm leading-relaxed font-karla">
            A modern task management application designed to help you organize
            your work, stay productive and never miss important deadlines
          </p>

          {/* Version Badge (Gold Theme) */}
          <p className="flex gap-2 text-[#FBBF24] text-xs font-karla p-2 rounded-lg bg-[#FBBF24]/10 border border-[#FBBF24]/40 shadow-[0_0_10px_rgba(251,191,36,0.3)] w-fit items-center justify-center">
            <Sparkles size={16} />
            <span>Version 1.0</span>
          </p>
        </div>

        {/* Right Image Container */}
        <div className="relative z-10 w-[50%] flex items-center justify-center">
          <Image src={AboutImage} height={150} alt="Hero-Image" />
        </div>
      </div>
      <div className="grid grid-cols-3 gap-3 overflow-hidden">
        <div className="flex flex-col justify-between p-3 gap-3 bg-white/4 backdrop-blur-xl  border-white/12 rounded-[20px] border text-white shadow-[inset_2px_2px_50px_0_rgba(255,255,255,0.20)]">
          <div className="flex gap-2 items-center text-2xl font-MarkaziText">
            <span className="bg-[#1AC8B8]/15 rounded-md border border-[#1AC8B8]/30 p-2 shadow-[0_0_12px_rgba(26,200,184,0.3)]">
              <Crosshair className="text-[#1AC8B8]" size={20} />
            </span>
            <h1>Our Mission</h1>
          </div>
          <div>
            <p className="text-xs font-karla leading-loose text-justify">
              Task management should be simple, fast and
              distraction-free. TaskEasy helps individuals focus on what truly
              matters - getting things done.
            </p>
          </div>
        </div>
        
        <div className="col-span-2 p-3 flex flex-col justify-between gap-2 bg-white/4 backdrop-blur-xl  border-white/12 rounded-[20px] border text-white shadow-[inset_2px_2px_50px_0_rgba(255,255,255,0.20)]">
          <div className="flex gap-2 items-center text-2xl font-MarkaziText">
            <span className="bg-[#1AC8B8]/15 rounded-md border border-[#1AC8B8]/30 p-2 shadow-[0_0_12px_rgba(26,200,184,0.3)]">
              <Star className="text-[#1AC8B8]" size={20} />
            </span>
            <h1>Key Features</h1>
          </div>
          <div className="grid grid-cols-2 gap-2 text-xs font-karla">
            <p className="flex gap-1">
              <span>
                <CircleCheck className="text-[#1AC8B8]" size={14} />
              </span>
              Create, edit and delete tasks
            </p>
            <p className="flex gap-1">
              <span>
                <CircleCheck className="text-[#1AC8B8]" size={14} />
              </span>
              Priority levels and due dates
            </p>
            <p className="flex gap-1">
              <span>
                <CircleCheck className="text-[#1AC8B8]" size={14} />
              </span>
              Daily deadline notifications
            </p>
            <p className="flex gap-1">
              <span>
                <CircleCheck className="text-[#1AC8B8]" size={14} />
              </span>
              Track progress with analytics
            </p>
            <p className="flex gap-1">
              <span>
                <CircleCheck className="text-[#1AC8B8]" size={14} />
              </span>
              Instant searching
            </p>
            <p className="flex gap-1">
              <span>
                <CircleCheck className="text-[#1AC8B8]" size={14} />
              </span>
              Clean Interface
            </p>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-between  bg-white/4 backdrop-blur-xl  border-white/12 rounded-[20px] border text-white p-3  shadow-[inset_2px_2px_50px_0_rgba(255,255,255,0.20)]">
        <div className="flex gap-2 items-center w-[40%] text-2xl font-MarkaziText">
          <span className="bg-[#1AC8B8]/15  border-[#1AC8B8]/30 p-2 shadow-[0_0_12px_rgba(26,200,184,0.3)] rounded-md border">
            <CodeXml className="text-[#1AC8B8]" size={20} />
          </span>
          <h1>Technology Stack</h1>
        </div>
        <marquee>
          <div className="flex gap-20 items-center justify-center">
            <span>
              {" "}
              <Image
                src="https://thesvg.org/icons/react/wordmark-dark.svg"
                alt="React"
                width={80}
                height={80}
              />
            </span>
            <span className="flex gap-1 items-center justify-center">
              <Image
                src="https://thesvg.org/icons/nextdotjs/default.svg"
                alt="Next.js"
                width={20}
                height={20}
              />
              <span>
                <Image
                  src="https://thesvg.org/icons/nextdotjs/wordmark-light.svg"
                  alt="Next.js"
                  width={80}
                  height={80}
                />
              </span>
            </span>
            <span>
              {" "}
              <Image
                src="https://thesvg.org/icons/mongodb/wordmark-dark.svg"
                alt="MongoDB"
                width={100}
                height={100}
              />
            </span>
            <span>
              {" "}
              <Image
                src="https://thesvg.org/icons/tailwind-css/wordmark-dark.svg"
                alt="Tailwind CSS"
                width={120}
                height={120}
              />
            </span>
            <span>
              <Image
                src="https://thesvg.org/icons/authdotjs/default.svg"
                alt="Auth.js"
                width={24}
                height={24}
              />
            </span>
          </div>
        </marquee>
      </div>
    </div>
  );
}

export default About;
