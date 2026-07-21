"use client";

import Link from "next/link";
import {
  BookOpen,
  FilePlus2,
  Users,
  ShoppingCart,
} from "lucide-react";

export default function AdminDashboard() {
  return (
    <main className="min-h-screen bg-gray-100">

      <header className="bg-blue-700 text-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">

          <div>
            <h1 className="text-3xl font-bold">
              SomaHub Admin
            </h1>

            <p className="text-blue-100">
              Manage your learning platform
            </p>
          </div>

          <Link
            href="/"
            className="rounded-xl bg-white px-5 py-3 font-semibold text-blue-700"
          >
            Home
          </Link>

        </div>
      </header>

      <div className="mx-auto max-w-7xl px-6 py-10">

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">

          <div className="rounded-3xl bg-white p-8 shadow">
            <BookOpen className="mb-4 h-10 w-10 text-blue-600" />
            <h2 className="text-2xl font-bold">Resources</h2>
            <p className="mt-2 text-gray-600">Manage all study materials.</p>
          </div>

          <div className="rounded-3xl bg-white p-8 shadow">
            <Users className="mb-4 h-10 w-10 text-green-600" />
            <h2 className="text-2xl font-bold">Users</h2>
            <p className="mt-2 text-gray-600">View registered users.</p>
          </div>

          <div className="rounded-3xl bg-white p-8 shadow">
            <ShoppingCart className="mb-4 h-10 w-10 text-amber-500" />
            <h2 className="text-2xl font-bold">Orders</h2>
            <p className="mt-2 text-gray-600">Track purchases.</p>
          </div>

          <Link
            href="/admin/resources/new"
            className="rounded-3xl bg-blue-600 p-8 text-white shadow transition hover:bg-blue-700"
          >
            <FilePlus2 className="mb-4 h-10 w-10" />

            <h2 className="text-2xl font-bold">
              Upload Resource
            </h2>

            <p className="mt-2 text-blue-100">
              Add a new learning resource.
            </p>
          </Link>

        </div>

      </div>

    </main>
  );
}