"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import {
  ShoppingCart,
  UserPlus,
  CheckCircle,
} from "lucide-react";

type Activity = {
  id: string;
  title: string;
  description: string;
  icon: "purchase" | "user" | "approval";
  date: string;
};

export default function ActivityFeed() {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadActivities();
  }, []);

  async function loadActivities() {
    const activityList: Activity[] = [];

    // Latest Purchases
    const { data: purchases } = await supabase
      .from("purchases")
      .select(`
        id,
        created_at,
        status,
        profiles(full_name),
        resources(title)
      `)
      .order("created_at", { ascending: false })
      .limit(5);

    purchases?.forEach((purchase: any) => {
      activityList.push({
        id: purchase.id,
        title: "Purchase",
        description: `${purchase.profiles?.full_name ?? "Student"} purchased ${purchase.resources?.title ?? "a resource"}`,
        icon: "purchase",
        date: purchase.created_at,
      });
    });

    // Latest Users
    const { data: users } = await supabase
      .from("profiles")
      .select("id, full_name, created_at")
      .order("created_at", { ascending: false })
      .limit(5);

    users?.forEach((user: any) => {
      activityList.push({
        id: user.id,
        title: "New User",
        description: `${user.full_name} joined SomaHub`,
        icon: "user",
        date: user.created_at,
      });
    });

    activityList.sort(
      (a, b) =>
        new Date(b.date).getTime() -
        new Date(a.date).getTime()
    );

    setActivities(activityList.slice(0, 10));
    setLoading(false);
  }

  if (loading) {
    return (
      <div className="rounded-2xl bg-white p-6 shadow">
        Loading activity...
      </div>
    );
  }

  return (
    <div className="rounded-2xl bg-white p-6 shadow">

      <h2 className="mb-6 text-2xl font-bold">
        Recent Activity
      </h2>

      <div className="space-y-4">

        {activities.map((activity) => (
          <div
            key={activity.id}
            className="flex items-center gap-4 rounded-xl border p-4"
          >
            <div>
              {activity.icon === "purchase" && (
                <ShoppingCart className="text-blue-600" />
              )}

              {activity.icon === "user" && (
                <UserPlus className="text-green-600" />
              )}

              {activity.icon === "approval" && (
                <CheckCircle className="text-emerald-600" />
              )}
            </div>

            <div className="flex-1">
              <p className="font-semibold">
                {activity.title}
              </p>

              <p className="text-sm text-gray-600">
                {activity.description}
              </p>
            </div>

            <div className="text-xs text-gray-400">
              {new Date(activity.date).toLocaleDateString()}
            </div>

          </div>
        ))}

      </div>

    </div>
  );
}