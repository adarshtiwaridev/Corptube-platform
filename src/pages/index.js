// pages/index.js
"use client";

import React from "react"; 
import SkillsToExplore from "../Components/SkillsToExplore";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import Sidebar from "../Components/Sidebar";

// Sample array of posts
const posts = [
  {
    id: 1,
    title: "Coming Soon",
    image: "/assets/landingphoto/Rectangle 40.png",
    link: "/posts/coming-soon",
  },
  {
    id: 2,
    title: "Background Motion",
    image: "/assets/landingphoto/Rectangle 153.png",
    link: "/posts/background-motion",
  },
  {
    id: 3,
    title: "Think Just Start",
    image: "/assets/landingphoto/Rectangle 154.png",
    link: "/posts/think-start",
  },
  {
    id: 4,
    title: "Wednesday",
    image: "/assets/landingphoto/Rectangle 155.png",
    link: "/posts/wednesday",
  },
  {
    id: 5,
    title: "Creating Significance",
    image: "/assets/landingphoto/Rectangle 156.png",
    link: "/posts/creating-significance",
  },
  {
    id: 6,
    title: "Social Media Design",
    image: "/assets/landingphoto/Rectangle 158.png",
    link: "/posts/social-media-design",
  },
];


const project = {
  id: 1,
  logo: "/assets/landingphoto/Ellipse 4.png",
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

  const [dropdowns, setDropdowns] = useState({
    international: false,
    national: false,
    stock: false,
  });

  const toggleDropdown = (key) => {
    setDropdowns((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className=" bg-gray-900">
 
    <Sidebar />
      <main className="min-h-screen w-[96%] ml-[4%] bg-black text-white p-6">
      {/* BUSINESS NEWS */}
      <section>
        <div className="flex justify-between">
        <h2 className="text-5xl text-heading mb-4">BUSINESS NEWS</h2>
        <Link href="/authpage" className="text-white text-xl bg-gradient-to-b from-[#7127E9] via-[#6B37BF] to-[#401683] rounded-r-full rounded-l-full px-8 mb-5 cursor-pointer ">
         <p className="mt-2">Login</p>
        </Link>
        </div>

        {/* Dropdowns */}
        <div className="space-y-3 ml-11 mr-11">
          <button
            onClick={() => toggleDropdown("international")}
            className="w-full text-3xl bg-[#1E1E1E] flex justify-between items-center border border-blue-400 border-b-[#220FCD] border-b-2 px-4 py-2 rounded-md"
          >
            INTERNATIONAL NEWS
            <div className="text-black bg-white square-aspect-ratio w-10 h-10 rounded-full p-2"><p className="text-xl">{dropdowns.international ? "▲" : "▼"}</p></div>
          </button>

          <button
            onClick={() => toggleDropdown("national")}
            className="w-full text-3xl bg-[#1E1E1E] flex justify-between items-center border border-blue-400 border-b-[#220FCD] border-b-2 px-4 py-2 rounded-md"
          >
            NATIONAL NEWS
            <div className="text-black bg-white square-aspect-ratio w-10 h-10 rounded-full p-2"><p className="text-xl">{dropdowns.national ? "▲" : "▼"}</p></div>
          </button>

          <button
            onClick={() => toggleDropdown("stock")}
            className="w-full text-3xl bg-[#1E1E1E] flex justify-between items-center border border-blue-400 border-b-[#220FCD] border-b-2 px-4 py-2 rounded-md"
          >
            STOCK NEWS
            <div className="text-black bg-white square-aspect-ratio w-10 h-10 rounded-full p-2"><p className="text-xl">{dropdowns.stock ? "▲" : "▼"}</p></div>
          </button>
        </div>
      </section>

      {/* POSTS TO EXPLORE */}
      <section className="mt-10">
        <h2 className="text-5xl text-heading mb-6">POSTS TO EXPLORE</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 ml-11 mr-11 gap-6">
          {posts.map((post) => (
            <Link
              href={post.link}
              key={post.id}
              className="rounded-xl overflow-hidden bg-gray-900 hover:scale-105 transition-transform shadow-lg"
            >
              <Image
                src={post.image}
                alt={post.title}
                width={400}
                height={500}
                className="w-full h-144 object-cover"
              />
            </Link>
          ))}
        </div>
      </section>
        {/* SKILLS TO EXPLORE */}
        <section className="mt-10">
        <SkillsToExplore />
      </section>
        {/* POSTS TO EXPLORE */}
        <section className="mt-10">
        <h2 className="text-5xl  text-heading   mb-6">POSTS TO EXPLORE</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 ml-11 mr-11 gap-6">
          {posts.map((post) => (
            <Link
              href={post.link}
              key={post.id}
              className="rounded-xl overflow-hidden bg-gray-900 hover:scale-105 transition-transform shadow-lg"
            >
              <Image
                src={post.image}
                alt={post.title}
                width={400}
                height={500}
                className="w-full h-144 object-cover"
              />
            </Link>
          ))}
        </div>
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
            <div className="square-aspect-ratio  ">
            <Image src="/assets/landingphoto/Ellipse 7.png" alt="arrow-down" width={60} height={60} />
            </div>
        </div>
      </div>
      </section>

     {/* POSTS TO EXPLORE */}
     <section className="mt-10">
        <h2 className="text-5xl  text-heading   mb-6">POSTS TO EXPLORE</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 ml-11 mr-11 gap-6">
          {posts.map((post) => (
            <Link
              href={post.link}
              key={post.id}
              className="rounded-xl overflow-hidden bg-gray-900 hover:scale-105 transition-transform shadow-lg"
            >
              <Image
                src={post.image}
                alt={post.title}
                width={400}
                height={500}
                className="w-full h-144 object-cover"
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
