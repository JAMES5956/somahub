"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function EditResourcePage() {
  const { id } = useParams();
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [grade, setGrade] = useState("");
  const [subject, setSubject] = useState("");
  const [pathway, setPathway] = useState("");
  const [term, setTerm] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [published, setPublished] = useState(false);

  useEffect(() => {
    loadResource();
  }, []);

  async function loadResource() {
    const { data, error } = await supabase
      .from("resources")
      .select("*")
      .eq("id", id)
      .single();

    if (error) {
      alert(error.message);
      router.push("/admin/resources");
      return;
    }

    setTitle(data.title ?? "");
    setDescription(data.description ?? "");
    setGrade(data.grade ?? "");
    setSubject(data.subject ?? "");
    setPathway(data.pathway ?? "");
    setTerm(data.term ?? "");
    setCategory(data.type ?? "");
    setPrice(String(data.price ?? ""));
    setPublished(data.published);

    setLoading(false);
  }

  async function saveResource(e: React.FormEvent) {
    e.preventDefault();

    setSaving(true);

    const { error } = await supabase
      .from("resources")
      .update({
        title,
        description,
        grade,
        subject,
        pathway,
        term,
        type: category,
        price: Number(price),
        published,
      })
      .eq("id", id);

    setSaving(false);

    if (error) {
      alert(error.message);
      return;
    }

    alert("Resource updated successfully!");

    router.push("/admin/resources");
  }

  if (loading) {
    return (
      <div className="p-10 text-xl font-semibold">
        Loading resource...
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl">

      <h1 className="text-4xl font-bold">
        Edit Resource
      </h1>

      <form
        onSubmit={saveResource}
        className="mt-8 space-y-6 rounded-xl bg-white p-8 shadow"
      >

        <div>
          <label className="mb-2 block font-medium">
            Title
          </label>

          <input
            className="w-full rounded-lg border p-3"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div>
          <label className="mb-2 block font-medium">
            Description
          </label>

          <textarea
            rows={5}
            className="w-full rounded-lg border p-3"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <div className="grid gap-6 md:grid-cols-2">

          <div>
            <label className="mb-2 block font-medium">
              Grade
            </label>

            <input
              className="w-full rounded-lg border p-3"
              value={grade}
              onChange={(e) => setGrade(e.target.value)}
            />
          </div>

          <div>
            <label className="mb-2 block font-medium">
              Subject
            </label>

            <input
              className="w-full rounded-lg border p-3"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
            />
          </div>

        </div>

        <div className="grid gap-6 md:grid-cols-2">

          <div>
            <label className="mb-2 block font-medium">
              Pathway
            </label>

            <input
              className="w-full rounded-lg border p-3"
              value={pathway}
              onChange={(e) => setPathway(e.target.value)}
            />
          </div>

          <div>
            <label className="mb-2 block font-medium">
              Term
            </label>

            <input
              className="w-full rounded-lg border p-3"
              value={term}
              onChange={(e) => setTerm(e.target.value)}
            />
          </div>

        </div>

        <div className="grid gap-6 md:grid-cols-2">

          <div>
            <label className="mb-2 block font-medium">
              Category
            </label>

            <input
              className="w-full rounded-lg border p-3"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            />
          </div>

          <div>
            <label className="mb-2 block font-medium">
              Price
            </label>

            <input
              type="number"
              className="w-full rounded-lg border p-3"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>

        </div>

        <div className="flex items-center gap-3">

          <input
            type="checkbox"
            checked={published}
            onChange={(e) => setPublished(e.target.checked)}
          />

          <span>Published</span>

        </div>

        <button
          disabled={saving}
          className="rounded-lg bg-blue-600 px-6 py-3 text-white hover:bg-blue-700"
        >
          {saving ? "Saving..." : "Save Changes"}
        </button>

      </form>

    </div>
  );
}