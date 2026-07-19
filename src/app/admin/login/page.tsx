"use client";

import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useRouter } from "next/navigation";


export default function AdminLogin() {

  const router = useRouter();

  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");



  async function login(e: React.FormEvent){

    e.preventDefault();


    try {

      await signInWithEmailAndPassword(
        auth,
        email,
        password
      );


      router.push("/admin");


    } catch(error){

      alert("Login failed");

    }

  }



  return (

    <main className="min-h-screen flex items-center justify-center bg-slate-50">


      <form
        onSubmit={login}
        className="w-full max-w-md rounded-xl bg-white p-8 shadow"
      >

        <h1 className="text-3xl font-bold">
          Admin Login
        </h1>


        <input
          type="email"
          placeholder="Email"
          className="mt-6 w-full rounded border p-3"
          onChange={(e)=>setEmail(e.target.value)}
        />


        <input
          type="password"
          placeholder="Password"
          className="mt-4 w-full rounded border p-3"
          onChange={(e)=>setPassword(e.target.value)}
        />


        <button
          className="mt-6 w-full rounded bg-blue-600 p-3 text-white"
        >
          Login
        </button>


      </form>


    </main>

  );
}