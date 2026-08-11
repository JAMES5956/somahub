"use client";

import { FormEvent, useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";

export default function NewResourcePage() {
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [grade, setGrade] = useState("");
  const [subject, setSubject] = useState("");
  const [pathway, setPathway] = useState("");
  const [term, setTerm] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");

  const [thumbnail, setThumbnail] = useState<File | null>(null);
  const [pdf, setPdf] = useState<File | null>(null);

  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();

    if (!thumbnail || !pdf) {
      alert("Please select both thumbnail and PDF.");
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

      const { data: thumbData } = supabase.storage
        .from("thumbnails")
        .getPublicUrl(thumbnailName);


      // Upload PDF
      const pdfName = `${Date.now()}-${pdf.name}`;

      const { error: pdfError } = await supabase.storage
        .from("resources")
        .upload(pdfName, pdf);

      if (pdfError) throw pdfError;

      const { data: pdfData } = supabase.storage
        .from("resources")
        .getPublicUrl(pdfName);


      // Save database record
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
          thumbnail_url: thumbData.publicUrl,
          pdf_url: pdfData.publicUrl,
          published: true,
        });

      if (dbError) throw dbError;


      alert("Resource uploaded successfully!");

      router.push("/admin/resources");

    } catch (error: any) {
      console.error(error);
      alert(error.message);
    } finally {
      setLoading(false);
    }
  }


  return (
    <div className="max-w-4xl">

      <h1 className="text-4xl font-bold">
        Add Resource
      </h1>

      <form
        onSubmit={handleSubmit}
        className="mt-8 space-y-6 rounded-xl bg-white p-8 shadow"
      >

        <input
          className="w-full rounded-lg border p-3"
          placeholder="Title"
          value={title}
          onChange={(e)=>setTitle(e.target.value)}
        />

        <textarea
          className="w-full rounded-lg border p-3"
          placeholder="Description"
          value={description}
          onChange={(e)=>setDescription(e.target.value)}
        />

        <input
          className="w-full rounded-lg border p-3"
          placeholder="Grade"
          value={grade}
          onChange={(e)=>setGrade(e.target.value)}
        />

        <input
          className="w-full rounded-lg border p-3"
          placeholder="Subject"
          value={subject}
          onChange={(e)=>setSubject(e.target.value)}
        />

        <input
          className="w-full rounded-lg border p-3"
          placeholder="Pathway (optional)"
          value={pathway}
          onChange={(e)=>setPathway(e.target.value)}
        />

        <input
          className="w-full rounded-lg border p-3"
          placeholder="Term"
          value={term}
          onChange={(e)=>setTerm(e.target.value)}
        />

        <input
          className="w-full rounded-lg border p-3"
          placeholder="Category"
          value={category}
          onChange={(e)=>setCategory(e.target.value)}
        />

        <input
          type="number"
          className="w-full rounded-lg border p-3"
          placeholder="Price KSh"
          value={price}
          onChange={(e)=>setPrice(e.target.value)}
        />


        <div>
          <label className="block mb-2 font-medium">
            Thumbnail
          </label>

          <input
            type="file"
            accept="image/*"
            onChange={(e)=>
              setThumbnail(e.target.files?.[0] || null)
            }
          />
        </div>


        <div>
          <label className="block mb-2 font-medium">
            PDF File
          </label>

          <input
            type="file"
            accept=".pdf"
            onChange={(e)=>
              setPdf(e.target.files?.[0] || null)
            }
          />
        </div>


        <button
          disabled={loading}
          className="rounded-lg bg-blue-600 px-6 py-3 text-white"
        >
          {loading ? "Uploading..." : "Upload Resource"}
        </button>

      </form>

    </div>
  );
}