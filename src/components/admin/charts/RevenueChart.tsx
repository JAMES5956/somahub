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
  revenue: number;
};

export default function RevenueChart() {
  const [data, setData] = useState<ChartData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadRevenue();
  }, []);

  async function loadRevenue() {
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

    const revenueByMonth = new Array(12).fill(0);

    const { data: purchases } = await supabase
      .from("purchases")
      .select("created_at, resource_id")
      .eq("status", "approved");

    for (const purchase of purchases || []) {
      const { data: resource } = await supabase
        .from("resources")
        .select("price")
        .eq("id", purchase.resource_id)
        .single();

      if (!resource) continue;

      const month = new Date(purchase.created_at).getMonth();

      revenueByMonth[month] += Number(resource.price);
    }

    const chart = months.map((month, index) => ({
      month,
      revenue: revenueByMonth[index],
    }));

    setData(chart);
    setLoading(false);
  }

  if (loading) {
    return (
      <div className="rounded-2xl bg-white p-6 shadow">
        Loading revenue...
      </div>
    );
  }

  return (
    <div className="rounded-2xl bg-white p-6 shadow">

      <h2 className="mb-6 text-2xl font-bold">
        Revenue Overview
      </h2>

      <div className="h-80">

        <ResponsiveContainer width="100%" height="100%">

          <LineChart data={data}>

            <CartesianGrid strokeDasharray="3 3" />

            <XAxis dataKey="month" />

            <YAxis />

            <Tooltip
              formatter={(value) => [
                `KSh ${Number(value).toLocaleString()}`,
                "Revenue",
              ]}
            />

            <Line
              type="monotone"
              dataKey="revenue"
              stroke="#2563eb"
              strokeWidth={3}
            />

          </LineChart>

        </ResponsiveContainer>

      </div>

    </div>
  );
}