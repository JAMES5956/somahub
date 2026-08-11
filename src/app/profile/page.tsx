
"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { supabase } from "@/lib/supabase";
import {
  User,
  Mail,
  Shield,
  Calendar,
  Lock,
} from "lucide-react";

export default function ProfilePage() {
  const { user, loading } = useAuth();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("student");
  const [createdAt, setCreatedAt] = useState("");

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [saving, setSaving] = useState(false);
  const [changingPassword, setChangingPassword] = useState(false);

  useEffect(() => {
    if (user) {
      loadProfile();
    }
  }, [user]);

  async function loadProfile() {
    if (!user) return;

    const { data, error } = await supabase
      .from("profiles")
      .select("email, full_name, role, created_at")
      .eq("id", user.id)
      .single();

    if (error) {
      console.error("Failed to load profile:", error);

      setEmail(user.email || "");
      return;
    }

    setEmail(data.email || user.email || "");
    setFullName(data.full_name || "");
    setRole(data.role || "student");
    setCreatedAt(data.created_at || "");
  }

  async function saveProfile() {
    if (!user) return;

    if (!fullName.trim()) {
      alert("Please enter your full name.");
      return;
    }

    setSaving(true);

    const { error } = await supabase
      .from("profiles")
      .update({
        full_name: fullName.trim(),
      })
      .eq("id", user.id);

    setSaving(false);

    if (error) {
      console.error(error);
      alert(error.message);
      return;
    }

    alert("Profile updated successfully.");
  }

  async function changePassword() {
    if (!newPassword || !confirmPassword) {
      alert("Please fill in both password fields.");
      return;
    }

    if (newPassword.length < 6) {
      alert("Password must be at least 6 characters.");
      return;
    }

    if (newPassword !== confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    setChangingPassword(true);

    const { error } = await supabase.auth.updateUser({
      password: newPassword,
    });

    setChangingPassword(false);

    if (error) {
      console.error(error);
      alert(error.message);
      return;
    }

    setNewPassword("");
    setConfirmPassword("");

    alert("Password changed successfully.");
  }

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-gray-100">
        <div className="text-center">
          <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-blue-200 border-t-blue-600" />

          <p className="mt-4 text-lg font-semibold text-gray-700">
            Loading profile...
          </p>
        </div>
      </main>
    );
  }

  if (!user) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-gray-100 px-6">
        <div className="rounded-2xl bg-white p-8 text-center shadow-lg">
          <h1 className="text-2xl font-bold text-gray-900">
            Please log in
          </h1>

          <p className="mt-2 text-gray-500">
            You need to be logged in to view your profile.
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-100 px-6 py-10">
      <div className="mx-auto max-w-4xl">

        {/* PROFILE CARD */}
        <div className="overflow-hidden rounded-3xl bg-white shadow-xl">

          {/* HEADER */}
          <div className="bg-gradient-to-r from-blue-700 to-sky-600 px-8 py-10 text-white">
            <div className="flex items-center gap-5">

              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-white text-blue-700 shadow-lg">
                <User size={40} />
              </div>

              <div>
                <h1 className="text-3xl font-bold">
                  My Profile
                </h1>

                <p className="mt-1 text-blue-100">
                  Manage your SomaHub account
                </p>
              </div>

            </div>
          </div>

          {/* PROFILE INFORMATION */}
          <div className="space-y-6 p-8">

            {/* FULL NAME */}
            <div>
              <label className="mb-2 block font-semibold text-gray-800">
                Full Name
              </label>

              <div className="relative">
                <User
                  size={20}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                />

                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Enter your full name"
                  className="w-full rounded-xl border border-gray-300 py-3 pl-12 pr-4 outline-none transition focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
                />
              </div>
            </div>

            {/* EMAIL */}
            <div>
              <label className="mb-2 block font-semibold text-gray-800">
                Email Address
              </label>

              <div className="relative">
                <Mail
                  size={20}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                />

                <input
                  type="email"
                  value={email}
                  disabled
                  className="w-full cursor-not-allowed rounded-xl border border-gray-200 bg-gray-100 py-3 pl-12 pr-4 text-gray-600"
                />
              </div>

              <p className="mt-2 text-sm text-gray-500">
                Your email address cannot be changed here.
              </p>
            </div>

            {/* ACCOUNT TYPE */}
            <div>
              <label className="mb-2 block font-semibold text-gray-800">
                Account Type
              </label>

              <div className="flex items-center gap-3 rounded-xl border border-gray-200 bg-gray-50 p-4">
                <Shield
                  size={20}
                  className="text-blue-600"
                />

                <span className="font-semibold capitalize text-gray-700">
                  {role}
                </span>
              </div>
            </div>

            {/* JOINED DATE */}
            <div>
              <label className="mb-2 block font-semibold text-gray-800">
                Joined SomaHub
              </label>

              <div className="flex items-center gap-3 rounded-xl border border-gray-200 bg-gray-50 p-4">
                <Calendar
                  size={20}
                  className="text-blue-600"
                />

                <span className="text-gray-700">
                  {createdAt
                    ? new Date(createdAt).toLocaleDateString()
                    : "Unknown"}
                </span>
              </div>
            </div>

            {/* SAVE BUTTON */}
            <button
              type="button"
              onClick={saveProfile}
              disabled={saving}
              className="w-full rounded-xl bg-gradient-to-r from-blue-600 to-sky-600 py-4 font-bold text-white transition hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-60"
            >
              {saving ? "Saving..." : "Save Changes"}
            </button>

            {/* PASSWORD SECTION */}
            <div className="mt-10 border-t border-gray-200 pt-8">

              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-100 text-blue-600">
                  <Lock size={22} />
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-gray-900">
                    Change Password
                  </h2>

                  <p className="text-sm text-gray-500">
                    Update your SomaHub account password.
                  </p>
                </div>
              </div>

              <div className="mt-6 space-y-4">

                {/* NEW PASSWORD */}
                <div>
                  <label className="mb-2 block font-semibold text-gray-800">
                    New Password
                  </label>

                  <input
                    type="password"
                    value={newPassword}
                    onChange={(e) =>
                      setNewPassword(e.target.value)
                    }
                    placeholder="Enter new password"
                    className="w-full rounded-xl border border-gray-300 p-4 outline-none transition focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
                  />
                </div>

                {/* CONFIRM PASSWORD */}
                <div>
                  <label className="mb-2 block font-semibold text-gray-800">
                    Confirm New Password
                  </label>

                  <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) =>
                      setConfirmPassword(e.target.value)
                    }
                    placeholder="Confirm new password"
                    className="w-full rounded-xl border border-gray-300 p-4 outline-none transition focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
                  />
                </div>

                {/* PASSWORD BUTTON */}
                <button
                  type="button"
                  onClick={changePassword}
                  disabled={changingPassword}
                  className="w-full rounded-xl bg-gray-900 py-4 font-bold text-white transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {changingPassword
                    ? "Changing Password..."
                    : "Change Password"}
                </button>

              </div>
            </div>

          </div>
        </div>
      </div>
    </main>
  );
}

