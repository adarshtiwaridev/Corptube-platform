
import React, { useState ,useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from './styles/Settings.module.css';
import Sidebar from '../pages/Sidebar';
import { Eye, EyeOff } from 'lucide-react';
import {  useEffect } from "react";
//  internal view and layout

const UpdateProfileView = ({ user }) => {
  const [formData, setFormData] = useState({
    fullName: user?.fullName || "",
    category: user?.category || "",
    profilePhoto: user?.profilePhoto || "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [preview, setPreview] = useState(
    user?.profilePhoto || "/assets/Ellipse 48.png"
  );

  const fileInputRef = useRef(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = async (e) => {
    const file = e.target.files && e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => setPreview(reader.result);
    reader.readAsDataURL(file);

    const base64 = await new Promise((resolve, reject) => {
      const r = new FileReader();
      r.onload = () => resolve(r.result);
      r.onerror = reject;
      r.readAsDataURL(file);
    });
    setFormData((prev) => ({ ...prev, profilePhoto: base64 }));
  };

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setIsLoading(true);
    setSuccess(false);
    try {
      const res = await fetch("/api/auth/updateprofile", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const result = await res.json().catch(() => ({}));
      if (!res.ok) {
        setError(result.message || "Failed to update profile");
      } else {
        setSuccess(true);
      }
    } catch (err) {
      setError("Network error. Try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full flex items-center justify-center">
      <div className="max-w-4xl border-4 mt-10 border-blue-500 rounded-2xl p-10 text-center shadow-lg">
        <h2 className="text-3xl font-extrabold text-white tracking-widest mb-8">
          Update Profile
        </h2>

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {/* Full Name */}
          <div>
            <label className="block text-white text-sm mb-1">Full Name</label>
            <input
              name="fullName"
              type="text"
              value={formData.fullName}
              onChange={handleChange}
              placeholder="Enter your name"
              className="w-full px-4 py-2 bg-transparent border-2 border-white/30 rounded-lg text-white focus:border-purple-500 outline-none"
            />
          </div>

          {/* Category */}
          <div>
            <label className="block text-white text-sm mb-1">Category</label>
            <input
              name="category"
              type="text"
              value={formData.category}
              onChange={handleChange}
              placeholder="Enter your category"
              className="w-full px-4 py-2 bg-transparent border-2 border-white/30 rounded-lg text-white focus:border-purple-500 outline-none"
            />
          </div>

          {/* Profile Image + Button beside */}
          <div className="md:col-span-2 flex flex-row-reverse items-center gap-18 justify-center">
            <div
              onClick={handleImageClick}
              className="w-[100px] h-[100px] rounded-full overflow-hidden ring-4 ring-blue-500 cursor-pointer"
            >
              <Image
                src={typeof preview === "string" ? preview : "/assets/Ellipse 48.png"}
                alt="profile"
                width={100}
                height={100}
                className="w-[100px] h-[100px] object-cover"
              />
            </div>
            <input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              onChange={handleFileChange}
              className="hidden"
            />
            <button
              type="submit"
              disabled={isLoading}
              className="px-6 py-2 bg-gradient-to-r from-purple-600 to-purple-800 rounded-lg text-white font-semibold disabled:opacity-50"
            >
              {isLoading ? "Saving..." : "Update Profile"}
            </button>
          </div>

          {/* Error / Success */}
          {error && (
            <div className="md:col-span-2 text-red-400 text-sm text-center bg-red-400/10 border border-red-400/20 rounded-lg p-3">
              {error}
            </div>
          )}
          {success && (
            <div className="md:col-span-2 text-green-400 text-sm text-center bg-green-400/10 border border-green-400/20 rounded-lg p-3">
              Profile updated successfully
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

const AboutUsView = () => (
  <div className="flex-1 w-full flex items-center justify-center bg-black py-20 px-6">
    <div className="max-w-4xl border-4 border-blue-500 rounded-2xl p-10 text-center shadow-lg">
      <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-6 tracking-wide">
        About <span className="text-blue-400">CORPTUBE</span>
      </h2>
      <p className="text-lg md:text-xl text-gray-200 leading-relaxed mb-6">
        CORPTUBE is the social media app for the ambitious.  
        A space where entrepreneurs, creators, and learners connect, share skills, and build opportunities.  
        Unlike noisy platforms, CORPTUBE is designed for growth, networking, and real impact.  
      </p>
      <p className="text-xl italic text-blue-400 font-semibold mb-8">
        “Your Network. Your Skills. Your Future.”
      </p>
      <p className="text-sm text-gray-400">© 2025 CORPTUBE. All Rights Reserved.</p>
    </div>
  </div>
);



const UpdatePasswordView = () => {
  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);
    setSuccess(false);
    try {
      if (formData.newPassword !== formData.confirmPassword) {
        setError("New password and confirm password must match");
        setIsLoading(false);
        return;
      }
      const res = await fetch("/api/auth/updatepassword", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const result = await res.json().catch(() => ({}));
      if (!res.ok) {
        setError(result.message || "Failed to update password");
      } else {
        setSuccess(true);
        setFormData({
          currentPassword: "",
          newPassword: "",
          confirmPassword: "",
        });
      }
    } catch (err) {
      setError("Network error. Try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex-1 w-full flex items-center justify-center">
      {/* ✅ Box with fixed height + blue border */}
      <div className="w-full max-w-md h-[28rem] mt-10 p-6 bg-black/60 border-4 border-blue-500 rounded-xl shadow-lg">
        <h2 className="text-3xl font-bold text-white mb-6 text-center">
          Update Password
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Current Password */}
          <div>
            <label className="block text-white text-sm mb-1">
              Current Password
            </label>
            <div className="relative">
              <input
                type={showCurrent ? "text" : "password"}
                name="currentPassword"
                value={formData.currentPassword}
                onChange={handleChange}
                className="w-full px-4 py-2 bg-transparent border-2 border-white/30 rounded-lg text-white focus:border-purple-500 outline-none pr-12"
                placeholder="Enter current password"
                required
              />
              <button
                type="button"
                onClick={() => setShowCurrent((s) => !s)}
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-black text-white rounded-full p-2"
              >
                {showCurrent ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          {/* New Password */}
          <div>
            <label className="block text-white text-sm mb-1">
              New Password
            </label>
            <div className="relative">
              <input
                type={showNew ? "text" : "password"}
                name="newPassword"
                value={formData.newPassword}
                onChange={handleChange}
                className="w-full px-4 py-2 bg-transparent border-2 border-white/30 rounded-lg text-white focus:border-purple-500 outline-none pr-12"
                placeholder="Enter new password"
                required
              />
              <button
                type="button"
                onClick={() => setShowNew((s) => !s)}
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-black text-white rounded-full p-2"
              >
                {showNew ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          {/* Confirm New Password */}
          <div>
            <label className="block text-white text-sm mb-1">
              Confirm New Password
            </label>
            <div className="relative">
              <input
                type={showConfirm ? "text" : "password"}
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="w-full px-4 py-2 bg-transparent border-2 border-white/30 rounded-lg text-white focus:border-purple-500 outline-none pr-12"
                placeholder="Confirm new password"
                required
              />
              <button
                type="button"
                onClick={() => setShowConfirm((s) => !s)}
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-black text-white rounded-full p-2"
              >
                {showConfirm ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          {/* Error / Success */}
          {error && (
            <div className="text-red-400 text-sm text-center bg-red-400/10 border border-red-400/20 rounded-lg p-3">
              {error}
            </div>
          )}
          {success && (
            <div className="text-green-400 text-sm text-center bg-green-400/10 border border-green-400/20 rounded-lg p-3">
              Password updated successfully
            </div>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-2 bg-gradient-to-r from-purple-600 to-purple-800 rounded-lg text-white font-semibold disabled:opacity-50"
          >
            {isLoading ? "Updating..." : "Update Password"}
          </button>
        </form>
      </div>
    </div>
  );
};

// ---------------------------------------------


// 1. Data structure for the menu items
const settingsOptions = [
  { id: 1, title: 'UPDATE PROFILE', key: 'updateProfile', iconSrc: '/assets/Polygon 28 (1).png', href: '/profile/update' },
  { id: 2, title: 'UPDATE PASSWORD', key: 'updatePassword', iconSrc: '/assets/Polygon 29.png', href: '/password/update' },
  { id: 3, title: 'ABOUT US', key: 'aboutUs', iconSrc: '/assets/Polygon 30.png', href: '/about' },
];

// Reusable component for the settings button row (MODIFIED to accept click handler for the arrow)
const SettingButton = ({ title, iconSrc, onInternalArrowClick }) => (
  <div 
    onClick={onInternalArrowClick}
    className={`font-sans font-bold flex items-center justify-between p-4 my-12 rounded-lg cursor-pointer transition-all duration-200 
                bg-gray-800 text-white shadow-md border-2 border-white hover:bg-gray-600`}
  >
    <div className="flex items-center flex-grow">
      <div className="flex items-center">
        <div className="mr-4">
          <Image src={iconSrc} alt={`${title} icon`} width={100} height={100} />
        </div>
        
        <span className="text-4xl font-semibold tracking-wider text-white  pl-4">{title}</span>
      </div>
    </div>
    <div className="cursor-pointer">
      <Image src="/assets/Ellipse 44.png" alt='arrow' height={90} width={90} />
    </div>
  </div>
);

// Header + Menu container that can morph to tabs on subviews
const HeaderAndMenu = ({ isSubview, currentView, onBack, onGo, children }) => (
  <div className={`font-sans font-bold w-[85rem] h-full bg-black rounded-xl p-6 ${styles.mainContainerGlow}`}>
      <div className="content-center flex justify-between items-center pb-4 mb-6 border-b-2 border-indigo-800">
          <h1 className="text-3xl font-sans font-bold text-white tracking-widest  border-3 px-128 py-3.5 m-2.5 rounded-2xl border-indigo-600 shadow-2xl">SETTINGS</h1>
          {isSubview ? (
            <Image 
              onClick={onBack}
              src="/assets/back-btn.png" 
              alt="Back-btn"
              width={24}                 
              height={24}                
              className="w-16 h-16 rounded-full hover:bg-indigo-600 transition-colors"  
            />
          ) : (
            <Link href="/">
              <Image 
                src="/assets/back-btn.png" 
                alt="Back-btn"
                width={24}                 
                height={24}                
                className="w-16 h-16 rounded-full hover:bg-indigo-600 transition-colors"  
              />
            </Link>
          )}
      </div>

      {/* Menu area */}
      {isSubview ? (
        <div className={`${styles.tabsContainer} ${styles.tabsActive}`}>
          {settingsOptions.map(option => (
            <button
              key={option.id}
              className={`${styles.tabItem} ${currentView === option.key ? styles.tabItemActive : ''}`}
              onClick={() => onGo(option.key)}
            >
              <div className="flex items-center gap-3">
                <Image src={option.iconSrc} alt={`${option.title} icon`} width={40} height={40} />
                <span className="text-lg tracking-wider">{option.title}</span>
              </div>
            </button>
          ))}
        </div>
      ) : (
        <div className="space-y-4">
          {settingsOptions.map(option => (
            <SettingButton 
              key={option.id}
              title={option.title}
              iconSrc={option.iconSrc}
              onInternalArrowClick={() => onGo(option.key)}
            />
          ))}
        </div>
      )}

      
      {isSubview && (
        <div className="mt-4">
          {children}
        </div>
      )}
  </div>
);


export default function SettingPage() {
  
  const [currentView, setCurrentView] = useState('settings');

  const handleGo = (viewKey) => {
    setCurrentView(viewKey);
  };
  const handleBack = () => setCurrentView('settings');

  const isSubview = currentView !== 'settings';

  return (
    <div className="flex min-h-screen bg-black"> 
      <Sidebar />
      <main className="flex-1 p-6 flex flex-col items-center"> 
        <HeaderAndMenu 
          isSubview={isSubview}
          currentView={currentView}
          onBack={handleBack}
          onGo={handleGo}
        >
          {currentView === 'updateProfile' && <UpdateProfileView />}
          {currentView === 'updatePassword' && <UpdatePasswordView />}
          {currentView === 'aboutUs' && <AboutUsView />}
        </HeaderAndMenu>
      </main>
    </div>
  );
}






