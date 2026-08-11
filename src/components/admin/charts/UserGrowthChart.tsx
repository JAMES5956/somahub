"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

type ChartData = {
  month: string;
  users: number;
};

export default function UserGrowthChart() {
  const [data, setData] = useState<ChartData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadUsers();
  }, []);

  async function loadUsers() {
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    const monthlyUsers = new Array(12).fill(0);

    const { data: users } = await supabase
      .from("profiles")
      .select("created_at");

    for (const user of users || []) {
      const month = new Date(user.created_at).getMonth();
      monthlyUsers[month]++;
    }

    const chart = months.map((month, index) => ({
      month,
      users: monthlyUsers[index],
    }));

    setData(chart);
    setLoading(false);
  }

  if (loading) {
    return (
      <div className="rounded-2xl bg-white p-6 shadow">
        Loading user growth...
      </div>
    );
  }

  return (
    <div className="rounded-2xl bg-white p-6 shadow">

      <h2 className="mb-6 text-2xl font-bold">
        User Growth
      </h2>

      <div className="h-80">

        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>

            <CartesianGrid strokeDasharray="3 3" />

            <XAxis dataKey="month" />

            <YAxis />

            <Tooltip />

            <Line
              type="monotone"
              dataKey="users"
              stroke="#16a34a"
              strokeWidth={3}
            />

          </LineChart>
        </ResponsiveContainer>

      </div>

    </div>
  );
}