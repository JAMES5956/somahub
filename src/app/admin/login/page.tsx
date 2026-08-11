"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function AdminLogin() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function login(e: React.FormEvent) {
    e.preventDefault();

    setLoading(true);

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      alert(error.message);
      setLoading(false);
      return;
    }

    if (!data.user) {
      alert("Login failed. Please try again.");
      setLoading(false);
      return;
    }

    router.push("/admin");
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-50 px-6">
      <form
        onSubmit={login}
        className="w-full max-w-md rounded-2xl bg-white p-8 shadow-xl"
      >
        <h1 className="text-3xl font-bold text-slate-900">
          Admin Login
        </h1>

        <p className="mt-2 text-slate-500">
          Sign in to access SomaHub Administration.
        </p>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="mt-6 w-full rounded-xl border border-slate-300 p-3 outline-none focus:border-blue-600"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="mt-4 w-full rounded-xl border border-slate-300 p-3 outline-none focus:border-blue-600"
        />

        <button
          type="submit"
          disabled={loading}
          className="mt-6 w-full rounded-xl bg-blue-600 p-3 font-semibold text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
    </main>
  );
}