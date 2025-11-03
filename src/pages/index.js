// pages/index.js
"use client";

import React from "react"; 
import SkillsToExplore from "../Components/SkillsToExplore";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import Sidebar from "../Components/Sidebar";
import { useRouter } from "next/navigation";

// Sample array of posts
const posts = [
  {
    id: 1,
    title: "Coming Soon",
    image: "/assets/landingphoto/Rectangle40.png",
    link: "/posts/coming-soon",
  },
  {
    id: 2,
    title: "Background Motion",
    image: "/assets/landingphoto/Rectangle153.png",
    link: "/posts/background-motion",
  },
  {
    id: 3,
    title: "Think Just Start",
    image: "/assets/landingphoto/Rectangle154.png",
    link: "/posts/think-start",
  },
  {
    id: 4,
    title: "Wednesday",
    image: "/assets/landingphoto/Rectangle155.png",
    link: "/posts/wednesday",
  },
  {
    id: 5,
    title: "Creating Significance",
    image: "/assets/landingphoto/Rectangle156.png",
    link: "/posts/creating-significance",
  },
  {
    id: 6,
    title: "Social Media Design",
    image: "/assets/landingphoto/Rectangle158.png",
    link: "/posts/social-media-design",
  },
];


const project = {
  id: 1,
  logo: "/assets/landingphoto/Ellipse4.png",
  name: "GUSPTECH",
  stage: "Early Stage (MVP Developed, Seeking Beta Users)",
  role: "TECHNICAL CO-FOUNDER",
  description: `GUSPTECH is building a mobile-first platform that helps Gen Z and Millennials 
  invest smarter through AI-driven insights and community-based investing. 
  We’ve validated the idea with 200+ survey responses and have a working MVP. 
  Now we’re looking for a passionate technical co-founder who can take charge of 
  scaling the product, building a robust backend, and leading the dev team. 
  If you’re excited about fintech, AI, and democratizing wealth creation, let's connect!`,
};

