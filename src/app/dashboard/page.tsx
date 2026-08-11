"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import ResourceCard from "@/components/resources/ResourceCard";
import { supabase } from "@/lib/supabase";

type Resource = {
  id: string;
  title: string;
  description?: string;
  grade: string;
  subject: string;
  price: number;
  thumbnail_url?: string | null;
};

export default function DashboardPage() {
  const [resources, setResources] = useState<Resource[]>([]);
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

    if (error) {
      console.error("Error loading resources:", error);
    } else {
      setResources((data as Resource[]) || []);
    }

    setLoading(false);
  }

  return (
    <ProtectedRoute>
      <main className="min-h-screen bg-slate-100">
        <div className="mx-auto max-w-7xl px-6 py-10">
          <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-4xl font-bold text-slate-900">
                Welcome to SomaHub
              </h1>

              <p className="mt-2 text-slate-600">
                Browse the latest CBE learning resources uploaded by teachers.
              </p>
            </div>

            <div className="flex gap-3">
              <Link
                href="/resources"
                className="rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white hover:bg-blue-700"
              >
                Browse Resources
              </Link>

              <Link
                href="/dashboard/purchases"
                className="rounded-xl bg-green-600 px-5 py-3 font-semibold text-white hover:bg-green-700"
              >
                My Purchases
              </Link>
            </div>
          </div>

          {loading ? (
            <div className="py-20 text-center text-xl">
              Loading resources...
            </div>
          ) : resources.length === 0 ? (
            <div className="rounded-2xl bg-white p-10 text-center shadow">
              No resources have been published yet.
            </div>
          ) : (
            <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
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