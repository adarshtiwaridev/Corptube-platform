"use client";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useRouter } from "next/router";
import Sidebar from "@/Components/Sidebar";

export default function PostDetails() {
  const router = useRouter();
  const { name } = router.query;

  // Example dynamic data (replace with API fetch later)
  const person = {
    name: name ? name.toUpperCase() : "LOADING...",
    category: "UI/UX Designer",
    role: "SUPPORT",
    profileImg: "/assets/Polygon 21.jpg",
    coverImg: "/assets/comingsoon-bg.jpg",
  };

  return (
    <div>
   <Sidebar/>
        
    <div className="flex flex-col md:flex-row justify-center items-center min-h-screen bg-[#0f0f0f] text-white p-4 md:p-10">
      

      {/* LEFT SIDE */}
      <div className="relative flex-1 bg-black rounded-3xl overflow-hidden shadow-xl max-w-md md:max-w-lg mb-6 md:mb-0">
        <Image
          src={person.coverImg}
          alt="Cover Background"
          width={600}
          height={800}
          className="object-cover w-full h-full opacity-90"
          priority
        />

        <div className="absolute inset-0 flex flex-col justify-end items-center text-center p-6 bg-gradient-to-t from-black/80 via-transparent">
          <h3 className="text-xs sm:text-sm font-semibold mb-2 tracking-wide">
            OPEN RECRUITMENT DPS CLASS
          </h3>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-wide">
            Coming <span className="text-[#1e90ff]">Soon</span>
          </h1>
          <p className="text-[10px] sm:text-xs mt-3 opacity-80">@designprofessionalofsmartphone</p>
        </div>

        {/* Left/Right Arrows */}
        <button
          aria-label="Previous"
          className="absolute left-3 top-1/2 -translate-y-1/2 bg-[#1e90ff] p-3 rounded-full hover:scale-110 transition-transform"
        >
          <ArrowLeft className="text-white" size={20} />
        </button>
        <button
          aria-label="Next"
          className="absolute right-3 top-1/2 -translate-y-1/2 bg-[#1e90ff] p-3 rounded-full hover:scale-110 transition-transform"
        >
          <ArrowRight className="text-white" size={20} />
        </button>
      </div>

      {/* RIGHT SIDE */}
      <div className="relative flex-1 bg-[#4A6CF7] rounded-3xl p-6 sm:p-8 shadow-xl max-w-md text-white">
        {/* Top Right Back Button */}
        <Link
          href="/"
          aria-label="Go Back"
          className="absolute top-4 right-4 bg-[#1e90ff] hover:bg-[#3679f4] p-3 rounded-full shadow-md transition"
        >
          <ArrowLeft />
        </Link>

        {/* Icons Row */}
        <div className="flex justify-center gap-6 mb-6 mt-10">
          {[
            { src: "/assets/icon-growth.png", alt: "Growth" },
            { src: "/assets/icon-chat.png", alt: "Chat" },
            { src: "/assets/icon-book.png", alt: "Book" },
          ].map((icon, index) => (
            <div
              key={index}
              className="bg-white p-3 rounded-full shadow hover:scale-105 transition-transform"
            >
              <Image src={icon.src} alt={icon.alt} width={30} height={30} />
            </div>
          ))}
        </div>

        {/* Profile Card */}
        <div className="bg-[#5A7BFF] rounded-2xl p-4 shadow-md mb-6 flex flex-col sm:flex-row items-center gap-4">
          <Image
            src={person.profileImg}
            alt="Profile"
            width={80}
            height={80}
            className="rounded-xl border-2 border-white"
          />
          <div className="flex-1 text-center sm:text-left">
            <h2 className="text-lg font-bold">{person.name}</h2>
            <p className="text-sm opacity-90">{person.category}</p>
          </div>
          <span className="bg-white text-[#1e90ff] text-xs font-bold px-3 py-1 rounded-full">
            {person.role}
          </span>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col gap-3">
          {["VIEW", "PORTFOLIO", "INTERACT"].map((label) => (
            <button
              key={label}
              className="bg-white text-[#1e90ff] font-bold py-3 rounded-2xl shadow-lg hover:bg-[#f2f2f2] active:scale-95 transition"
            >
              {label}
            </button>
          ))}
        </div>
      </div>
    </div>

    </div>

  );
}
