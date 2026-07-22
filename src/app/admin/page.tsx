"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import {
  BookOpen,
  Users,
  CreditCard,
  Download,
  Plus,
} from "lucide-react";

export default function AdminDashboard() {
  return (
    <main className="min-h-screen bg-slate-100">
      <div className="mx-auto max-w-7xl p-8">
        {/* Header */}
        <div className="mb-10 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-4xl font-bold text-slate-900">
              SomaHub Admin
            </h1>

            <p className="mt-2 text-slate-600">
              Welcome back! Manage your CBE learning platform.
            </p>
          </div>

          <Link
            href="/admin/resources/new"
            className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white transition hover:bg-blue-700"
          >
            <Plus className="h-5 w-5" />
            Upload Resource
          </Link>
        </div>

        {/* Statistics */}
        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
          <StatCard
            title="Resources"
            value="0"
            icon={<BookOpen className="h-7 w-7" />}
          />

          <StatCard
            title="Users"
            value="0"
            icon={<Users className="h-7 w-7" />}
          />

          <StatCard
            title="Revenue"
            value="KSh 0"
            icon={<CreditCard className="h-7 w-7" />}
          />

          <StatCard
            title="Downloads"
            value="0"
            icon={<Download className="h-7 w-7" />}
          />
        </div>

        {/* Content */}
        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          <section className="rounded-3xl bg-white p-8 shadow">
            <h2 className="mb-6 text-2xl font-bold">
              Quick Actions
            </h2>

            <div className="grid gap-4">
              <Link
                href="/admin/resources"
                className="rounded-xl border p-4 transition hover:bg-slate-50"
              >
                📚 Manage Resources
              </Link>

              <Link
                href="/admin/resources/new"
                className="rounded-xl border p-4 transition hover:bg-slate-50"
              >
                ⬆️ Upload Resource
              </Link>

              <Link
                href="/admin/payments"
                className="rounded-xl border p-4 transition hover:bg-slate-50"
              >
                💰 View Payments
              </Link>

              <Link
                href="/admin/users"
                className="rounded-xl border p-4 transition hover:bg-slate-50"
              >
                👥 Manage Users
              </Link>
            </div>
          </section>

          <section className="rounded-3xl bg-white p-8 shadow">
            <h2 className="mb-6 text-2xl font-bold">
              Recent Activity
            </h2>

            <div className="flex h-64 items-center justify-center rounded-2xl border-2 border-dashed border-slate-200 text-slate-500">
              No recent activity yet.
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}

type StatCardProps = {
  title: string;
  value: string;
  icon: ReactNode;
};

function StatCard({
  title,
  value,
  icon,
}: StatCardProps) {
  return (
    <div className="rounded-3xl bg-white p-6 shadow transition hover:shadow-lg">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-slate-500">
            {title}
          </p>

          <h3 className="mt-2 text-3xl font-bold">
            {value}
          </h3>
        </div>

        <div className="rounded-full bg-blue-100 p-4 text-blue-600">
          {icon}
        </div>
      </div>
    </div>
  );
}