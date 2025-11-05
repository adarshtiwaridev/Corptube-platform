// pages/index.js
"use client";

import React, { useState, useEffect } from "react"; 
import Link from "next/link";
import Sidebar from "../Components/Sidebar";
import { useRouter } from "next/navigation";
import PostsToExplore from "../Components/PostsToExplore";
import ProjectToExplore from "../Components/ProjectToExplore";
import SkillsToExplore from "../Components/SkillsToExplore";
 

const HomePage = () => {
 const router = useRouter();
  const [randomComponent, setRandomComponent] = useState(null);

    useEffect(() => {
    const components = [<PostsToExplore key="posts" />, <SkillsToExplore key="skills" />, <ProjectToExplore key="projects" />];
    const randomIndex = Math.floor(Math.random() * components.length);
    setRandomComponent(components[randomIndex]);
  }, []);

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
          <p className="text-xl">▼</p>
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
            <p className="text-xl">▼</p>
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
            <p className="text-xl">▼</p>
          </div>
        </button>
     </div>
      </section>

 
      <PostsToExplore />
      <SkillsToExplore />
      <ProjectToExplore />
    
 
      {randomComponent ? (
        <div className="transition-all duration-500 ease-in-out">{randomComponent}</div>
      ) : (
        <p className="text-center">Loading...</p>
      )}

    

    </main>

    </div>
  );
};

export default HomePage;
