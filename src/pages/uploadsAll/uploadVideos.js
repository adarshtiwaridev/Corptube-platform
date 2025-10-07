// ✅ Enhanced & Cleaned UploadVideos.jsx
import React, { useState } from 'react';
import { toast } from 'sonner';
import Sidebar from '../../Components/Sidebar';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';

// Safe JSON parser utility
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
      } catch {}
    }
    const text = await response.text();
    const trimmed = (text || '').trim();
    if (!trimmed || trimmed === 'undefined' || trimmed === 'null') {
      if (!response.ok) return { success: false, message: `${response.status} ${response.statusText}` };
      return { success: false, message: 'Invalid server response' };
    }
    try { return JSON.parse(trimmed); } catch { return { success: false, message: trimmed }; }
  } catch (e) {
    return { success: false, message: e?.message || 'Failed to read server response' };
  }
};

const UploadVideos = () => {
  const router = useRouter();

  // 🧠 Category state
  const [categoryOpen, setCategoryOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('select category');
  const categories = ['ENTREPRENEUR', 'CREATOR', 'BUISINESSPERSON'];

  // 📂 File states
  const [videoFile, setVideoFile] = useState(null);
  const [thumbFile, setThumbFile] = useState(null);

  // 🧩 Form state
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  // Try to refresh user from /api/auth/me to populate localStorage if missing
  React.useEffect(() => {
    const ensureUser = async () => {
      try {
        const raw = typeof window !== 'undefined' ? localStorage.getItem('user') : null;
        if (!raw) {
          const res = await fetch('/api/auth/me', { credentials: 'include' });
          const data = await safeParseJson(res);
          if (data?.success && data?.data) {
            localStorage.setItem('user', JSON.stringify(data.data));
          }
        }
      } catch {}
    };
    ensureUser();
  }, []);

  // Handle category selection
  const handleSelectCategory = (option) => {
    setSelectedCategory(option);
    setCategoryOpen(false);
  };

  // Handle file upload to backend
  const uploadFile = async (file, folder) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('folder', folder);

    const res = await fetch('/api/media/upload', { method: 'POST', body: formData });
    const json = await safeParseJson(res);
    if (!json.success) {
      toast.error(json.message || 'Upload failed');
      return null;
    }
    return json.data?.secure_url;
  };

  // Handle Publish button click
  const handlePublish = async () => {
    try {
      setIsSubmitting(true);
      setError(null);

                    let storedUser = typeof window !== 'undefined' ? localStorage.getItem('user') : null;
                    if (!storedUser) {
                      try {
                        const res = await fetch('/api/auth/me', { credentials: 'include' });
                        const data = await safeParseJson(res);
                        if (data?.success && data?.data) {
                          localStorage.setItem('user', JSON.stringify(data.data));
                          storedUser = JSON.stringify(data.data);
                        }
                      } catch {}
                    }
                    const parsedUser = storedUser ? JSON.parse(storedUser) : null;
      const userId = parsedUser?.userId;

      if (!userId) return toast.error('User ID missing. Please login again.');
      if (!videoFile) return toast.error('Please select a video');
      if (!thumbFile) return toast.error('Please select a cover image');

      // Upload files
      const [videoUrl, thumbnailUrl] = await Promise.all([
        uploadFile(videoFile, 'videos'),
        uploadFile(thumbFile, 'thumbnails'),
      ]);

      if (!videoUrl || !thumbnailUrl) return;

      // Payload for DB
      const payload = {
        userId,
        userCategory: selectedCategory !== 'select category' ? selectedCategory : undefined,
        videoUrl,
        thumbnailUrl,
      };

      // Upload post info
      const resp = await fetch('/api/uploads/video', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const out = await safeParseJson(resp);
      if (!out.success) return toast.error(out.message || 'Publish failed');

      toast.success('Video published successfully 🎉');
      router.push('/uploadsAll/uploadVideos');
    } catch (e) {
      toast.error(e?.message || 'Something went wrong');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <Sidebar />

      {/* 🧭 Main Content */}
      <div className="w-full h-screen bg-black text-white">
        {/* 🔙 Back Button */}
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

        <div className="w-[78%] ml-42 flex justify-center">
          {/* 🧩 LEFT PANEL */}
          <div className="border-5 border-[#575FFE] rounded-3xl bg-white flex flex-col items-center justify-center gap-6 py-40 px-23 ring-2 ring-[#8d92eb]">
            <div className="circle w-65 h-65 rounded-full border-[#575FFE] border-4 flex items-center justify-center">
              <Link href="#">
                <Image
                  src="/assets/Untitleddesign(5)1.png"
                  alt="UPLOAD VIDEO"
                  width={170}
                  height={170}
                  className="object-fill"
                />
              </Link>
            </div>

            {/* Upload Buttons */}
            <div>
              <input
                type="file"
                id="videoUpload"
                accept="video/*"
                className="hidden"
                onChange={(e) => setVideoFile(e.target.files?.[0] || null)}
              />
              <input
                type="file"
                id="thumbUpload"
                accept="image/*"
                className="hidden"
                onChange={(e) => setThumbFile(e.target.files?.[0] || null)}
              />

              <div className="flex gap-3 justify-center">
                <label
                  htmlFor="videoUpload"
                  className="p-2.5 px-9 bg-[#575FFE] text-3xl font-bold text-white rounded-full cursor-pointer"
                >
                  UPLOAD VIDEO
                </label>
                <label
                  htmlFor="thumbUpload"
                  className="p-2.5 px-9 bg-[#575FFE] text-3xl font-bold text-white rounded-full cursor-pointer"
                >
                  UPLOAD COVER
                </label>
              </div>
            </div>
          </div>

          {/* 🧠 RIGHT PANEL */}
          <div className="bg-[#575FFE] rounded-r-3xl text-black my-5 py-14 px-8 flex flex-col justify-between gap-5">
            {/* Header Box */}
            <div className="rounded-2xl bg-white text-5xl text-[#575FFE] font-extrabold flex flex-col items-center px-18 py-9.5">
              <p>UPLOAD</p>
              <p>COVER</p>
            </div>

            {/* CATEGORY SECTION */}
            <div className="rounded-2xl bg-white text-5xl text-[#575FFE] font-extrabold px-18 pt-8 pb-5 relative flex flex-col justify-end gap-3">
              <p className="uppercase text-center">CATEGORY</p>

              <div
                className="w-75 rounded-2xl bg-[#575FFE] text-white font-bold text-xl px-4 py-2 mt-3.5 flex items-center justify-between cursor-pointer"
                onClick={() => setCategoryOpen(!categoryOpen)}
              >
                <span className="uppercase">{selectedCategory}</span>
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
                disabled={isSubmitting}
                onClick={handlePublish}
                className="uppercase cursor-pointer rounded-4xl bg-white text-5xl font-extrabold py-2 px-8 text-[#575FFE] disabled:opacity-60"
              >
                {isSubmitting ? 'publishing...' : 'publish'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UploadVideos;
