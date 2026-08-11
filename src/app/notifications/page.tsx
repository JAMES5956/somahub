"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/context/AuthContext";

type Notification = {
  id: string;
  title: string;
  message: string;
  type: string;
  read: boolean;
  created_at: string;
};

export default function NotificationsPage() {
  const { user } = useAuth();

  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      loadNotifications();
    }
  }, [user]);

  async function loadNotifications() {
    const { data, error } = await supabase
      .from("notifications")
      .select("*")
      .eq("user_id", user?.id)
      .order("created_at", { ascending: false });

    if (!error) {
      setNotifications(data || []);
    }

    setLoading(false);
  }

  async function markAsRead(id: string) {
    await supabase
      .from("notifications")
      .update({ read: true })
      .eq("id", id);

    setNotifications((prev) =>
      prev.map((notification) =>
        notification.id === id
          ? { ...notification, read: true }
          : notification
      )
    );
  }

  if (loading) {
    return (
      <div className="p-10 text-xl">
        Loading notifications...
      </div>
    );
  }

  return (
    <main className="mx-auto max-w-4xl p-8">
      <h1 className="text-4xl font-bold">
        Notifications
      </h1>

      {notifications.length === 0 ? (
        <div className="mt-8 rounded-xl bg-white p-8 shadow">
          <p className="text-gray-500">
            You have no notifications.
          </p>
        </div>
      ) : (
        <div className="mt-8 space-y-4">
          {notifications.map((notification) => (
            <div
              key={notification.id}
              className={`rounded-xl border p-6 shadow ${
                notification.read
                  ? "bg-white"
                  : "border-blue-500 bg-blue-50"
              }`}
            >
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold">
                  {notification.title}
                </h2>

                {!notification.read && (
                  <button
                    onClick={() => markAsRead(notification.id)}
                    className="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
                  >
                    Mark as Read
                  </button>
                )}
              </div>

              <p className="mt-3 text-gray-700">
                {notification.message}
              </p>

              <p className="mt-3 text-sm text-gray-500">
                {new Date(notification.created_at).toLocaleString()}
              </p>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}