"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import ResourceCard from "@/components/resources/ResourceCard";
import { supabase } from "@/lib/supabase";

export default function Dashboard() {
  const [resources, setResources] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadResources();
  }, []);

  async function loadResources() {
    const { data, error } = await supabase
      .from("resources")
      .select("*")
      .eq("published", true)
      .order("created_at", { ascending: false });

    if (!error) {
      setResources(data || []);
    } else {
      console.error(error);
    }

    setLoading(false);
  }

  return (
    <ProtectedRoute>
      <main className="min-h-screen bg-gray-100">

        <div className="bg-blue-700 text-white">
          <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">

            <h1 className="text-3xl font-bold">
              SomaHub Dashboard
            </h1>

            <Link
              href="/resources"
              className="rounded-lg bg-white px-5 py-2 font-semibold text-blue-700"
            >
              Browse Resources
            </Link>

          </div>
        </div>

        <div className="mx-auto max-w-7xl px-6 py-10">

          <h2 className="text-4xl font-bold">
            Welcome 👋
          </h2>

          <p className="mt-2 text-gray-600">
            Browse the latest CBC learning resources.
          </p>

          {loading ? (
            <div className="mt-10 text-center text-xl">
              Loading resources...
            </div>
          ) : resources.length === 0 ? (
            <div className="mt-10 rounded-2xl bg-white p-8 shadow text-center">
              No resources have been published yet.
            </div>
          ) : (
            <div className="mt-10 grid gap-8 md:grid-cols-2 xl:grid-cols-3">
              {resources.map((resource) => (
                <ResourceCard
                  key={resource.id}
                  resource={resource}
                />
              ))}
            </div>
          )}

        </div>

      </main>
    </ProtectedRoute>
  );
}