"use client";
 
import Link from "next/link";
import Image from "next/image";

// Reusable skill card
function SkillCard({ skill }) {
  return (
    <div className="h-[50vh] bg-gradient-to-r from-[#140808] to-[#837575]  ml-11  rounded-2xl shadow-md border-1 border-[#FFF2F2]  flex flex-col items-center p-4 relative">
      {/* Octagon Icon */}
 
        <Image src="/assets/landingphoto/Polygon 17.png" alt="Octagon" width={230} height={230} />
    

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

// Special "See More" card
function SeeMoreCard() {
  return (
    <div className="bg-gradient-to-r from-[#140808] to-[#837575] border-1 border-[#FFF2F2] ml-10 rounded-2xl shadow-md w-74 flex flex-col items-center justify-center relative">
      <div className="w-20 h-20 flex items-center justify-center bg-black rounded-full border border-neutral-700">
        <span className="text-4xl font-bold">›</span>
      </div>
      <p className="font-bold text-lg mt-2">SEE MORE</p>
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
    <section className="mt-16">
      <h2 className="text-5xl  text-heading   mb-6">
        SKILLS TO EXPLORE
      </h2>

      <div className="grid  grid-cols-1 md:grid-cols-4 g">
     
        {skills.map((skill) => (
          <SkillCard key={skill.id} skill={skill} />
        ))}
        <SeeMoreCard />
      </div>
    </section>
  );
}
