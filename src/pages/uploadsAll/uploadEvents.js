import React, { useState, useEffect } from "react";
import { toast } from "sonner";
import Sidebar from "../../Components/Sidebar";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

// --- Helper to safely parse JSON responses ---
const safeParseJson = async (response) => {
  try {
    const contentType = response.headers.get('content-type') || '';
    const isJson = contentType.includes('application/json');

    if (isJson) {
      try {
        const data = await response.json();
        if (!response.ok && (data == null || typeof data !== 'object')) {
          return { success: false, message: `${response.status} ${response.statusText}` };
        }
        return data;
      } catch (e) {
         console.log("e",e)
      }
    }

    const text = await response.text();
    const trimmed = (text || '').trim();

    if (!trimmed || trimmed === 'undefined' || trimmed === 'null') {
      if (!response.ok) {
        return { success: false, message: `${response.status} ${response.statusText}` };
      }
      return { success: false, message: 'Invalid server response' };
    }

    try {
      return JSON.parse(trimmed);
    } catch {
      if (!response.ok) {
        return { success: false, message: trimmed };
      }
      return { success: false, message: trimmed };
    }
  } catch (e) {
    return { success: false, message: e?.message || 'Failed to read server response' };
  }
};

// --- Helper to resolve current user robustly ---
const resolveCurrentUser = async () => {
  try {
    // 1) localStorage
    const raw = typeof window !== "undefined" ? localStorage.getItem("user") : null;
    if (raw) {
      return JSON.parse(raw);
    }

    // 2) try cookie-authenticated call
    try {
      const res = await fetch("/api/auth/me", { credentials: "include" });
      const data = await safeParseJson(res);
      if (data?.success && data?.data) {
        localStorage.setItem("user", JSON.stringify(data.data));
        return data.data;
      }
    } catch {}

    // 3) try bearer token if stored
    try {
      const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
      if (token) {
        const res = await fetch("/api/auth/me", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await safeParseJson(res);
        if (data?.success && data?.data) {
          localStorage.setItem("user", JSON.stringify(data.data));
          return data.data;
        }
      }
    } catch {}

    return null;
  } catch {
    return null;
  }
};

const UploadVideos = () => {
  const router = useRouter();

  // ------------------ State ------------------
  const [categoryOpen, setCategoryOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("Select Category");
  const [descOpen, setDescOpen] = useState(false);
  const [descClosing, setDescClosing] = useState(false);
  const [price, setPrice] = useState("");
  const [address, setAddress] = useState("");
  
  const [description, setDescription] = useState("");
  const [title, setTitle] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const categories = ["ENTREPRENEUR", "CREATOR", "BUSINESSPERSON"];
const [imageFile, setImageFile] = useState(null);
const [imagePreview, setImagePreview] = useState(null);
const [imageUrl, setImageUrl] = useState(null);
const [uploading, setUploading] = useState(false);

  // ------------------ Check user on mount ------------------
  useEffect(() => {
    (async () => {
      try {
        const user = await resolveCurrentUser();
        if (!user) {
          console.log("User not found");
          toast.error("User not found");
           router.push("/authpage");   
        }
      } catch {}
    })();
  }, []);

  // ------------------ Handlers ------------------
  const handleSelectCategory = (option) => {
    setSelectedCategory(option);
    setCategoryOpen(false);
  };

  const handleCloseDesc = () => {
    setDescClosing(true);
    setTimeout(() => {
      setDescClosing(false);
      setDescOpen(false);
    }, 220);
  };


  const handleImageChange = async (e) => {
  const file = e.target.files?.[0];
  if (!file) return;
console.log("file",file)
  setImageFile(file);
  setImagePreview(URL.createObjectURL(file)); // temporary preview
  toast.info("Uploading image...");

  try {
    setUploading(true);
    const formData = new FormData();
    formData.append("file", file);
    formData.append("folder", "images");

    const uploadRes = await fetch("/api/media/upload", {
      method: "POST",
      body: formData,
    });

    const uploadJson = await safeParseJson(uploadRes);
    console.log("uploadJson", uploadJson);

    if (!uploadJson?.data?.secure_url) {
      toast.error(uploadJson.message || "Image upload failed");
      return;
    }

    const uploadedUrl = uploadJson.data.secure_url;
    setImageUrl(uploadedUrl);
    setImagePreview(uploadedUrl); // update preview with final Cloudinary link
    toast.success("Image uploaded successfully!");
  } catch (err) {
    console.error(err);
    toast.error(err.message || "Image upload failed");
  } finally {
    setUploading(false);
  }
};

const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    setIsSubmitting(true);

    // --- Validate user ---
    const currentUser = await resolveCurrentUser();
    const userId = currentUser?.userId;

    if (!userId) {
      toast.error("User ID missing. Please login again.");
      router.push("/authpage");
      return;
    }

    // --- Validate fields ---
    if (!title) return toast.error("Title is required.");
    if (!description) return toast.error("Description is required.");
    if (!selectedCategory) return toast.error("Category is required.");
    if (!address) return toast.error("Address is required.");
    if (!price) return toast.error("Price is required.");
    if (!imageUrl) return toast.error("Please upload an image first.");

    // --- Build payload ---
    const payload = {
      userId,
      title,
      description,
      imageUrl,
      price: Number(price),
      address,
      userCategory:
        selectedCategory !== "Select Category" ? selectedCategory : undefined,
    };

    const resp = await fetch("/api/uploads/post", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const out = await safeParseJson(resp);
    if (!out.success) {
      toast.error(out.message || "Publish failed");
      return;
    }

    toast.success("Event published successfully!");
  } catch (e) {
    console.error(e);
    toast.error(e.message || "Something went wrong");
  } finally {
    setIsSubmitting(false);
  }
};


  // ------------------ JSX ------------------
  return (
    <div>
      <Sidebar />

      <div className="w-full min-h-screen bg-black text-white">
        {/* Back Button */}
        <div className="w-[93%] flex justify-end">
          <button onClick={() => router.back()}>
            <Image
              src="/assets/back-btn.png"
              alt="Back-btn"
              width={64}
              height={64}
              className="border-2 mt-8 w-16 h-16 rounded-full hover:bg-indigo-600 transition-colors"
            />
          </button>
        </div>

        <form
          onSubmit={handleSubmit}
          className="w-[78%] mx-auto flex justify-center gap-4"
        >
       {/* LEFT: Upload Cover */}
<div className="border-4 border-[#575FFE] rounded-3xl bg-white flex flex-col items-center justify-center gap-6 py-40 px-20 ring-2 ring-[#8d92eb]">
  <div className="circle w-64 h-64 rounded-full border-[#575FFE] border-4 flex items-center justify-center overflow-hidden">
    
      <Image
        src={imagePreview || "/assets/Untitleddesign(6)1.png"}
        alt="UPLOAD COVER"
        width={170}
        height={170}
        className="object-cover"
        priority
      />
  
  </div>

  <div>
    <input
      type="file"
      id="fileUpload"
      accept="image/*"
      className="hidden"
      onChange={handleImageChange} // ✅ trigger upload on selection
    />
    <label
      htmlFor="fileUpload"
      className={`p-2.5 px-9 bg-[#575FFE] text-3xl font-bold text-white rounded-full cursor-pointer hover:bg-[#3d43ca] ${
        uploading ? "opacity-50 cursor-not-allowed" : ""
      }`}
    >
      {uploading ? "UPLOADING..." : "UPLOAD COVER"}
    </label>
  </div>
</div>

           
          {/* RIGHT: Details */}
          <div className="relative overflow-hidden bg-[#575FFE] rounded-r-3xl text-black my-5 py-14 px-8 flex flex-col justify-between gap-5 w-full">
            {/* TITLE */}
            <div>
              <input
                type="text"
                name="title"
                className="w-full bg-white px-4 py-2 mb-2.5 rounded-xl border-[#575FFE] focus:outline-none focus:ring-2 focus:ring-[#575FFE] text-lg"
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            
            {/* DESCRIPTION */}
            <div
              className="rounded-2xl bg-white text-5xl text-[#575FFE] font-extrabold flex flex-col items-center px-18 py-16 cursor-pointer"
              onClick={() => setDescOpen(true)}
            >
              <p className="uppercase">Description</p>
            </div>

            {/* PRICE + ADDRESS + CATEGORY */}
            <div className="rounded-2xl bg-white text-[#575FFE] px-10 py-5 relative flex flex-col justify-end gap-3">
              {/* Price */}
              <div className="bg-[#575FFE] rounded-xl">
                <p className="uppercase text-center text-white text-2xl font-bold">
                  Enter Pricing
                </p>
                <div className="relative mt-2">
                  <span className="absolute left-6 top-4 text-[#575FFE] font-bold">
                    ₹
                  </span>
                  <input
                    type="number"
                    min="0"
                    name="price"
                    className="w-[90%] bg-white pl-10 pr-4 py-1 ml-4 mb-2 rounded-xl border-[#575FFE] focus:outline-none focus:ring-2 focus:ring-[#575FFE] text-lg"
                    placeholder="Amount"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                  />
                </div>
              </div>

              {/* Address */}
              <div className="bg-[#575FFE] rounded-xl mt-3">
                <p className="uppercase text-center text-white text-2xl font-bold">
                  Enter Address
                </p>
                <div className="relative mt-2">
                  <input
                    type="text"
                    name="address"
                    className="w-[90%] bg-white px-4 py-2 ml-4 mb-2.5 rounded-xl border-[#575FFE] focus:outline-none focus:ring-2 focus:ring-[#575FFE] text-lg"
                    placeholder="Address or location"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                  />
                </div>
              </div>

              {/* Category */}
              <div
                className="w-75 rounded-2xl bg-[#575FFE] text-white font-bold text-xl px-4 py-2 mt-3.5 flex items-center justify-between cursor-pointer"
                onClick={() => setCategoryOpen(!categoryOpen)}
              >
                <span className="uppercase">{selectedCategory}</span>
                <div className="mr-[-15px] border-2 border-[#575FFE] rounded-full bg-white">
                  <Image
                    src="/assets/Polygon 36.png"
                    alt="arrow"
                    width={24}
                    height={24}
                    className={`w-9 h-7 p-2 transition-transform ${
                      categoryOpen ? "rotate-180" : ""
                    }`}
                  />
                </div>
              </div>

              {categoryOpen && (
                <div className="absolute w-[68%] bg-[#ffffff] rounded-2xl z-10">
                  {categories.map((option) => (
                    <div
                      key={option}
                      className="text-white text-xl font-bold px-6 py-1 rounded-lg cursor-pointer bg-[#575FFE] m-2 hover:bg-[#3e46cd]"
                      onClick={() => handleSelectCategory(option)}
                    >
                      {option}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Publish Button */}
            <div className="flex justify-center items-center">
              <button
                type="submit"
                disabled={isSubmitting}
                className="uppercase rounded-4xl bg-white text-5xl font-extrabold py-2 px-8 text-[#575FFE] disabled:opacity-60 hover:bg-[#f0f1ff]"
              >
                {isSubmitting ? "Publishing..." : "Publish"}
              </button>
            </div>

            {/* DESCRIPTION Overlay */}
            {descOpen && (
              <div className="absolute inset-0 z-40 flex items-center justify-center">
                <div className="absolute inset-0 bg-black/20"></div>

                <div
                  className={`relative w-full h-full rounded-r-2xl p-6 bg-white shadow-lg transform transition-all ${
                    descClosing ? "animate-descClose" : "animate-descOpen"
                  }`}
                >
                  <button
                    aria-label="Close description"
                    onClick={handleCloseDesc}
                    type="button"
                    className="absolute top-4 right-4 p-2 rounded-full border-2 border-[#575FFE] bg-white text-[#575FFE] hover:bg-[#f3f4ff]"
                  >
                    ✕
                  </button>

                  <textarea
                    placeholder="Write description..."
                    className="w-full h-full p-6 text-xl border-2 border-[#8f8fed] rounded-2xl resize-none focus:outline-none"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </div>
              </div>
            )}
          </div>
        </form>
      </div>

      {/* Local animation keyframes */}
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
  );
};

export default UploadVideos;
