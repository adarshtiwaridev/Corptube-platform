// import React from 'react';
// import Sidebar from '../../Components/Sidebar';
// import Image from 'next/image';
// import Link from 'next/link';
// import { useRouter } from 'next/router';

// const UploadVideos = () => {
//   const router = useRouter();
//   return (
//     <div>
//       <Sidebar/>

//       {/* {main Content} */}
//       <div className='w-full h-screen bg-black text-white'>
//          {/* Back Button */}
//         <div className="w-[93%] flex flex-row justify-end ">
//           <button onClick={() => router.back()}>
//             <Image
//               src="/assets/back-btn.png"
//               alt="Back-btn"
//               width={24}
//               height={24}
//               className="border-2 mt-8 w-16 h-16 rounded-full hover:bg-indigo-600 transition-colors"
//             />
//           </button>
//         </div>
//         <div className='w-[78%] ml-42  flex justify-center '>
//           <div className='border-5 border-[#575FFE] rounded-3xl bg-white text-black flex flex-col items-center gap-4 py-40 px-20 ring-4'>
//             <div className='circle w-60 h-60 rounded-full border-[#575FFE] border-4 flex items-center justify-center '>
//                 <Link href="/">
//                   <Image
//                     src="/assets/Untitled design (5) 1.png"
//                     alt="UPLOAD VIDEO"
//                     width={160}
//                     height={160}
//                     className="object-fill"
//                   />
//                 </Link>
//             </div>
//             <div className='p-2.5 px-9 bg-[#575FFE] text-3xl font-bold text-white rounded-full'>
//               <p>UPLOAD FILES</p>
//             </div>
//           </div>

//           <div className=' bg-[#575FFE] rounded-r-3xl text-black my-5 py-8 px-8 flex flex-col gap-5 '>
//               <div className='rounded-2xl bg-white text-5xl text-[#575FFE] font-extrabold flex flex-col items-center px-18 py-8'>
//                 <p>UPLOAD</p>
//                 <p>COVER</p>
//               </div>

//               <div className='rounded-2xl bg-white text-5xl text-[#575FFE] font-extrabold px-18 py-8'>CATEGORY
                
//                   <p className='uppercase text-center rounded-2xl bg-[#575FFE] text-white text-2xl'>select category</p>
                
//               </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default UploadVideos






//chatgpt 
import React, { useState } from 'react';
import Sidebar from '../../Components/Sidebar';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';

const UploadVideos = () => {
  const router = useRouter();

  // Category state
  const [categoryOpen, setCategoryOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("select category");
  const categories =  ["ENTREPRENEUR", "CREATOR", "BUISINESSPERSON"];

  const handleSelectCategory = (option) => {
    setSelectedCategory(option);
    setCategoryOpen(false);
  };

  return (
    <div>
      <Sidebar />

      {/* Main Content */}
      <div className='w-full h-screen bg-black text-white'>
        {/* Back Button */}
        <div className="w-[93%] flex flex-row justify-end">
          <button onClick={() => router.back()}>
            <Image
              src="/assets/back-btn.png"
              alt="Back-btn"
              width={24}
              height={24}
              className="border-2 mt-8 w-16 h-16 rounded-full hover:bg-indigo-600 transition-colors"
            />
          </button>
        </div>

        <div className='w-[78%] ml-42 flex justify-center'>
          <div className='border-5 border-[#575FFE] rounded-3xl bg-white  flex flex-col items-center justify-center gap-6 py-40 px-23 ring-2 ring-[#8d92eb]'>
            <div className='circle w-65 h-65 rounded-full border-[#575FFE] border-4 flex items-center justify-center'>
              <Link href="#">
                <Image
                  src="/assets/Untitled design (5) 1.png"
                  alt="UPLOAD VIDEO"
                  width={170}
                  height={170}
                  className="object-fill"
                />
              </Link>
            </div>
            <div>
              <input
                type="file"
                id="fileUpload"
                className="hidden"
                onChange={(e) => console.log(e.target.files)} 
              />

              <label
                htmlFor="fileUpload"
                className="p-2.5 px-9 bg-[#575FFE] text-3xl font-bold text-white rounded-full cursor-pointer"
              >
                UPLOAD FILES
              </label>
            </div>
          </div>

          <div className='bg-[#575FFE] rounded-r-3xl text-black my-5 py-14 px-8 flex flex-col justify-between gap-5 '>
            <div className='rounded-2xl bg-white text-5xl text-[#575FFE] font-extrabold flex flex-col items-center px-18 py-9.5'>
              <p>UPLOAD</p>
              <p>COVER</p>
            </div>

            {/* CATEGORY with Drop-Up */}
            <div className='rounded-2xl bg-white text-5xl text-[#575FFE] font-extrabold px-18 pt-8 pb-5 relative flex flex-col justify-end gap-3'>
              <p className='uppercase text-center'>CATEGORY</p>

              <div
                className='w-75 rounded-2xl bg-[#575FFE] text-white font-bold text-xl px-4 py-2 mt-3.5 flex items-center justify-between cursor-pointer'
                onClick={() => setCategoryOpen(!categoryOpen)}
              >
                <span className='uppercase'>{selectedCategory}</span>
                <Image
                  src="/assets/Polygon 36.png"
                  alt="arrow"
                  width={24}
                  height={24}
                  className={`transition-transform ${categoryOpen ? 'rotate-180' : ''}`}
                />
              </div>
              

              {/* Drop-Up Options */}
              {categoryOpen && (
                <div className='absolute  w-[68%] bg-[#ffffff] rounded-2xl  z-10  '>
                  {categories.map((option) => (
                    <div
                      key={option}
                      className='text-white text-xl font-bold px-6 py-1 rounded-lg cursor-pointer bg-[#575FFE]  m-2 hover:bg-[#3e46cd]  '
                      onClick={() => handleSelectCategory(option)}
                    >
                      {option}
                    </div>
                  ))}
                </div>
              )}
            </div>
            <div className='flex justify-center items-center  '>
              <p className= 'uppercase rounded-4xl bg-white text-5xl font-extrabold py-2 px-8 text-[#575FFE]'>publish</p>
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}

export default UploadVideos;

