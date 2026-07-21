"use client";

import Sidebar from "@/components/admin/Sidebar";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
   <div className="flex min-h-screen bg-slate-100 text-slate-900">
      <Sidebar />

      <main className="flex-1 overflow-auto p-10">
        {children}
      </main>
    </div>
  );
}