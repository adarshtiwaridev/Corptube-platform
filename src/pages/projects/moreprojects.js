"use client";
import Sidebar from "@/Components/Sidebar";
import Link from "next/link";
import Image from "next/image";

const projects = [
  {
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
  },
  {
    id: 2,
    logo: "/assets/landingphoto/Ellipse4.png",
    name: "CONECLICK",
    stage: "Early Stage (MVP Developed, Seeking Beta Users)",
    role: "TECHNICAL CO-FOUNDER",
    description: ` CONECLICK is building a mobile-first platform that
     helps Gen Z and Millennials invest smarter through AI-driven insights and
      community-based investing. We’ve validated the idea with 200+ survey responses 
      and have a working MVP. Now we’re looking for a passionate technical co-founder
       who can take charge of scaling the product, building a robust backend, and
        leading the dev team. If you’re excited about fintech, AI,
         and democratizing wealth creation, let’s connect!`,
  },
  {
    id: 3,
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
  },
];

export default function ProjectsToExplore() {
  return (
    <div className="bg-black min-h-screen">
      <Sidebar />

      <section>
        <div className="relative flex items-center justify-center mb-6">
          {/* Centered Heading */}
          <div className="bg-[#1E1E1E] mt-5 text-[#7B8BD9] border-2 border-[#5434CA] text-xl sm:text-4xl font-bold px-6 sm:px-8 py-3 rounded-2xl shadow text-center">
            PROJECTS TO EXPLORE
          </div>

          {/* Back Button (absolute right) */}
          <Link
            href="/"
            className="absolute right-0 flex items-center justify-center"
          >
            <Image
              src="/assets/back-btn.png"
              alt="Back button"
              width={64}
              height={64}
              className="w-12 h-12 sm:w-16 sm:h-16 rounded-full hover:bg-indigo-600 transition-colors"
            />
          </Link>
        </div>

        <div className="grid ml-12 p-8 gap-8">
          {projects.map((project) => (
            <div
              key={project.id}
              className="rounded-3xl bg-gradient-to-b from-[#164CD7] to-[#999999] p-1 shadow-lg"
            >
              {/* Logo + Buttons */}
              <div className="flex gap-6 items-center bg-[#140808] rounded-3xl p-8 w-full h-auto">
                {/* Left Section */}
                <div className="flex flex-col items-center">
                  <Image
                    src={project.logo}
                    alt={project.name}
                    width={120}
                    height={120}
                  />

                  <div className="flex flex-col bg-[#1E1E1E] rounded-3xl p-6 border border-white gap-4 mt-6">
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
                <div className="flex-1 bg-[#1E1E1E] text-white p-6 rounded-3xl border border-white">
                  <h3 className="text-2xl font-bold">{project.name}</h3>
                  <p className="text-lg font-semibold mt-2">Stage: {project.stage}</p>
                  <p className="text-lg font-semibold">ROLE OFFERED: {project.role}</p>
                  <p className="text-lg leading-relaxed whitespace-pre-line mt-4">
                    {project.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
