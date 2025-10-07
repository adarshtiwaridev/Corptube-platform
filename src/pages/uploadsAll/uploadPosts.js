import React, { useState, useEffect } from 'react';
import { toast } from 'sonner';
import Sidebar from '../../Components/Sidebar';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
// Robust JSON parser for API responses
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
// ...existing code...

const UploadVideos = () => {
  const router = useRouter();

  // Ensure user is present in localStorage on component mount
  useEffect(() => {
    (async () => {
      try {
        const raw = typeof window !== 'undefined' ? localStorage.getItem('user') : null;
        if (!raw) {
          const res = await fetch('/api/auth/me', { credentials: 'include' });
          const data = await safeParseJson(res);
          if (data?.success && data?.data) {
            localStorage.setItem('user', JSON.stringify(data.data));
          }
        }
      } catch (e) {
        // swallow errors here; this is a best-effort hydration step
      }
    })();
  }, []);

  // ====== STATE MANAGEMENT ======
  const [categoryOpen, setCategoryOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("select category");
  const [descOpen, setDescOpen] = useState(false);
  const [descClosing, setDescClosing] = useState(false);
  const categories = ["ENTREPRENEUR", "CREATOR", "BUISINESSPERSON"];

  const [imageFile, setImageFile] = useState(null);
  const [description, setDescription] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  // ====== HANDLERS ======

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

  // ✅ Publish logic (moved to top for readability)
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

      if (!userId) {
        toast.error('User ID missing. Please login again.');
        return;
      }

      if (!imageFile) {
        toast.error('Please select an image');
        return;
      }

      // 🔹 Upload Image
      const formData = new FormData();
      formData.append('image', imageFile);
      formData.append('folder', 'images');

      const uploadRes = await fetch('/api/media/upload', { method: 'POST', body: formData });
      const uploadJson = await safeParseJson(uploadRes);

      if (!uploadJson.url) {
        toast.error(uploadJson.message || 'Upload failed');
        return;
      }

      const imageUrl = uploadJson.url;

      // 🔹 Prepare Payload
      const payload = {
        userId,
        userCategory: selectedCategory !== 'select category' ? selectedCategory : undefined,
        description,
        imageUrl,
      };

      // 🔹 Send Post Request
      const resp = await fetch('/api/uploads/uploadpost', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const out = await safeParseJson(resp);

      if (!out.success) {
        toast.error(out.message || 'Publish failed');
        return;
      }

      toast.success('Post published successfully');
      router.push('/uploadsAll/uploadPosts');
    } catch (e) {
      toast.error(e?.message || 'Something went wrong');
    } finally {
      setIsSubmitting(false);
    }
  };

  // ====== UI ======
  return (
    <div>
      <Sidebar />

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
          {/* LEFT PANEL */}
          <div className='border-5 border-[#575FFE] rounded-3xl bg-white flex flex-col items-center justify-center gap-6 py-40 px-20 ring-2 ring-[#8d92eb]'>
            <div className='circle w-65 h-65 rounded-full border-[#575FFE] border-4 flex items-center justify-center'>
              <Link href="#">
                <Image
                  src="/assets/Untitleddesign(7)1.png"
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
                accept="image/*"
                className="hidden"
                onChange={(e) => setImageFile(e.target.files?.[0] || null)}
              />

              <label
                htmlFor="fileUpload"
                className="p-2.5 px-9 bg-[#575FFE] text-3xl font-bold text-white rounded-full cursor-pointer"
              >
                UPLOAD IMAGES
              </label>
            </div>
          </div>

          {/* RIGHT PANEL */}
          <div className='bg-[#575FFE] rounded-r-3xl text-black my-5 py-14 px-8 flex flex-col justify-between gap-5 relative overflow-hidden'>
            
            {/* DESCRIPTION */}
            <div
              className="rounded-2xl bg-white text-5xl text-[#575FFE] font-extrabold flex flex-col items-center px-18 py-16 cursor-pointer"
              onClick={() => setDescOpen(true)}
            >
              <p className="uppercase cursor-pointer">description</p>
            </div>

            {/* CATEGORY */}
            <div className='rounded-2xl bg-white text-5xl text-[#575FFE] font-extrabold px-18 pt-8 pb-5 relative flex flex-col justify-end items-center gap-3'>
              <p className='uppercase text-center'>CATEGORY</p>

              <div
                className='w-75 rounded-2xl bg-[#575FFE] text-white font-bold text-xl px-4 py-1 mt-3.5 flex items-center justify-between cursor-pointer'
                onClick={() => setCategoryOpen(!categoryOpen)}
              >
                <span className='uppercase'>{selectedCategory}</span>
                <div className='mr-[-15px] border-2 border-[#575FFE] rounded-full bg-white overflow-visible'>
                  <Image
                    src="/assets/Polygon 36.png"
                    alt="arrow"
                    width={24}
                    height={24}
                    className={`w-10 h-8 p-2.5 transition-transform ${categoryOpen ? 'rotate-180' : ''}`}
                  />
                </div>
              </div>

              {categoryOpen && (
                <div className='absolute w-[68%] bg-[#ffffff] rounded-2xl z-10'>
                  {categories.map((option) => (
                    <div
                      key={option}
                      className='text-white text-xl font-bold px-6 py-1 rounded-lg cursor-pointer bg-[#575FFE] m-2 hover:bg-[#3e46cd]'
                      onClick={() => handleSelectCategory(option)}
                    >
                      {option}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* PUBLISH BUTTON */}
            <div className='flex justify-center items-center'>
              <button
                disabled={isSubmitting}
                onClick={handlePublish}
                className='uppercase cursor-pointer rounded-4xl bg-white text-5xl font-extrabold py-2 px-8 text-[#575FFE] disabled:opacity-60'
              >
                {isSubmitting ? 'publishing...' : 'publish'}
              </button>
            </div>

            {/* DESCRIPTION OVERLAY */}
            {descOpen && (
              <div className="absolute inset-0 z-40 flex items-center justify-center">
                <div className="absolute inset-0 bg-black/20"></div>

                <div
                  className={`relative w-full h-full rounded-r-2xl p-6 bg-white shadow-lg transform transition-all
                    ${descClosing ? 'animate-descClose' : 'animate-descOpen'}`}
                >
                  <button
                    aria-label="Close description"
                    onClick={handleCloseDesc}
                    className="absolute top-4 right-4 p-2 rounded-full border-2 border-[#575FFE] bg-white text-[#575FFE] hover:bg-[#f3f4ff] cursor-pointer"
                  >
                    ✕
                  </button>

                  <textarea
                    placeholder="Description...."
                    className="w-full h-full p-6 text-xl border-2 border-[#8f8fed] rounded-2xl resize-none focus:outline-none"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ANIMATIONS */}
      <style jsx>{`
        @keyframes descOpen {
          from { transform: scale(0.98); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }

        @keyframes descClose {
          from { transform: scale(1); opacity: 1; }
          to { transform: scale(0.98); opacity: 0; }
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
