"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";

type Resource = {
  id: string;
  title: string;
  subject: string;
  grade: string;
  price: number;
  published: boolean;
  created_at: string;
};

export default function AdminResourcesPage() {
  const [resources, setResources] = useState<Resource[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadResources();
  }, []);

  async function loadResources() {
    setLoading(true);

    const { data, error } = await supabase
      .from("resources")
      .select(
        "id,title,subject,grade,price,published,created_at"
      )
      .order("created_at", { ascending: false });

    if (error) {
      console.error(error);
    } else {
      setResources(data || []);
    }

    setLoading(false);
  }

  async function deleteResource(id: string) {
    const confirmed = confirm(
      "Are you sure you want to delete this resource?"
    );

    if (!confirmed) return;

    const { error } = await supabase
      .from("resources")
      .delete()
      .eq("id", id);

    if (error) {
      alert(error.message);
      return;
    }

    setResources((prev) =>
      prev.filter((resource) => resource.id !== id)
    );
  }

  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold text-slate-800">
            Resources
          </h1>

          <p className="mt-2 text-slate-600">
            Manage all learning resources.
          </p>
        </div>

        <Link
          href="/admin/resources/new"
          className="rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700"
        >
          + Add Resource
        </Link>
      </div>

      <div className="overflow-hidden rounded-2xl bg-white shadow">
        {loading ? (
          <div className="p-10 text-center">
            Loading resources...
          </div>
        ) : resources.length === 0 ? (
          <div className="p-10 text-center">
            No resources found.
          </div>
        ) : (
          <table className="w-full">
            <thead className="bg-slate-100">
              <tr>
                <th className="p-4 text-left">Title</th>
                <th className="p-4 text-left">Subject</th>
                <th className="p-4 text-left">Grade</th>
                <th className="p-4 text-left">Price</th>
                <th className="p-4 text-left">Status</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>

            <tbody>
              {resources.map((resource) => (
                <tr
                  key={resource.id}
                  className="border-t"
                >
                  <td className="p-4 font-medium">
                    {resource.title}
                  </td>

                  <td className="p-4">
                    {resource.subject}
                  </td>

                  <td className="p-4">
                    {resource.grade}
                  </td>

                  <td className="p-4">
                    KSh {resource.price}
                  </td>

                  <td className="p-4">
                    <span
                      className={`rounded-full px-3 py-1 text-sm ${
                        resource.published
                          ? "bg-green-100 text-green-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {resource.published
                        ? "Published"
                        : "Draft"}
                    </span>
                  </td>

                  <td className="p-4 text-right">
                    <div className="flex justify-end gap-3">
                      <Link
                        href={`/admin/resources/edit/${resource.id}`}
                        className="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
                      >
                        Edit
                      </Link>

                      <button
                        onClick={() =>
                          deleteResource(resource.id)
                        }
                        className="rounded-lg bg-red-600 px-4 py-2 text-white hover:bg-red-700"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}