"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function AdminProfilePage() {
  const [profile, setProfile] = useState<any>(null);

  useEffect(() => {
    loadProfile();
  }, []);

  async function loadProfile() {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) return;

    const { data } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", user.id)
      .single();

    setProfile(data);
  }

  return (
    <div>
      <h1 className="text-4xl font-bold">
        My Profile
      </h1>

      <div className="mt-8 rounded-2xl bg-white p-8 shadow">

        <p>
          <strong>Name:</strong>{" "}
          {profile?.full_name || "No name"}
        </p>

        <p className="mt-4">
          <strong>Email:</strong>{" "}
          {profile?.email}
        </p>

        <p className="mt-4">
          <strong>Role:</strong>{" "}
          {profile?.role}
        </p>

      </div>
    </div>
  );
}