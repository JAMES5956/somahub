"use client";

import Link from "next/link";
import { Search, Bell, UserCircle } from "lucide-react";

export default function Topbar() {
  return (
    <header className="flex h-20 items-center justify-between border-b bg-white px-8">

      <div>
        <h1 className="text-2xl font-bold text-slate-800">
          Welcome, Admin 👋
        </h1>

        <p className="text-sm text-slate-500">
          Manage your SomaHub marketplace
        </p>
      </div>

      <div className="flex items-center gap-4">

        <div className="flex items-center gap-2 rounded-xl border px-4 py-2">
          <Search className="h-5 w-5 text-slate-400" />
          <input
            type="text"
            placeholder="Search..."
            className="outline-none"
          />
        </div>

        <Link
          href="/admin/notifications"
          className="rounded-xl border p-3 hover:bg-slate-100"
        >
          <Bell className="h-5 w-5" />
        </Link>

        <Link
          href="/admin/profile"
          className="rounded-xl border p-3 hover:bg-slate-100"
        >
          <UserCircle className="h-6 w-6" />
        </Link>

      </div>

    </header>
  );
}