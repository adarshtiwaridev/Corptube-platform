"use client";
 import Sidebar from "@/Components/Sidebar";
import Link from "next/link";
import Image from "next/image";

// Reusable skill card
function SkillCard({ skill }) {
  return (
    <div className="h-[50vh] mb-11 bg-gradient-to-r from-[#140808] to-[#837575]  ml-11  rounded-2xl shadow-md border-1 border-[#FFF2F2]  flex flex-col items-center p-4 relative">
      {/* Octagon Icon */}
 
        <Image src="/assets/landingphoto/Polygon17.png" alt="Octagon" width={230} height={230} />
    

     <div className="flex flex-col bg-black rounded-2xl p-4 border border-white mt-4 w-full items-center">
      {/* Title */}
      <div className="mt-4 text-center">
        <h3 className="font-bold text-white text-sm">
          {skill.title.toUpperCase()}
        </h3>
        <p className="text-neutral-200 text-xs mt-1">BY- {skill.author}</p>
      </div>

      {/* Buttons */}
      <div className="flex gap-6 mt-3">
        <Link
          href={`/skills/${skill.id}`}
          className="px-3 scale-125 border-1 border-[#FFF2F2] py-1  bg-[#2E25B5] text-xs font-semibold rounded-md  "
        >
          LEARN
        </Link>
        <button className="px-3 scale-125 border-1 border-[#FFF2F2] py-1 bg-[#2E25B5] text-xs font-semibold rounded-md  ">
          SAVE
        </button>
      </div>
     </div>


    </div>
  );
}

 

export default function SkillsToExplore() {
//   const [skills, setSkills] = useState([]);
  const skills= [
    {
      "id": 1,
      "title": "Prompt Engineering",
      "author": "Priyanshu N."
    },
    {
      "id": 2,
      "title": "Web Development",
      "author": "Pankaj Singh"
    },
    {
      "id": 3,
      "title": "Data Analysis",
      "author": "Ravi Kumar"
    },
       {
      "id": 4,
      "title": "Prompt Engineering",
      "author": "Priyanshu N."
    },
    {
      "id": 5,
      "title": "Web Development",
      "author": "Pankaj Singh"
    },
    {
      "id": 6,
      "title": "Data Analysis",
      "author": "Ravi Kumar"
    },
    
  ]
  

  // Fetch skills data from backend
//   useEffect(() => {
//     async function fetchSkills() {
//       try {
//         const res = await fetch("/api/skills"); // Your backend endpoint
//         const data = await res.json();
//         setSkills(data);
//       } catch (err) {
//         console.error("Failed to fetch skills", err);
//       }
//     }
//     fetchSkills();
//   }, []);

  return (
    <div className="bg-black">
           <Sidebar />

    <section>
     
      <div className="relative flex items-center justify-center mb-6">
  {/* Centered Heading */}
  <div className="bg-[#1E1E1E] mt-5 text-[#7B8BD9] border-2 border-[#5434CA]  text-xl sm:text-4xl font-bold px-6 sm:px-8 py-3 rounded-2xl shadow text-center">
    SKILLS TO EXPLORE
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

      <div className="grid  p-8 grid-cols-1 md:grid-cols-3 ">
     
        {skills.map((skill) => (
          <SkillCard key={skill.id} skill={skill} />
        ))}
      </div>
    </section>
    </div>

  );
}
