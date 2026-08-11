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
  const [price, setPrice] = useState("");
  const [published, setPublished] = useState(false);

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
      alert(error.message);
      router.push("/admin/resources");
      return;
    }

    setTitle(data.title || "");
    setDescription(data.description || "");
    setGrade(data.grade || "");
    setSubject(data.subject || "");
    setPrice(String(data.price || ""));
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
        price: Number(price),
        published,
      })
      .eq("id", id);


    setSaving(false);

    if (error) {
      alert(error.message);
      return;
    }

    alert("Resource updated!");

    router.push("/admin/resources");
  }


  if (loading) {
    return (
      <div className="p-10 text-xl">
        Loading resource...
      </div>
    );
  }


  return (
    <div className="max-w-4xl">

      <h1 className="text-4xl font-bold">
        Edit Resource
      </h1>


      <form
        onSubmit={saveResource}
        className="mt-8 space-y-6 rounded-xl bg-white p-8 shadow"
      >

        <input
          className="w-full rounded-lg border p-3"
          value={title}
          placeholder="Title"
          onChange={(e)=>setTitle(e.target.value)}
        />


        <textarea
          className="w-full rounded-lg border p-3"
          value={description}
          placeholder="Description"
          onChange={(e)=>setDescription(e.target.value)}
        />


        <input
          className="w-full rounded-lg border p-3"
          value={grade}
          placeholder="Grade"
          onChange={(e)=>setGrade(e.target.value)}
        />


        <input
          className="w-full rounded-lg border p-3"
          value={subject}
          placeholder="Subject"
          onChange={(e)=>setSubject(e.target.value)}
        />


        <input
          type="number"
          className="w-full rounded-lg border p-3"
          value={price}
          placeholder="Price"
          onChange={(e)=>setPrice(e.target.value)}
        />


        <label className="flex items-center gap-3">
          <input
            type="checkbox"
            checked={published}
            onChange={(e)=>setPublished(e.target.checked)}
          />

          Published
        </label>


        <button
          disabled={saving}
          className="rounded-lg bg-blue-600 px-6 py-3 text-white"
        >
          {saving ? "Saving..." : "Save Changes"}
        </button>


      </form>

    </div>
  );
}