// pages/index.js
"use client";
import React from "react"; 
import Image from "next/image";
import Link from "next/link";
 
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

const ProjectToExplore = () => {

  return (

      <div>
    
       {/* PROJECTS TO EXPLORE */}
     <section className="mt-10 px-4 sm:px-6 md:px-10">
        <h2 className="text-3xl sm:text-4xl md:text-5xl text-heading mb-6 text-center sm:text-left">PROJECTS TO EXPLORE</h2>

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

    </div>
 
  );
};

export default ProjectToExplore;
