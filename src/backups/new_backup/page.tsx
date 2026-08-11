"use client";

import { FormEvent, useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";

export default function NewResourcePage() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [grade, setGrade] = useState("");
  const [subject, setSubject] = useState("");
  const [pathway, setPathway] = useState("");
  const [term, setTerm] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [status, setStatus] = useState("draft");
  const [thumbnail, setThumbnail] = useState<File | null>(null);
const [pdf, setPdf] = useState<File | null>(null);

const [loading, setLoading] = useState(false);

const router = useRouter();
async function handleSubmit(e: FormEvent<HTMLFormElement>) {
  e.preventDefault();
/*
async function handleSubmit(e: FormEvent<HTMLFormElement>) {
  e.preventDefault();

  if (!thumbnail || !pdf) {
    alert("Please select both a thumbnail and a PDF.");
    return;
  }

  try {
}
*/
  if (!thumbnail || !pdf) {
    alert("Please select both a thumbnail and a PDF.");
    return;
  }

  try {
    setLoading(true);

    // Upload thumbnail
    const thumbnailName = `${Date.now()}-${thumbnail.name}`;

    const { error: thumbError } = await supabase.storage
      .from("thumbnails")
      .upload(thumbnailName, thumbnail);

    if (thumbError) throw thumbError;

    const {
      data: { publicUrl },
    } = supabase.storage
      .from("thumbnails")
      .getPublicUrl(thumbnailName);

    // Upload PDF
 // Upload PDF
const pdfName = `${Date.now()}-${pdf.name}`;

const { error: pdfError } = await supabase.storage
  .from("resources")
  .upload(pdfName, pdf);

if (pdfError) throw pdfError;

// Get PDF URL
const {
  data: { publicUrl: pdfUrl },
} = supabase.storage
  .from("resources")
  .getPublicUrl(pdfName);

// Save resource
const { error: dbError } = await supabase
  .from("resources")
  .insert({
    title,
    description,
    grade,
    subject,
    pathway,
    term,
    type: category,
    price: Number(price),
    featured: false,
    thumbnail_url: publicUrl,
    pdf_url: pdfUrl,
    published: status === "published",
  });

    if (dbError) throw dbError;

    alert("Resource uploaded successfully!");

    router.push("/admin/resources");
  } catch (error: any) {
  console.error(error);

  alert(error?.message || JSON.stringify(error));
}finally {
    setLoading(false);
  }
}
  return (
    <div className="max-w-4xl">
      <h1 className="text-4xl font-bold">Add Resource</h1>

      <p className="mt-2 text-slate-600">
        Create a new learning resource.
      </p>

      <form
  onSubmit={handleSubmit}
  className="mt-8 space-y-6 rounded-xl bg-white p-8 shadow"
>

        <div>
          <label className="mb-2 block font-medium">Title</label>

          <input
            className="w-full rounded-lg border p-3"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div>
          <label className="mb-2 block font-medium">Description</label>

          <textarea
            rows={5}
            className="w-full rounded-lg border p-3"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <div className="grid gap-6 md:grid-cols-2">

          <div>
            <label className="mb-2 block font-medium">Grade</label>

            <select
              className="w-full rounded-lg border p-3"
              value={grade}
              onChange={(e) => setGrade(e.target.value)}
            >
              <option value="">Select Grade</option>

              {Array.from({ length: 12 }, (_, i) => (
                <option key={i} value={`Grade ${i + 1}`}>
                  Grade {i + 1}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="mb-2 block font-medium">Subject</label>

            <input
              className="w-full rounded-lg border p-3"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
            />
          </div>

        </div>

        <div className="grid gap-6 md:grid-cols-2">

          <div>
            <label className="mb-2 block font-medium">Pathway</label>

            <input
              className="w-full rounded-lg border p-3"
              value={pathway}
              onChange={(e) => setPathway(e.target.value)}
              placeholder="Only for Grade 10–12"
            />
          </div>

          <div>
            <label className="mb-2 block font-medium">Term</label>

            <select
              className="w-full rounded-lg border p-3"
              value={term}
              onChange={(e) => setTerm(e.target.value)}
            >
              <option value="">Select Term</option>
              <option>Term 1</option>
              <option>Term 2</option>
              <option>Term 3</option>
            </select>
          </div>

        </div>

        <div className="grid gap-6 md:grid-cols-2">

          <div>
            <label className="mb-2 block font-medium">Category</label>

            <select
              className="w-full rounded-lg border p-3"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="">Select Category</option>
              <option>Notes</option>
              <option>Exams</option>
              <option>CATs</option>
              <option>Holiday Assignment</option>
              <option>Marking Scheme</option>
              <option>Lesson Plan</option>
              <option>Scheme of Work</option>
              <option>Revision Paper</option>
              <option>Past Paper</option>
            </select>
          </div>

          <div>
            <label className="mb-2 block font-medium">Price (KSh)</label>

            <input
              type="number"
              className="w-full rounded-lg border p-3"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>

        </div>

        <div>
          <label className="mb-2 block font-medium">Status</label>

          <select
            className="w-full rounded-lg border p-3"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="draft">Draft</option>
            <option value="published">Published</option>
          </select>
        </div>
<div>
  <label className="mb-2 block font-medium">
    Thumbnail Image
  </label>

  <input
    type="file"
    accept="image/*"
    className="w-full rounded-lg border p-3"
    onChange={(e) =>
      setThumbnail(e.target.files?.[0] ?? null)
    }
  />
</div>

<div>
  <label className="mb-2 block font-medium">
    PDF Resource
  </label>

  <input
    type="file"
    accept=".pdf"
    className="w-full rounded-lg border p-3"
    onChange={(e) =>
      setPdf(e.target.files?.[0] ?? null)
    }
  />
</div>
        <div className="flex justify-end">
          <button
  type="submit"
  disabled={loading}
  className="rounded-lg bg-blue-600 px-6 py-3 font-medium text-white hover:bg-blue-700 disabled:opacity-50"
>
  {loading ? "Uploading..." : "Publish Resource"}
</button>
        </div>

      </form>
    </div>
  );
}