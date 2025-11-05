"use client";
import React from "react"; 

import Image from "next/image";
import Link from "next/link";
import { useSelector } from "react-redux";
 
const PostsToExplore = () => {

  const posts = useSelector((state) => state.posts.items);
  const getVideo = useSelector((state) => state.getvideoslice.items);
  const getUploadPost = useSelector((state) => state.ticketraiseslice.items);
  
  console.log("posts",posts);
  console.log("getVideo",getVideo);
  console.log("getUploadPost",getUploadPost);

  // Combine all in one array
const allPosts = [...posts, ...getVideo, ...getUploadPost];

// Optional: Sort them by createdAt (latest first)
const sortedAllPosts = allPosts.sort(
  (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
);

console.log("merged posts", sortedAllPosts);

  return (
   
  <section className="mt-10 px-4 sm:px-6 md:px-10">
  <h2 className="text-3xl sm:text-4xl md:text-5xl text-heading mb-6 text-center sm:text-left">
    POSTS TO EXPLORE
  </h2>

  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-1 sm:gap-6">
    {sortedAllPosts.map((post) => (
      <Link
        href={`posts/${post._id}`}
        key={post._id}
        className="rounded-[24px] overflow-hidden  hover:scale-105 transition-transform duration-300 shadow-lg"
      >
        <img
          src={post.imageUrl || post.thumbnailUrl}
          alt={post.imageUrl}
          width={322}
          height={450}
          className="object-cover w-[164px] h-[229px] sm:w-[322px] sm:h-[450px] rounded-[24px] mx-auto"
        />
       </Link>
    ))}
  </div>
</section>
  );
};

export default PostsToExplore;
