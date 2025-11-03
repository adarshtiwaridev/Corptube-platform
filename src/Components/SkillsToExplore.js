"use client";

import Link from "next/link";
import Image from "next/image";

// Reusable Skill Card
function SkillCard({ skill }) {
  return (
    <div className="bg-gradient-to-r from-[#140808] to-[#837575] rounded-2xl shadow-lg border border-[#FFF2F2]/40 flex flex-col items-center p-4 sm:p-6 md:p-4 transition-transform duration-300 hover:scale-105 hover:shadow-2xl w-full max-w-sm">
      {/* Icon */}
      <div className="flex justify-center">
        <Image
          src="/assets/landingphoto/Polygon17.png"
          alt="Octagon"
          width={180}
          height={180}
          className="object-contain"
        />
      </div>

      {/* Skill Details */}
      <div className="flex flex-col bg-black rounded-2xl p-5 border border-white/40 mt-5 w-full items-center">
        <h3 className="font-bold text-white text-base sm:text-lg md:text-xl text-center">
          {skill.title.toUpperCase()}
        </h3>
        <p className="text-neutral-300 text-xs sm:text-sm mt-1">
          BY {skill.author}
        </p>

     <div className="flex flex-wrap justify-center items-center gap-3 sm:gap-4 mt-5 w-full px-2 sm:px-6">
  <Link
    href={`/skills/${skill.id}`}
    className="flex-1 sm:flex-none min-w-[120px] text-center px-5 sm:px-6 py-2.5 bg-[#2E25B5] border border-[#FFF2F2]/60 text-white text-sm sm:text-base font-semibold rounded-md hover:bg-[#3a32d9] hover:shadow-[0_0_10px_rgba(46,37,181,0.5)] transition-all duration-300"
  >
    LEARN
  </Link>

  <button className="flex-1 sm:flex-none min-w-[120px] text-center px-5 sm:px-6 py-2.5 bg-[#2E25B5] border border-[#FFF2F2]/60 text-white text-sm sm:text-base font-semibold rounded-md hover:bg-[#3a32d9] hover:shadow-[0_0_10px_rgba(46,37,181,0.5)] transition-all duration-300">
    SAVE
  </button>
</div>

      </div>
    </div>
  );
}

// "See More" Card
function SeeMoreCard() {
  return (
    <Link
      href="/skills"
      className="bg-gradient-to-r from-[#140808] to-[#837575] border border-[#FFF2F2]/40 cursor-pointer rounded-2xl shadow-lg flex flex-col items-center justify-center p-12 sm:p-14 md:p-16 transition-transform duration-300 hover:scale-105 hover:shadow-2xl w-full max-w-sm"
    >
      <div className="w-20 h-20 flex items-center justify-center bg-black rounded-full border border-neutral-700">
        <span className="text-5xl font-bold text-white">›</span>
      </div>
      <p className="font-bold text-xl text-white mt-4">SEE MORE</p>
    </Link>
  );
}

export default function SkillsToExplore() {
  const skills = [
    { id: 1, title: "Prompt Engineering", author: "Priyanshu N." },
    { id: 2, title: "Web Development", author: "Pankaj Singh" },
    { id: 3, title: "Data Analysis", author: "Ravi Kumar" },
    { id: 4, title: "Cloud Computing", author: "Ananya Gupta" },
    { id: 5, title: "AI & ML", author: "Karan Verma" },
    { id: 6, title: "UI/UX Design", author: "Sneha Sharma" },
    { id: 7, title: "Cyber Security", author: "Arjun Patel" },
    { id: 8, title: "Blockchain Basics", author: "Riya Das" },
    { id: 9, title: "Mobile App Dev", author: "Neha Singh" },
    { id: 10, title: "DevOps Essentials", author: "Manish Kumar" },
  ];

  return (
    <section className="mt-20 px-6 sm:px-8 md:px-12 lg:px-16 xl:px-24">
      <h2 className="text-3xl sm:text-4xl md:text-5xl text-heading font-semibold mb-14  tracking-wide">
        SKILLS TO EXPLORE
      </h2>

      <div
        className="
          grid gap-7 sm:gap-8 md:gap-10 lg:gap-12 xl:gap-14
          grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4
          place-items-center
        "
      >
        {skills.map((skill) => (
          <SkillCard key={skill.id} skill={skill} />
        ))}
        <SeeMoreCard />
      </div>
    </section>
  );
}
