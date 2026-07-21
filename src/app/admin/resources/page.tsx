"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";

export default function ResourcesPage() {
  const [resources, setResources] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadResources();
  }, []);

  async function loadResources() {
    const { data, error } = await supabase
      .from("resources")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error(error);
      alert(error.message);
    } else {
      setResources(data || []);
    }

    setLoading(false);
  }

  async function deleteResource(resource: any) {
    const confirmDelete = confirm(
      "Are you sure you want to delete this resource?"
    );

    if (!confirmDelete) return;

    try {
      // Delete thumbnail from Storage
      if (resource.thumbnail_url) {
        const thumbnailPath = resource.thumbnail_url
          .split("/")
          .pop();

        if (thumbnailPath) {
          await supabase.storage
            .from("thumbnails")
            .remove([thumbnailPath]);
        }
      }

      // Delete PDF from Storage
      if (resource.pdf_url) {
        await supabase.storage
          .from("resources")
          .remove([resource.pdf_url]);
      }

      // Delete database row
      const { error } = await supabase
        .from("resources")
        .delete()
        .eq("id", resource.id);

      if (error) throw error;

      alert("Resource deleted successfully.");

      loadResources();
    } catch (error) {
      console.error(error);
      alert("Failed to delete resource.");
    }
  }

  return (
    <>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold">
            Resources
          </h1>

          <p className="mt-2 text-slate-600">
            Manage all CBC learning materials.
          </p>
        </div>

        <Link
          href="/admin/resources/new"
          className="rounded-lg bg-blue-600 px-5 py-3 text-white hover:bg-blue-700"
        >
          + Upload Resource
        </Link>
      </div>

      <div className="mt-8 overflow-x-auto rounded-xl bg-white shadow">
        <table className="min-w-full">

          <thead className="bg-slate-100">
            <tr>
              <th className="px-6 py-4 text-left">
                Title
              </th>

              <th className="px-6 py-4 text-left">
                Grade
              </th>

              <th className="px-6 py-4 text-left">
                Subject
              </th>

              <th className="px-6 py-4 text-left">
                Price
              </th>

              <th className="px-6 py-4 text-left">
                Status
              </th>

              <th className="px-6 py-4 text-left">
                Actions
              </th>
            </tr>
          </thead>

          <tbody>

            {loading ? (
              <tr>
                <td
                  colSpan={6}
                  className="p-6 text-center"
                >
                  Loading...
                </td>
              </tr>
            ) : resources.length === 0 ? (
              <tr>
                <td
                  colSpan={6}
                  className="p-6 text-center"
                >
                  No resources found.
                </td>
              </tr>
            ) : (
              resources.map((resource) => (
                <tr
                  key={resource.id}
                  className="border-t"
                >
                  <td className="px-6 py-4">
                    {resource.title}
                  </td>

                  <td className="px-6 py-4">
                    {resource.grade}
                  </td>

                  <td className="px-6 py-4">
                    {resource.subject}
                  </td>

                  <td className="px-6 py-4">
                    KSh {resource.price}
                  </td>

                  <td className="px-6 py-4">
                    {resource.published
                      ? "Published"
                      : "Draft"}
                  </td>

                  <td className="space-x-2 px-6 py-4">

                    <Link
                      href={`/admin/resources/edit/${resource.id}`}
                      className="rounded bg-yellow-500 px-3 py-2 text-white hover:bg-yellow-600"
                    >
                      Edit
                    </Link>

                    <button
                      onClick={() =>
                        deleteResource(resource)
                      }
                      className="rounded bg-red-600 px-3 py-2 text-white hover:bg-red-700"
                    >
                      Delete
                    </button>

                  </td>

                </tr>
              ))
            )}

          </tbody>

        </table>
      </div>
    </>
  );
}