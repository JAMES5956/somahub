"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

type ChartData = {
  subject: string;
  sales: number;
};

export default function SalesBySubjectChart() {
  const [data, setData] = useState<ChartData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadSales();
  }, []);

  async function loadSales() {
    const { data: resources } = await supabase
      .from("resources")
      .select("id, subject");

    const salesMap: Record<string, number> = {};

    for (const resource of resources || []) {
      const { count } = await supabase
        .from("purchases")
        .select("*", {
          count: "exact",
          head: true,
        })
        .eq("resource_id", resource.id)
        .eq("status", "approved");

      salesMap[resource.subject] =
        (salesMap[resource.subject] || 0) + (count || 0);
    }

    const chartData = Object.entries(salesMap).map(
      ([subject, sales]) => ({
        subject,
        sales,
      })
    );

    chartData.sort((a, b) => b.sales - a.sales);

    setData(chartData);
    setLoading(false);
  }

  if (loading) {
    return (
      <div className="rounded-2xl bg-white p-6 shadow">
        Loading subject sales...
      </div>
    );
  }

  return (
    <div className="rounded-2xl bg-white p-6 shadow">

      <h2 className="mb-6 text-2xl font-bold">
        Sales by Subject
      </h2>

      <div className="h-80">

        <ResponsiveContainer width="100%" height="100%">

          <BarChart data={data}>

            <CartesianGrid strokeDasharray="3 3" />

            <XAxis dataKey="subject" />

            <YAxis />

            <Tooltip />

            <Bar
              dataKey="sales"
              fill="#2563eb"
              radius={[6, 6, 0, 0]}
            />

          </BarChart>

        </ResponsiveContainer>

      </div>

    </div>
  );
}