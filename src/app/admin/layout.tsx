"use client";

import { ReactNode, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import Sidebar from "@/components/admin/Sidebar";
import Topbar from "@/components/admin/Topbar";

export default function AdminLayout({
  children,
}: {
  children: ReactNode;
}) {
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    checkAdmin();
  }, []);

  async function checkAdmin() {
    try {
      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();

      console.log("User:", user);
      console.log("User Error:", userError);

      if (userError || !user) {
        router.replace("/login");
        return;
      }

      const { data, error } = await supabase
        .from("profiles")
        .select("role")
        .eq("id", user.id)
        .single();

      console.log("Profile:", data);
      console.log("Profile Error:", error);

      if (error) {
        console.error(error);
        router.replace("/");
        return;
      }

      if (data?.role !== "admin") {
        router.replace("/");
        return;
      }

      setAuthorized(true);
    } catch (err) {
      console.error("Admin check failed:", err);
      router.replace("/");
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-100">
        <p className="text-lg font-semibold">
          Loading Admin Panel...
        </p>
      </div>
    );
  }

  if (!authorized) {
    return null;
  }

  return (
    <div className="flex min-h-screen bg-slate-100">
      <Sidebar />

      <div className="flex flex-1 flex-col">
        <Topbar />

        <main className="flex-1 p-8">
          {children}
        </main>
      </div>
    </div>
  );
}