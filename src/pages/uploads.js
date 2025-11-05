 
import React from 'react';
import Sidebar from '../Components/Sidebar';
import Image from 'next/image';
import Link from 'next/link';

const uploadItems = [
  {
    href: 'uploadsAll/uploadVideos',
    img: '/assets/Untitleddesign(5)1.png',
    label: 'UPLOAD VIDEO',
    padding: 'px-18',
  },
  {
    href: 'uploadsAll/uploadEvents',
    img: '/assets/Untitleddesign(6)1.png',
    label: 'UPLOAD EVENTS',
    padding: 'px-13',
  },
  {
    href: 'uploadsAll/uploadPosts',
    img: '/assets/Untitleddesign(7)1.png',
    label: 'UPLOAD POSTS',
    padding: 'px-[70px]',
  },
];

const Uploads = () => {
  return (
    <div>
      {/* Sidebar */}
      <Sidebar />

      {/* Main content */}
      <div className="w-screen h-screen bg-black text-white">
        {/* Back Button */}
        <div className="w-[93%] flex flex-row justify-end ">
          <Link href="/">
            <Image
              src="/assets/back-btn.png"
              alt="Back-btn"
              width={24}
              height={24}
              className="border-2 mt-8 w-16 h-16 rounded-full hover:bg-indigo-600 transition-colors"
            />
          </Link>
        </div>

        {/* Upload Cards */}
        <div className="w-[80%] bg-blue-400 rounded-4xl flex flex-col gap-4 p-8 mt-2 ml-38">
          {uploadItems.map((item, index) => (
            <Link key={index} href={item.href} className="w-full">
              <div className="rounded-xl bg-white text-white font-bold flex justify-between items-center px-12 py-6 cursor-pointer hover:bg-gray-200 transition">
                <Image
                  src={item.img}
                  alt={item.label}
                  width={100}
                  height={100}
                  style={{ width: 'auto', height: 'auto' }}
                />
                <div className={`${item.padding} py-8 text-6xl bg-[#575FFE] rounded-2xl`}>
                  {item.label}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Uploads;



