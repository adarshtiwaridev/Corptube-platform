"use client";
import React, { useState, useEffect } from "react";
import { Eye, EyeOff } from "lucide-react"; // for password toggle
import { useSearchParams } from "next/navigation";

const ResetPasswordView = () => {
  const searchParams = useSearchParams();
  const token = searchParams.get("token"); // ✅ grab token from URL

  const [formData, setFormData] = useState({
    newPassword: "",
    confirmPassword: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);
    setSuccess(false);

    if (formData.newPassword !== formData.confirmPassword) {
      setError("Passwords do not match");
      setIsLoading(false);
      return;
    }

    try {
      const res = await fetch("/api/auth/resetpassword", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          token, // ✅ send token from email link
          newPassword: formData.newPassword,
        }),
      });

      const result = await res.json().catch(() => ({}));

      if (!res.ok) {
        setError(result.message || "Failed to reset password");
      } else {
        setSuccess(true);
        setFormData({ newPassword: "", confirmPassword: "" });
      }
    } catch (err) {
      setError("Network error. Try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex-1 w-full flex items-center justify-center">
      <div className="w-full max-w-md h-[24rem] mt-10 p-6 bg-black/60 border-4 border-blue-500 rounded-xl shadow-lg">
        <h2 className="text-3xl font-bold text-white mb-6 text-center">
          Reset Password
        </h2>

        {!token ? (
          <div className="text-red-400 text-center">
            Invalid or missing reset link.
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
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

            {/* Confirm Password */}
            <div>
              <label className="block text-white text-sm mb-1">
                Confirm Password
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
                Password reset successfully. You can now login.
              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-2 bg-gradient-to-r from-purple-600 to-purple-800 rounded-lg text-white font-semibold disabled:opacity-50"
            >
              {isLoading ? "Resetting..." : "Reset Password"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default ResetPasswordView;
