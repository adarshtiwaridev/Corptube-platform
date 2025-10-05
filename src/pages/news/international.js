"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Sidebar from "@/Components/Sidebar";

export default function InternationalNews() {
  const [news, setNews] = useState([]);
  const API_KEY = process.env.NEXT_PUBLIC_NEWS_API_KEY;

  useEffect(() => {
    if (!API_KEY) {
      console.error("❌ Missing API key in .env file");
      return;
    }

    fetch(
      `https://newsdata.io/api/1/news?category=world&language=en&apikey=${API_KEY}&q=international`
    )
      .then((res) => res.json())
      .then((data) => setNews(data.results || []))
      .catch((err) => console.error(err));
  }, [API_KEY]);

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-black">
      {/* Sidebar (Hidden on Mobile) */}
      <div className="hidden md:block">
        <Sidebar />
      </div>

      <main className="flex-1 ml-28 mr-7 mt-6 mb-7 w-full">
        <div className="min-h-screen rounded-2xl bg-[#1e90ff] p-4 sm:p-6 md:p-8 text-black">
          {/* Header */}
<div className="relative flex items-center justify-center mb-6">
  {/* Centered Heading */}
  <div className="bg-[#e0e0e0] text-black text-xl sm:text-4xl font-bold px-6 sm:px-8 py-3 rounded-2xl shadow text-center">
    INTERNATIONAL NEWS
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


          {/* News List */}
          <div className="flex flex-col gap-4 w-full max-w-4xl mx-auto">
            {news.length > 0 ? (
              news.slice(0, 6).map((item, index) => (
                <div
                  key={index}
                  className="bg-[#f2f2f2] rounded-2xl p-4 sm:p-5 shadow-md transition hover:shadow-xl hover:scale-[1.01] duration-200"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-3 h-3 bg-red-600 rounded-full"></div>
                    <span className="font-bold text-base sm:text-lg">
                      {item.source_id?.toUpperCase() || "NEWS CHANNEL"}
                    </span>
                  </div>
                  <p className="text-sm sm:text-base leading-snug sm:leading-relaxed">
                    {item.description ||
                      item.title ||
                      "No description available for this news article."}
                  </p>
                </div>
              ))
            ) : (
              <p className="text-white text-center text-lg sm:text-xl mt-8 animate-pulse">
                Loading news...
              </p>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
