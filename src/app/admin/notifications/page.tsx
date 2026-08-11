"use client";

import { Bell } from "lucide-react";

export default function NotificationsPage() {
  return (
    <div>
      <h1 className="text-4xl font-bold text-slate-800">
        Notifications
      </h1>

      <p className="mt-2 text-slate-600">
        Recent activity in your marketplace.
      </p>

      <div className="mt-8 rounded-2xl bg-white p-8 shadow">

        <div className="flex items-center gap-3 border-b py-4">
          <Bell className="h-5 w-5 text-blue-600" />
          <p>Welcome to SomaHub Admin Panel.</p>
        </div>

        <div className="flex items-center gap-3 border-b py-4">
          <Bell className="h-5 w-5 text-green-600" />
          <p>Payments approved will appear here.</p>
        </div>

        <div className="flex items-center gap-3 py-4">
          <Bell className="h-5 w-5 text-yellow-600" />
          <p>New student registrations will appear here.</p>
        </div>

      </div>
    </div>
  );
}