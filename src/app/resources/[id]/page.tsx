"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { supabase } from "@/lib/supabase";

export default function ResourceDetailsPage() {
  const { id } = useParams();

  const [resource, setResource] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      loadResource();
    }
  }, [id]);

  async function loadResource() {
    const { data, error } = await supabase
      .from("resources")
      .select("*")
      .eq("id", id)
      .single();

    if (error) {
      console.error(error);
    } else {
      setResource(data);
    }

    setLoading(false);
  }

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-100">
        <h1 className="text-3xl font-bold text-slate-900">
          Loading Resource...
        </h1>
      </main>
    );
  }

  if (!resource) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-100">
        <h1 className="text-3xl font-bold text-red-600">
          Resource Not Found
        </h1>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-100">

      {/* HEADER */}

      <div className="bg-gradient-to-r from-blue-700 to-sky-600 py-10">

        <div className="mx-auto max-w-7xl px-6">

          <Link
            href="/resources"
            className="font-semibold text-white hover:text-blue-100"
          >
            ← Back to Resources
          </Link>

          <h1 className="mt-5 text-5xl font-bold text-white">
            {resource.title}
          </h1>

        </div>

      </div>

      {/* BODY */}

      <div className="mx-auto max-w-7xl px-6 py-12">

        <div className="grid gap-10 lg:grid-cols-2">

          {/* IMAGE */}

          <div className="overflow-hidden rounded-3xl bg-white shadow-xl">

            {resource.thumbnail_url ? (
              <Image
                src={resource.thumbnail_url}
                alt={resource.title}
                width={900}
                height={700}
                className="h-[500px] w-full object-cover"
              />
            ) : (
              <div className="flex h-[500px] items-center justify-center bg-slate-200">
                <p className="text-xl font-semibold text-slate-700">
                  No Thumbnail Available
                </p>
              </div>
            )}

          </div>

          {/* DETAILS */}

          <div className="rounded-3xl bg-white p-8 shadow-xl">

            <div className="flex flex-wrap gap-3">

              <span className="rounded-full bg-blue-100 px-4 py-2 font-bold text-blue-700">
                {resource.grade}
              </span>

              <span className="rounded-full bg-green-100 px-4 py-2 font-bold text-green-700">
                {resource.subject}
              </span>

              {resource.type && (
                <span className="rounded-full bg-purple-100 px-4 py-2 font-bold text-purple-700">
                  {resource.type}
                </span>
              )}

            </div>

            <h2 className="mt-8 text-4xl font-bold text-slate-900">
              {resource.title}
            </h2>

            <p className="mt-6 text-lg leading-8 text-slate-700">
              {resource.description}
            </p>

            {/* INFORMATION */}

            <div className="mt-10 rounded-2xl border border-slate-200 bg-slate-50 p-6">

              {resource.term && (
                <div className="mb-5 flex justify-between border-b border-slate-300 pb-4">

                  <span className="text-lg font-bold text-slate-900">
                    Term
                  </span>

                  <span className="text-lg font-semibold text-slate-800">
                    {resource.term}
                  </span>

                </div>
              )}

              {resource.pathway && (
                <div className="flex justify-between">

                  <span className="text-lg font-bold text-slate-900">
                    Pathway
                  </span>

                  <span className="text-lg font-semibold text-slate-800">
                    {resource.pathway}
                  </span>

                </div>
              )}

            </div>

            {/* PRICE */}

            <div className="mt-10">

              <p className="text-lg font-medium text-slate-600">
                Price
              </p>

              <h3 className="mt-2 text-5xl font-extrabold text-blue-700">
                KSh {resource.price}
              </h3>

            </div>

            {/* BUY BUTTON */}

            <Link
              href={`/checkout/${resource.id}`}
              className="mt-10 flex w-full items-center justify-center rounded-2xl bg-gradient-to-r from-blue-600 to-sky-600 py-5 text-xl font-bold text-white transition duration-300 hover:scale-[1.02] hover:shadow-xl"
            >
              Buy with M-Pesa
            </Link>

            <p className="mt-5 text-center text-base font-medium text-slate-600">
              🔒 Secure payment • Instant download after successful purchase
            </p>

          </div>

        </div>

      </div>

    </main>
  );
}