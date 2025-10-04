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
  const [descOpen, setDescOpen] = useState(false);
  const [descClosing, setDescClosing] = useState(false);
  const categories =  ["ENTREPRENEUR", "CREATOR", "BUISINESSPERSON"];

  const handleSelectCategory = (option) => {
    setSelectedCategory(option);
    setCategoryOpen(false);
  };

  const handleCloseDesc = () => {
    setDescClosing(true);
    setTimeout(() => {
      setDescClosing(false);
      setDescOpen(false);
    }, 220); // same duration as animation
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
          <div className='border-5 border-[#575FFE] rounded-3xl bg-white  flex flex-col items-center justify-center gap-6 py-40 px-20 ring-2 ring-[#8d92eb]'>
            <div className='circle w-65 h-65 rounded-full border-[#575FFE] border-4 flex items-center justify-center'>
              <Link href="#">
                <Image
                  src="/assets/Untitled design (6) 1.png"
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
                UPLOAD COVER
              </label>
            </div>
          </div>

          <div className=' relative overflow-hidden bg-[#575FFE] rounded-r-3xl text-black my-5 py-14 px-8 flex flex-col justify-between gap-5 '>

            {/* DESCRIPTION header (click only this to open editor) */}
            <div
              className="rounded-2xl bg-white text-5xl text-[#575FFE] font-extrabold flex flex-col items-center px-18 py-16 cursor-pointer"
              onClick={() => setDescOpen(true)}
            >
              <p className="uppercase cursor-pointer">
                description
              </p>
            </div>

            {/* CATEGORY with Drop-Up */}
            <div className='rounded-2xl bg-white  text-[#575FFE]  px-18 py-5 relative flex flex-col justify-end gap-1.5'>
              <div className='bg-[#575FFE] rounded-xl'>
                <p className='uppercase text-center text-white  rounded-xl text-2xl font-bold'>enter pricing</p>
                <div className="relative mt-2">
                  <span className="absolute left-6 top-4 -translate-y-1/2 text-[#575FFE] font-bold">Rs</span>
                  <input
                    type="number"
                    min='0'
                    className="w-[90%] bg-white pl-12 pr-4 py-0.5 ml-4 mb-2.5 rounded-xl  border-[#575FFE] focus:outline-none focus:ring-2 focus:ring-[#575FFE] text-lg"
                    placeholder="— — — —"
                  />
                </div>

              </div>

              <div
                className='w-75 rounded-2xl bg-[#575FFE] text-white font-bold text-xl px-4 py-0.5 mt-3.5 flex items-center justify-between cursor-pointer'
                onClick={() => setCategoryOpen(!categoryOpen)}
              >
                <span className='uppercase'>{selectedCategory}</span>
                <div className='mr-[-15px] border-2 border-[#575FFE] rounded-full bg-white overflow-visible '>
                  <Image
                  src="/assets/Polygon 36.png"
                  alt="arrow"
                  width={24}
                  height={24}
                  className={` w-9 h-7 p-2  transition-transform ${categoryOpen ? 'rotate-180' : ''}`}
                />
                </div>
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

            {/* DESCRIPTION overlay: fills the right panel (parent is relative + overflow-hidden) */}
            {descOpen && (
              <div className="absolute inset-0 z-40 flex items-center justify-center">
                {/* Optional subtle backdrop (non-clickable) */}
                <div className="absolute inset-0 bg-black/20"></div>

                {/* White full-size panel inside the purple container */}
                <div
                  className={`relative w-full h-full rounded-r-2xl p-6 bg-white shadow-lg transform transition-all
                  ${descClosing ? 'animate-descClose' : 'animate-descOpen'}`}
                >
                  {/* Close button */}
                  <button
                    aria-label="Close description"
                    onClick={handleCloseDesc}
                    className="absolute top-4 right-4 p-2 rounded-full border-2 border-[#575FFE] bg-white text-[#575FFE] hover:bg-[#f3f4ff] cursor-pointer"
                    
                  >
                    ✕
                  </button>

                  {/* Textarea fills the panel — clicking/typing here will NOT close the editor */}
                  <textarea
                    placeholder="Description...."
                    className="w-full h-full p-6 text-xl border-2 border-[#8f8fed] rounded-2xl resize-none focus:outline-none "
                    
                  />
                </div>
              </div>
            )}


          </div>
        </div>
      </div>
        {/* local animation keyframes */}
        <style jsx>{`
          @keyframes descOpen {
            from {
              transform: scale(0.98);
              opacity: 0;
            }
            to {
              transform: scale(1);
              opacity: 1;
            }
          }

          @keyframes descClose {
            from {
              transform: scale(1);
              opacity: 1;
            }
            to {
              transform: scale(0.98);
              opacity: 0;
            }
          }

          .animate-descOpen {
            animation: descOpen 220ms ease-out forwards;
          }

          .animate-descClose {
            animation: descClose 220ms ease-in forwards;
          }
        `}</style>
    </div>
  )
}

export default UploadVideos;
