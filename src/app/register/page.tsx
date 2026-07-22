"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function RegisterPage() {
  const router = useRouter();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleRegister(
    e: React.FormEvent<HTMLFormElement>
  ) {
    e.preventDefault();

    setLoading(true);
    setError("");

    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName,
          },
        },
      });

      if (error) throw error;

      alert(
        "Account created successfully! You can now log in."
      );

      router.push("/login");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-100 px-6">

      <form
        onSubmit={handleRegister}
        className="w-full max-w-md rounded-3xl bg-white p-8 shadow-xl"
      >

        <h1 className="mb-8 text-center text-3xl font-bold">
          Create Account
        </h1>

        {error && (
          <div className="mb-6 rounded-xl bg-red-100 p-4 text-red-700">
            {error}
          </div>
        )}

        <input
          type="text"
          placeholder="Full Name"
          className="mb-4 w-full rounded-xl border p-4"
          value={fullName}
          onChange={(e) =>
            setFullName(e.target.value)
          }
          required
        />

        <input
          type="email"
          placeholder="Email"
          className="mb-4 w-full rounded-xl border p-4"
          value={email}
          onChange={(e) =>
            setEmail(e.target.value)
          }
          required
        />

        <input
          type="password"
          placeholder="Password"
          className="mb-6 w-full rounded-xl border p-4"
          value={password}
          onChange={(e) =>
            setPassword(e.target.value)
          }
          required
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-xl bg-blue-600 p-4 font-semibold text-white hover:bg-blue-700"
        >
          {loading
            ? "Creating..."
            : "Create Account"}
        </button>

        <p className="mt-6 text-center">
          Already have an account?

          <Link
            href="/login"
            className="ml-2 font-bold text-blue-600"
          >
            Login
          </Link>

        </p>

      </form>

    </main>
  );
}