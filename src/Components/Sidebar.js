"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Sidebar() {
  const [userImage, setUserImage] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch("/api/auth/me", {
          method: "GET",
          credentials: "include",
        });

        if (res.ok) {
          const user = await res.json();
          console.log("User data:", user);
          setUserImage(user?.profilePhoto || null);
        } else {
          console.warn("Failed to fetch user data");
        }
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };

    fetchUser();
  }, []);

  return (
    <div className="main h-full w-full">
      {/* Sidebar for large screens */}
      <section className="hidden sm:flex flex-col justify-between items-center fixed top-0 left-0 h-screen bg-gray-900 border-r-2 border-gray-500 w-[4.5vw] min-w-[65px]">
        {/* Logo */}
        <div className="flex justify-center items-center border-b-2 border-gray-500 py-3 w-full">
          <Link href="/" className="cursor-pointer">
            <Image
              src="/assets/Ellipse45.png"
              alt="Company Logo"
              width={50}
              height={50}
              className="w-[3vw] min-w-[45px]"
            />
          </Link>
        </div>

        {/* Middle Icons */}
        <div className="flex flex-col items-center gap-7 py-6 border-b-2 border-gray-500 w-full">
          <Image src="/assets/27.png" alt="Icon 1" width={40} height={40} className="cursor-pointer" />
          <Image src="/assets/34.png" alt="Icon 2" width={40} height={40} className="cursor-pointer" />
          <Image src="/assets/74.png" alt="Icon 3" width={40} height={40} className="cursor-pointer" />
          <Image src="/assets/44.png" alt="Icon 4" width={40} height={40} className="cursor-pointer" />
          <Link href="/uploads">
            <Image
              src="/assets/54.png"
              alt="Uploads"
              width={40}
              height={40}
              className="cursor-pointer"
            />
          </Link>
          <Image src="/assets/83.png" alt="Extra Icon" width={40} height={40} className="cursor-pointer" />
        </div>

        {/* Settings */}
        <div className="flex justify-center items-center py-6 w-full">
          <Link href="/Settings" className="cursor-pointer">
            <Image
              src="/assets/65.png"
              alt="Settings"
              width={40}
              height={40}
              className="cursor-pointer"
            />
          </Link>
        </div>
      </section>

      {/* Bottom bar for mobile/tablet */}
      <section className="flex sm:hidden fixed bottom-0 left-0 w-full bg-gray-900 border-t-2 border-gray-500 justify-around items-center py-2 z-50">
        <Link href="/" className="cursor-pointer">
          <Image
            src="/assets/Ellipse45.png"
            alt="Logo"
            width={38}
            height={38}
            className="cursor-pointer"
          />
        </Link>

           <Link href="/"><Image src="/assets/27.png" alt="Icon 1" width={35} height={35} className="cursor-pointer" /></Link>
        <Image src="/assets/34.png" alt="Icon 2" width={35} height={35} className="cursor-pointer" />
        <Image src="/assets/74.png" alt="Icon 3" width={35} height={35} className="cursor-pointer" />
        <Link href="/uploads">
          <Image
            src="/assets/54.png"
            alt="Uploads"
            width={35}
            height={35}
            className="cursor-pointer"
          />
        </Link>
        <Link href="/Settings" className="cursor-pointer">
          <Image
            src="/assets/65.png"
            alt="Settings"
            width={35}
            height={35}
            className="cursor-pointer"
          />
        </Link>
      </section>
    </div>
  );
}
