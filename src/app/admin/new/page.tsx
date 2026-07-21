"use client";

import { useState } from "react";

export default function NewResourcePage() {
  const [featured, setFeatured] = useState(false);

  return (
    <main className="min-h-screen bg-gray-100">

      {/* Header */}

      <div className="border-b bg-white">

        <div className="mx-auto max-w-5xl px-6 py-8">

          <h1 className="text-4xl font-bold text-gray-900">
            Upload New Resource
          </h1>

          <p className="mt-2 text-gray-600">
            Fill in the details below to publish a new CBC learning resource.
          </p>

        </div>

      </div>

      {/* Form */}

      <div className="mx-auto max-w-5xl px-6 py-10">

        <form className="space-y-8 rounded-3xl bg-white p-8 shadow">

          {/* Title */}

          <div>
            <label className="mb-2 block font-semibold text-gray-700">
              Resource Title
            </label>

            <input
              type="text"
              placeholder="Grade 8 Mathematics Term 2 Exams"
              className="w-full rounded-xl border border-gray-300 p-4 focus:border-blue-600 focus:outline-none"
            />
          </div>

          {/* Description */}

          <div>
            <label className="mb-2 block font-semibold text-gray-700">
              Description
            </label>

            <textarea
              rows={5}
              placeholder="Describe this resource..."
              className="w-full rounded-xl border border-gray-300 p-4 focus:border-blue-600 focus:outline-none"
            />
          </div>

          {/* Grade & Subject */}

          <div className="grid gap-6 md:grid-cols-2">

            <div>
              <label className="mb-2 block font-semibold text-gray-700">
                Grade
              </label>

              <select className="w-full rounded-xl border border-gray-300 p-4">

                <option>Grade 1</option>
                <option>Grade 2</option>
                <option>Grade 3</option>
                <option>Grade 4</option>
                <option>Grade 5</option>
                <option>Grade 6</option>
                <option>Grade 7</option>
                <option>Grade 8</option>
                <option>Grade 9</option>
                <option>Grade 10</option>
                <option>Grade 11</option>
                <option>Grade 12</option>

              </select>
            </div>

            <div>
              <label className="mb-2 block font-semibold text-gray-700">
                Subject
              </label>

              <input
                type="text"
                placeholder="Mathematics"
                className="w-full rounded-xl border border-gray-300 p-4"
              />
            </div>

          </div>

          {/* Type & Price */}

          <div className="grid gap-6 md:grid-cols-2">

            <div>
              <label className="mb-2 block font-semibold text-gray-700">
                Resource Type
              </label>

              <select className="w-full rounded-xl border border-gray-300 p-4">

                <option>Notes</option>
                <option>Exams</option>
                <option>CAT</option>
                <option>Revision Paper</option>
                <option>Holiday Assignment</option>
                <option>Marking Scheme</option>

              </select>
            </div>

            <div>
              <label className="mb-2 block font-semibold text-gray-700">
                Price (KSh)
              </label>

              <input
                type="number"
                placeholder="150"
                className="w-full rounded-xl border border-gray-300 p-4"
              />
            </div>

          </div>

          {/* Thumbnail */}

          <div>
            <label className="mb-2 block font-semibold text-gray-700">
              Thumbnail Image
            </label>

            <input
              type="file"
              accept="image/*"
              className="w-full rounded-xl border border-gray-300 p-4"
            />
          </div>

          {/* PDF */}

          <div>
            <label className="mb-2 block font-semibold text-gray-700">
              PDF File
            </label>

            <input
              type="file"
              accept=".pdf"
              className="w-full rounded-xl border border-gray-300 p-4"
            />
          </div>

          {/* Featured */}

          <div className="flex items-center gap-3">

            <input
              id="featured"
              type="checkbox"
              checked={featured}
              onChange={(e) => setFeatured(e.target.checked)}
            />

            <label
              htmlFor="featured"
              className="font-semibold text-gray-700"
            >
              Feature this resource on the homepage
            </label>

          </div>

          {/* Buttons */}

          <div className="flex gap-4">

            <button
              type="submit"
              className="rounded-xl bg-blue-600 px-8 py-4 font-semibold text-white transition hover:bg-blue-700"
            >
              Publish Resource
            </button>

            <button
              type="reset"
              className="rounded-xl border border-gray-300 px-8 py-4 font-semibold text-gray-700"
            >
              Reset
            </button>

          </div>

        </form>

      </div>

    </main>
  );
}