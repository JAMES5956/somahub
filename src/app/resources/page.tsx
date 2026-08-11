"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import ResourceCard from "@/components/resources/ResourceCard";
import { supabase } from "@/lib/supabase";

export default function ResourcesPage() {
  const [resources, setResources] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [grade, setGrade] = useState("All");
  const [subject, setSubject] = useState("All");
  const [type, setType] = useState("All");
  const [sortBy, setSortBy] = useState("Newest");

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
      console.error(error);
    } else {
      setResources(data || []);
    }

    setLoading(false);
  }

  const grades = [
    "All",
    ...new Set(resources.map((resource) => resource.grade)),
  ];

  const subjects = [
    "All",
    ...new Set(resources.map((resource) => resource.subject)),
  ];

  const types = [
    "All",
    ...new Set(
      resources
        .map((resource) => resource.type)
        .filter(Boolean)
    ),
  ];

  const filteredResources = useMemo(() => {
    return resources.filter((resource) => {
      const matchesSearch =
        resource.title
          ?.toLowerCase()
          .includes(search.toLowerCase()) ||
        resource.description
          ?.toLowerCase()
          .includes(search.toLowerCase());

      const matchesGrade =
        grade === "All" || resource.grade === grade;

      const matchesSubject =
        subject === "All" || resource.subject === subject;

      const matchesType =
        type === "All" || resource.type === type;

      return (
        matchesSearch &&
        matchesGrade &&
        matchesSubject &&
        matchesType
      );
    });
  }, [
    resources,
    search,
    grade,
    subject,
    type,
  ]);

  const sortedResources = useMemo(() => {
    const sorted = [...filteredResources];

    switch (sortBy) {
      case "Price: Low to High":
        sorted.sort((a, b) => a.price - b.price);
        break;

      case "Price: High to Low":
        sorted.sort((a, b) => b.price - a.price);
        break;

      case "A-Z":
        sorted.sort((a, b) =>
          a.title.localeCompare(b.title)
        );
        break;

      case "Z-A":
        sorted.sort((a, b) =>
          b.title.localeCompare(a.title)
        );
        break;

      default:
        sorted.sort(
          (a, b) =>
            new Date(b.created_at).getTime() -
            new Date(a.created_at).getTime()
        );
    }

    return sorted;
  }, [filteredResources, sortBy]);

  return (
    <ProtectedRoute>
      <main className="min-h-screen bg-gray-100">
              {/* Header */}
        <div className="bg-gradient-to-r from-blue-700 to-sky-600 py-12 text-white">
          <div className="mx-auto max-w-7xl px-6">

            <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">

              <div>
                <h1 className="text-5xl font-bold">
                  Learning Resources
                </h1>

                <p className="mt-3 text-lg text-blue-100">
                  Browse high-quality CBC learning materials.
                </p>
              </div>

              <Link
                href="/dashboard"
                className="rounded-xl bg-white px-6 py-3 font-semibold text-blue-700 hover:bg-gray-100"
              >
                Dashboard
              </Link>

            </div>

          </div>
        </div>

        {/* Filters */}
        <div className="mx-auto max-w-7xl px-6 py-10">

          <div className="rounded-3xl bg-white p-6 shadow">

            <div className="grid gap-5 lg:grid-cols-5">

              {/* Search */}
              <input
                type="text"
                placeholder="Search resources..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="rounded-xl border border-gray-300 p-4 outline-none focus:border-blue-600"
              />

              {/* Grade */}
              <select
                value={grade}
                onChange={(e) => setGrade(e.target.value)}
                className="rounded-xl border border-gray-300 p-4"
              >
                {grades.map((g) => (
                  <option key={g} value={g}>
                    {g}
                  </option>
                ))}
              </select>

              {/* Subject */}
              <select
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="rounded-xl border border-gray-300 p-4"
              >
                {subjects.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>

              {/* Type */}
              <select
                value={type}
                onChange={(e) => setType(e.target.value)}
                className="rounded-xl border border-gray-300 p-4"
              >
                {types.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>

              {/* Sort */}
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="rounded-xl border border-gray-300 p-4"
              >
                <option>Newest</option>
                <option>Price: Low to High</option>
                <option>Price: High to Low</option>
                <option>A-Z</option>
                <option>Z-A</option>
              </select>

            </div>

          </div>

          {/* Results Header */}

          <div className="mt-10 flex items-center justify-between">

            <h2 className="text-2xl font-bold text-gray-900">
              Available Resources
            </h2>

            <span className="rounded-full bg-blue-100 px-4 py-2 font-semibold text-blue-700">
              {sortedResources.length} Resources
            </span>

          </div>
                    {/* Resource Cards */}

          {loading ? (

            <div className="mt-10 rounded-2xl bg-white p-10 text-center shadow">
              <p className="text-xl font-semibold text-gray-600">
                Loading resources...
              </p>
            </div>

          ) : sortedResources.length === 0 ? (

            <div className="mt-10 rounded-2xl bg-white p-10 text-center shadow">
              <h3 className="text-2xl font-bold text-gray-800">
                No Resources Found
              </h3>

              <p className="mt-2 text-gray-500">
                Try changing your search or filters.
              </p>
            </div>

          ) : (

            <div className="mt-8 grid gap-8 md:grid-cols-2 xl:grid-cols-3">

              {sortedResources.map((resource) => (
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