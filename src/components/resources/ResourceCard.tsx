"use client";

import Link from "next/link";
import Image from "next/image";
import {
  BookOpen,
  Eye,
  ShoppingCart,
} from "lucide-react";

interface ResourceCardProps {
  resource: any;
}

export default function ResourceCard({
  resource,
}: ResourceCardProps) {
  return (
    <div className="overflow-hidden rounded-3xl bg-white shadow-md transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl">

      {/* Thumbnail */}

      <div className="relative h-56 bg-gray-100">

        {resource.thumbnail_url ? (
          <Image
            src={resource.thumbnail_url}
            alt={resource.title}
            fill
            className="object-cover"
          />
        ) : (
          <div className="flex h-full items-center justify-center bg-gradient-to-br from-blue-600 to-sky-500">
            <BookOpen className="h-20 w-20 text-white" />
          </div>
        )}

      </div>

      {/* Content */}

      <div className="p-6">

        <div className="flex flex-wrap gap-2">

          <span className="rounded-full bg-blue-100 px-3 py-1 text-sm font-semibold text-blue-700">
            {resource.grade}
          </span>

          <span className="rounded-full bg-green-100 px-3 py-1 text-sm font-semibold text-green-700">
            {resource.type}
          </span>

        </div>

        <h2 className="mt-4 text-xl font-bold">
          {resource.title}
        </h2>

        <p className="mt-3 line-clamp-3 text-gray-600">
          {resource.description}
        </p>

        <div className="mt-5 space-y-2 text-sm text-gray-600">

          <p>
            <strong>Subject:</strong> {resource.subject}
          </p>

          {resource.term && (
            <p>
              <strong>Term:</strong> {resource.term}
            </p>
          )}

          {resource.pathway && (
            <p>
              <strong>Pathway:</strong> {resource.pathway}
            </p>
          )}

        </div>

        <div className="mt-6 flex items-center justify-between">

          <span className="text-3xl font-bold text-blue-600">
            KSh {resource.price}
          </span>

          <span
            className={`rounded-full px-3 py-1 text-sm font-semibold ${
              resource.published
                ? "bg-green-100 text-green-700"
                : "bg-yellow-100 text-yellow-700"
            }`}
          >
            {resource.published ? "Published" : "Draft"}
          </span>

        </div>

        <div className="mt-8 grid grid-cols-2 gap-4">

          <Link
            href={`/resources/${resource.id}`}
            className="flex items-center justify-center gap-2 rounded-xl border border-blue-600 py-3 font-semibold text-blue-600 hover:bg-blue-50"
          >
            <Eye className="h-5 w-5" />
            Details
          </Link>

          <button className="flex items-center justify-center gap-2 rounded-xl bg-blue-600 py-3 font-semibold text-white hover:bg-blue-700">
            <ShoppingCart className="h-5 w-5" />
            Buy
          </button>

        </div>

      </div>

    </div>
  );
}