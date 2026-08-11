"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

type Insight = {
  bestResource: string;
  bestSubject: string;
  bestGrade: string;
  averageOrder: number;
  downloads: number;
  activeStudents: number;
};

export default function MarketplaceInsights() {
  const [loading, setLoading] = useState(true);

  const [insight, setInsight] = useState<Insight>({
    bestResource: "-",
    bestSubject: "-",
    bestGrade: "-",
    averageOrder: 0,
    downloads: 0,
    activeStudents: 0,
  });

  useEffect(() => {
    loadInsights();
  }, []);

  async function loadInsights() {
    const { data: resources } = await supabase
      .from("resources")
      .select("id,title,subject,grade,price");

    const { data: purchases } = await supabase
      .from("purchases")
      .select("resource_id,user_id,status")
      .eq("status", "approved");

    const resourceSales: Record<string, number> = {};
    const subjectSales: Record<string, number> = {};
    const gradeSales: Record<string, number> = {};

    let totalRevenue = 0;

    const students = new Set<string>();

    resources?.forEach((resource) => {
      resourceSales[resource.id] = 0;
    });

    purchases?.forEach((purchase) => {
      students.add(purchase.user_id);

      const resource = resources?.find(
        (r) => r.id === purchase.resource_id
      );

      if (!resource) return;

      resourceSales[resource.id]++;

      subjectSales[resource.subject] =
        (subjectSales[resource.subject] || 0) + 1;

      gradeSales[resource.grade] =
        (gradeSales[resource.grade] || 0) + 1;

      totalRevenue += Number(resource.price);
    });

    const bestResourceId = Object.keys(resourceSales).sort(
      (a, b) => resourceSales[b] - resourceSales[a]
    )[0];

    const bestResource =
      resources?.find((r) => r.id === bestResourceId)?.title || "-";

    const bestSubject =
      Object.keys(subjectSales).sort(
        (a, b) => subjectSales[b] - subjectSales[a]
      )[0] || "-";

    const bestGrade =
      Object.keys(gradeSales).sort(
        (a, b) => gradeSales[b] - gradeSales[a]
      )[0] || "-";

    setInsight({
      bestResource,
      bestSubject,
      bestGrade,
      averageOrder:
        purchases?.length
          ? totalRevenue / purchases.length
          : 0,
      downloads: purchases?.length || 0,
      activeStudents: students.size,
    });

    setLoading(false);
  }

  if (loading) {
    return (
      <div className="rounded-2xl bg-white p-6 shadow">
        Loading insights...
      </div>
    );
  }

  return (
    <div className="rounded-2xl bg-white p-6 shadow">

      <h2 className="mb-8 text-2xl font-bold">
        Marketplace Insights
      </h2>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">

        <Card
          title="🏆 Best Selling Resource"
          value={insight.bestResource}
        />

        <Card
          title="📚 Best Selling Subject"
          value={insight.bestSubject}
        />

        <Card
          title="🎓 Best Selling Grade"
          value={insight.bestGrade}
        />

        <Card
          title="💰 Average Order"
          value={`KSh ${insight.averageOrder.toFixed(0)}`}
        />

        <Card
          title="📥 Total Downloads"
          value={insight.downloads.toString()}
        />

        <Card
          title="👥 Active Students"
          value={insight.activeStudents.toString()}
        />

      </div>

    </div>
  );
}

function Card({
  title,
  value,
}: {
  title: string;
  value: string;
}) {
  return (
    <div className="rounded-xl border p-5">

      <p className="text-gray-500">
        {title}
      </p>

      <h3 className="mt-2 text-xl font-bold">
        {value}
      </h3>

    </div>
  );
}