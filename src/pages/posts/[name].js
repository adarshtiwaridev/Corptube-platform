"use client";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useRouter } from "next/router";
import Sidebar from "@/Components/Sidebar";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { toggleLike, addComment, incrementView, incrementSave } from "@/redux/slices/postInteractionSlice";

import { useDispatch } from "react-redux";
export default function PostDetails() {
  const router = useRouter();
  const { name } = router.query;
  const [activeIndex, setActiveIndex] = useState(null);
  const [commentText, setCommentText] = useState("");
  const [ischatopen, setIschatopen] = useState(true);
  const icons = [
    { src: "/assets/landingphoto/growth.png", alt: "Growth" },
    { src: "/assets/landingphoto/chat.png", alt: "Chat" },
    { src: "/assets/landingphoto/book.png", alt: "Save" },
  ];
 

  const posts = useSelector((state) => state.posts.items);
  const getVideo = useSelector((state) => state.getvideoslice.items);
  const getUploadPost = useSelector((state) => state.ticketraiseslice.items);


  console.log("posts",posts);
  console.log("getVideo",getVideo);
  console.log("getUploadPost",getUploadPost);




  const dispatch = useDispatch();
    const postInteraction = useSelector((state) => state.posts.items);
    console.log("postInteraction",postInteraction);
    const { user } = useSelector((state) => state.auth);
    console.log("user",user);
  const { likes, comments, views ,saves} = useSelector((state) => state.postInteraction);
  console.log("likes",likes);
  console.log("comments",comments);
  console.log("views",views);
  console.log("saves",saves);
  // Combine all in one array
 const allPosts = [...posts, ...getVideo, ...getUploadPost];
  // Find the current post based on id in URL
  const currentIndex = allPosts.findIndex((post) => post._id === name);
  const filteredPosts = currentIndex !== -1 ? [allPosts[currentIndex]] : [];
  
  const post = filteredPosts[0];
  const [localPost, setLocalPost] = useState(post);
  // Function to navigate to next or previous post
  const handleNavigate = (direction) => {
    if (allPosts.length === 0) return;

    let newIndex;
    if (direction === "next") {
      newIndex = (currentIndex + 1) % allPosts.length; // Loop to start if end
    } else {
      newIndex =
        (currentIndex - 1 + allPosts.length) % allPosts.length; // Loop to end if start
    }

    const nextPostId = allPosts[newIndex]?._id;
    if (nextPostId) {
      router.push(`/posts/${nextPostId}`);
    }
  };


 useEffect(() => {
  if (post) setLocalPost(post);
}, [post]);
 console.log("post in postdetails",post);

 useEffect(() => {
  if (localPost?._id && user?.id) {
    // Dispatch only once per user & post
    dispatch(incrementView({ userId: user.id, postId: localPost._id }))
      .unwrap()
      .then(() => {
        toast.success("View counted!");
      })
      .catch((err) => {
        console.error("Error incrementing view:", err);
      });
  }
}, [localPost?._id, user?.id,  dispatch]);

    useEffect(() => {
    if (post?._id) dispatch(incrementView({userId: user?.id, postId: post._id}));
  }, [post?._id, user?.id, dispatch]);

    // Safety fallback
  if (!filteredPosts.length) {
    return (
      <div className="flex justify-center items-center min-h-screen text-white bg-black">
        <p>Loading post...</p>
      </div>
    );
  }




const handleClick = async (index, alt) => {
  setActiveIndex(index);
  if (!user) return toast.error("Please login to like the post!");
  if (!localPost?._id) return;

  if (alt === "Growth") {
    const isLiked = localPost.likedBy?.includes(user.id);

    // ✅ Optimistic local update
    const updatedPost = {
      ...localPost,
      likedBy: isLiked
        ? localPost.likedBy.filter((id) => id !== user.id)
        : [...(localPost.likedBy || []), user.id],
      totalLikes: isLiked
        ? Math.max((localPost.totalLikes || 0) - 1, 0)
        : (localPost.totalLikes || 0) + 1,
    };

    setLocalPost(updatedPost);

    // ✅ Dispatch backend sync
    dispatch(toggleLike({ userId: user.id, postId: localPost._id }));

    toast.success(isLiked ? "You unliked the post!" : "You liked the post!");
  } else if (alt === "Chat") {
     setIschatopen(!ischatopen);
  }  
  else if (alt === "Save") {
    const isSaved = localPost.savedBy?.includes(user.id);

    // ✅ Optimistic local update
    const updatedPost = {
      ...localPost,
      savedBy: isSaved
        ? localPost.savedBy.filter((id) => id !== user.id)
        : [...(localPost.savedBy || []), user.id],
      totalSaves: isSaved
        ? Math.max((localPost.totalSaves || 0) - 1, 0)
        : (localPost.totalSaves || 0) + 1,
    };

    setLocalPost(updatedPost);

    // ✅ Dispatch backend sync
    dispatch(incrementSave({ userId: user.id, postId: localPost._id }));  
 

    toast.success(isSaved ? "You unsaved the post!" : "You saved the post!");
  }
};

 
const handleAddComment = () => {
  if (!user) {
    toast.error("Please login to comment!");
    return;
  }

  if (!commentText.trim()) {
    toast.error("Comment cannot be empty!");
    return;
  }

  dispatch(addComment({ userId: user.id, postId: localPost._id, text: commentText.trim() }));

  setLocalPost((prev) => ({
    ...prev,
    comments: [
      ...(prev.comments || []),
      {
        text: commentText.trim(),
        user: { fullName: user.fullName },
        createdAt: new Date().toISOString(),
      },
    ],
  }));

  toast.success("Comment added!");
  setCommentText("");
};

const handleRouting = (label) => {
  if (label === "VIEW") {
    router.push(`/dashboard/${user.id}`);
  } else if (label === "PORTFOLIO") {
    router.push(`/portfolio/${name}`);
  } else if (label === "INTERACT") {
    router.push(`/interact/${name}`);
  }
};



  return (
    <div>
   <Sidebar/>
        
    <div className="flex flex-col md:flex-row justify-center items-center min-h-screen bg-[#0f0f0f] text-white  md:p-10">
      

      {/* LEFT SIDE */}
      <div className="relative z-40 flex-1 rounded-3xl overflow-hidden  max-w-md md:max-w-lg mb-6 md:mb-0">
<div className="relative w-full h-full">
  {filteredPosts[0]?.videoUrl ? (
    <video
      src={filteredPosts[0].videoUrl}
      width={600}
      height={800}
      controls
      autoPlay
      loop
      muted
      playsInline
      className="object-cover w-full h-full opacity-90 rounded-3xl"
    />
  ) : (
    <Image
      src={
        filteredPosts[0]?.thumbnailUrl ||
        filteredPosts[0]?.imageUrl ||
        "/assets/placeholder.jpg"
      }
      alt="Post Cover"
      width={600}
      height={800}
      className="object-cover w-full h-full opacity-90 rounded-3xl"
      priority
    />
  )}
</div>

        <div className="absolute inset-0 flex flex-col justify-end items-center text-center p-6  ">
          <h3 className="text-xs sm:text-sm font-semibold mb-2 tracking-wide">
            OPEN RECRUITMENT DPS CLASS
          </h3>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-wide">
            Coming <span className="text-[#1e90ff]">Soon</span>
          </h1>
          <p className="text-[10px] sm:text-xs mt-3 opacity-80">@designprofessionalofsmartphone</p>
        </div>

        {/* Left/Right Arrows */}
        <button
          aria-label="Previous"
          className="absolute left-3 top-1/2 -translate-y-1/2 bg-[#1e90ff] p-3 rounded-full hover:scale-110 transition-transform"
        >
          <ArrowLeft className="text-white" size={20} onClick={() => handleNavigate("prev")}/>
        </button>
        <button
          aria-label="Next"
          className="absolute right-3 top-1/2 -translate-y-1/2 bg-[#1e90ff] p-3 rounded-full hover:scale-110 transition-transform"
        >
          <ArrowRight className="text-white" size={20} onClick={() => handleNavigate("next")}/>
        </button>
      </div>

      {/* RIGHT SIDE */}
      <div className="relative -ml-3 z-20  flex-1 bg-[#575FFE] rounded-3xl p-6 sm:p-8 shadow-xl max-w-md text-white">
        {/* Top Right Back Button */}
        <Link
          href="/"
          aria-label="Go Back"
          className="absolute -top-12 -right-12   rounded-full  transition"
        >
          
              <Image 
                src="/assets/back-btn.png" 
                alt="Back-btn"
                width={24}                 
                height={24}                
                className="w-16 h-16 rounded-full hover:bg-indigo-600 transition-colors"  
              />
         
        </Link>

        {/* Icons Row */}
 <div className="flex justify-center gap-6 mb-6 mt-10">
  {icons.map((icon, index) => {
    const isGrowth = icon.alt === "Growth";
    const isLiked = localPost?.likedBy?.includes(user?.id);

    // Growth icon active if liked
    // Other icons active if selected
    const isActive = isGrowth ? isLiked : activeIndex === index;

    return (
      <div
        key={index}
        onClick={() => handleClick(index, icon.alt)}
        className={`p-3 rounded-full shadow hover:scale-105 transition-transform cursor-pointer ${
          (isActive &&icon.alt === "Growth") ||
           ( !ischatopen && icon.alt === "Chat" ) ||
            (localPost?.savedBy?.includes(user?.id) &&icon.alt === "Save") ? "bg-[#0493FB]" : "bg-white"
        }`}
      >
        <Image
          src={icon.src}
          alt={icon.alt}
          width={30}
          height={30}
          className={`transition ${
            isActive ? "brightness-200 invert" : ""
          }`}
        />
      </div>
    );
  })}
</div>



       <div className="text-center bg-white text-[#575FFE] rounded-xl py-3 mb-4">
         <p>
  👍 Likes: {localPost?.totalLikes || 0} | 💬 Comments:{" "}
  {localPost?.comments?.length || 0} | 👁 Views:{" "}
  {localPost?.totalViews || 0}
</p>

          </div>
{ischatopen ? (
  <div className="w-full">
    {/* 🧑 Profile Card */}
    <div className="bg-[#0493FB] rounded-2xl p-4 shadow-md mb-6 flex flex-col sm:flex-row items-center gap-4">
      <Image
        src={filteredPosts[0]?.user?.profilePhoto}
        alt="Profile"
        width={80}
        height={80}
        className="rounded-full object-cover border-2 border-white"
      />
      <div className="flex-1 text-center sm:text-left text-white">
        <h2 className="text-lg font-bold">{filteredPosts[0]?.user?.fullName}</h2>
        <h2 className="text-sm opacity-90">{filteredPosts[0]?.user?.userId}</h2>
        <p className="text-sm opacity-80">{filteredPosts[0]?.user?.accountType}</p>
      </div>
      <span className="bg-white text-[#0493FB] text-xs font-bold px-3 py-1 rounded-full">
        {filteredPosts[0]?.userCategory}
      </span>
    </div>

    {/* ⚙️ Action Buttons */}
    <div className="flex bg-white p-5 rounded-2xl flex-col gap-3 mb-6">
      {["VIEW", "PORTFOLIO", "INTERACT"].map((label) => (
        <button
          key={label}
          onClick={() => handleRouting(label)}
          className="bg-[#575FFE] hover:bg-[#4a4ee0] text-white font-semibold py-3 rounded-2xl shadow-md transition active:scale-95"
        >
          {label}
        </button>
      ))}
    </div>

 
  </div>
) : (
  <div>
      {/* 💬 Comments Section */}
    <div className="bg-white rounded-2xl shadow-md p-5">
      <h3 className="text-[#0493FB] font-semibold text-lg mb-3">
        Comments ({localPost?.comments?.length || 0})
      </h3>

      {/* Existing Comments */}
      <div className="max-h-60 overflow-y-auto space-y-3 mb-4">
        {localPost?.comments?.length > 0 ? (
          localPost.comments.map((c, idx) => (
            <div
              key={idx}
              className="bg-gray-100 p-3 rounded-xl shadow-sm flex flex-col sm:flex-row sm:items-center justify-between"
            >
              <p className="text-gray-800 text-sm">
                <span className="font-bold">{c.user?.fullName || "User"}:</span>{" "}
                {c.text}
              </p>
              <span className="text-xs text-gray-500 mt-1 sm:mt-0">
                {new Date(c.createdAt).toLocaleString()}
              </span>
            </div>
          ))
        ) : (
          <p className="text-gray-500 text-sm">No comments yet. Be the first!</p>
        )}
      </div>

      {/* ✍️ Add Comment */}
      <div className="flex gap-2">
        <input
          type="text"
          placeholder="Write a comment..."
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
          className="flex-1 text-black border border-gray-300 rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#0493FB]"
        />
        <button
          onClick={handleAddComment}
          className="bg-[#0493FB] hover:bg-[#037adb] text-white font-semibold px-5 py-2 rounded-xl shadow-md transition active:scale-95"
        >
          Send
        </button>
      </div>
    </div>
  </div>
)}

      </div>
    </div>

    </div>

  );
}