const HomePage = () => {
 const router = useRouter();
  const [dropdowns, setDropdowns] = useState({
    international: false,
    national: false,
    stock: false,
  });

 

  return (
    <div className=" bg-gray-900">
 
    <Sidebar />
      <main className="min-h-screen  w-[96%] ml-[4%] bg-black text-white p-6">
      {/* BUSINESS NEWS */}
      <section>
     <div className="flex flex-col sm:flex-row justify-between items-center gap-4 sm:gap-6 mb-6 px-4 sm:px-8">
  <h2 className="text-3xl sm:text-4xl md:text-5xl text-heading font-semibold text-center sm:text-left">
    BUSINESS NEWS
  </h2>

  <Link
    href="/authpage"
    className="text-white text-base sm:text-lg md:text-xl bg-gradient-to-b from-[#7127E9] via-[#6B37BF] to-[#401683]
              rounded-full px-6 sm:px-8 py-2 sm:py-3 mt-2 sm:mt-0 transition-transform duration-300 hover:scale-105"
  >
    Start Growing
  </Link>
</div>

        
     <div className="flex flex-col ml-10 space-y-8 gap-4 sm:gap-2 sm:space-y-3 w-full">
  <button
    onClick={() => router.push("/news/international")}
    className="cursor-pointer flex justify-between items-center font-semibold
               bg-[#1E1E1E] border border-blue-400 border-b-[#220FCD] border-b-2 
               px-4 py-2 rounded-md text-2xl sm:text-3xl
               w-[386px] sm:w-[600px] md:w-[800px] lg:w-[1200px] xl:w-[1291px]
               h-[60px] sm:h-[64px] md:h-[67px]"
  >
    INTERNATIONAL NEWS
    <div className="text-black bg-white w-10 h-10 rounded-full flex justify-center items-center">
      <p className="text-xl">{dropdowns.international ? "▲" : "▼"}</p>
    </div>
  </button>

  <button
    onClick={() => router.push("/news/national")}
    className="cursor-pointer flex justify-between items-center font-semibold
               bg-[#1E1E1E] border border-blue-400 border-b-[#220FCD] border-b-2 
               px-4 py-2 rounded-md text-2xl sm:text-3xl
               w-[386px] sm:w-[600px] md:w-[800px] lg:w-[1000px] xl:w-[1291px]
               h-[60px] sm:h-[64px] md:h-[67px]"
  >
    NATIONAL NEWS
    <div className="text-black bg-white w-10 h-10 rounded-full flex justify-center items-center">
      <p className="text-xl">{dropdowns.national ? "▲" : "▼"}</p>
    </div>
  </button>

  <button
    onClick={() => router.push("/news/stock")}
    className="cursor-pointer flex justify-between items-center font-semibold
               bg-[#1E1E1E] border border-blue-400 border-b-[#220FCD] border-b-2 
               px-4 py-2 rounded-md text-2xl sm:text-3xl
               w-[386px] sm:w-[600px] md:w-[800px] lg:w-[1000px] xl:w-[1291px]
               h-[60px] sm:h-[64px] md:h-[67px]"
  >
    STOCK NEWS
    <div className="text-black bg-white w-10 h-10 rounded-full flex justify-center items-center">
      <p className="text-xl">{dropdowns.stock ? "▲" : "▼"}</p>
    </div>
  </button>
</div>

      </section>

      {/* POSTS TO EXPLORE */}
  <section className="mt-10 px-4 sm:px-6 md:px-10">
  <h2 className="text-3xl sm:text-4xl md:text-5xl text-heading mb-6 text-center sm:text-left">
    POSTS TO EXPLORE
  </h2>

  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-1 sm:gap-6">
    {posts.map((post) => (
      <Link
        href={post.link}
        key={post.id}
        className="rounded-[24px] overflow-hidden  hover:scale-105 transition-transform duration-300 shadow-lg"
      >
        <Image
          src={post.image}
          alt={post.title}
          width={322}
          height={450}
          className="object-cover w-[164px] h-[229px] sm:w-[322px] sm:h-[450px] rounded-[24px] mx-auto"
        />
      </Link>
    ))}
  </div>
</section>

        {/* SKILLS TO EXPLORE */}
        <section className="mt-10">
        <SkillsToExplore />
      </section>

       {/* PROJECTS TO EXPLORE */}
       <section className="mt-16">
        <h2 className="text-5xl  text-heading   mb-6">PROJECTS TO EXPLORE</h2>

        <div className=" ml-11 mr-11 rounded-r-4xl rounded-l-4xl bg-gradient-to-b from-[#164CD7] to-[#999999] p-1 shadow-lg">
          {/* Logo + Buttons */}
          <div className="flex gap-6 items-center bg-[#140808] rounded-r-4xl rounded-l-4xl p-8 w-full h-auto">

{/* Left Section */}
<div className="flex flex-col items-center">
  <Image
    src={project.logo}
    alt={project.name}
    width={120}   // increased from 80
    height={120}  // increased from 80
  />

  <div className="flex flex-col bg-[#1E1E1E] rounded-4xl p-6 border border-white gap-4 mt-6">
    <button className="px-5 py-3 rounded-md bg-[#575FFE] text-white text-base">
      INTERACT
    </button>
    <button className="px-5 py-3 rounded-md bg-[#575FFE] text-white text-base">
      SUPPORT
    </button>
    <button className="px-5 py-3 rounded-md bg-[#575FFE] text-white text-base">
      SAVE
    </button>
  </div>
</div>

{/* Right Section */}
<div className="flex-1 bg-[#1E1E1E] p-6 rounded-3xl border border-white">
  <h3 className="text-2xl font-bold">{project.name}</h3>
  <p className="text-lg font-semibold mt-2">
    Stage: {project.stage}
  </p>
  <p className="text-lg font-semibold">
    ROLE OFFERED: {project.role}
  </p>
  <p className="text-2xl mt-6  leading-relaxed whitespace-pre-line">
    {project.description}
  </p>
</div>
</div>

        </div>

        {/* See More Projects Button */}
        <div className="flex justify-center ml-32 mr-32  mt-8 rounded-r-full rounded-l-full bg-gradient-to-b from-[#164CD7] to-[#999999] p-1 shadow-lg">
        <div className="flex  justify-between rounded-r-full rounded-l-full w-full bg-[#140808] p-4">
        
           <p className="text-white mt-3 text-3xl">SEE MORE PROJECTS</p>
            <Link href="/projects/moreprojects" className="square-aspect-ratio  ">
            <Image src="/assets/landingphoto/Ellipse7.png" alt="arrow-down" width={60} height={60} />
            </Link>
        </div>
      </div>
      </section>

     {/* POSTS TO EXPLORE */}
   <section className="mt-10 px-4 sm:px-6 md:px-10">
  <h2 className="text-3xl sm:text-4xl md:text-5xl text-heading mb-6 text-center sm:text-left">
    POSTS TO EXPLORE
  </h2>

  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-1 sm:gap-6">
    {posts.map((post) => (
      <Link
        href={post.link}
        key={post.id}
        className="rounded-[24px] overflow-hidden  hover:scale-105 transition-transform duration-300 shadow-lg"
      >
        <Image
          src={post.image}
          alt={post.title}
          width={322}
          height={450}
          className="object-cover w-[164px] h-[229px] sm:w-[322px] sm:h-[450px] rounded-[24px] mx-auto"
        />
      </Link>
    ))}
  </div>
</section>

    </main>

    </div>
  );
};

export default HomePage;
