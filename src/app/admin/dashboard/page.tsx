"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import RevenueChart from "@/components/admin/charts/RevenueChart";
import SalesBySubjectChart from "@/components/admin/charts/SalesBySubjectChart";
import UserGrowthChart from "@/components/admin/charts/UserGrowthChart";
import RevenueSummary from "@/components/admin/cards/RevenueSummary";
import ActivityFeed from "@/components/admin/activity/ActivityFeed";
import MarketplaceInsights from "@/components/admin/insights/MarketplaceInsights";

type TopResource = {
  id: string;
  title: string;
  sales: number;
};

type RecentPurchase = {
  id: string;
  status: string;
  created_at: string;
  resources: {
    title: string;
    price: number;
  } | null;
};

export default function DashboardPage() {
  const [loading, setLoading] = useState(true);

  const [stats, setStats] = useState({
    resources: 0,
    users: 0,
    purchases: 0,
    pending: 0,
    approved: 0,
    revenue: 0,
  });

  const [topResources, setTopResources] = useState<TopResource[]>([]);
  const [recentPurchases, setRecentPurchases] = useState<RecentPurchase[]>([]);

  useEffect(() => {
    loadDashboard();
  }, []);

  async function loadDashboard() {
    setLoading(true);

    const [
      resourcesResult,
      usersResult,
      purchasesResult,
      pendingResult,
      approvedResult,
    ] = await Promise.all([
      supabase.from("resources").select("*", {
        count: "exact",
        head: true,
      }),

      supabase.from("profiles").select("*", {
        count: "exact",
        head: true,
      }),

      supabase.from("purchases").select("*", {
        count: "exact",
        head: true,
      }),

      supabase
        .from("purchases")
        .select("*", {
          count: "exact",
          head: true,
        })
        .eq("status", "pending"),

      supabase
        .from("purchases")
        .select("*", {
          count: "exact",
          head: true,
        })
        .eq("status", "approved"),
    ]);

    let revenue = 0;

    const { data: approvedPurchases } = await supabase
      .from("purchases")
      .select("resource_id")
      .eq("status", "approved");

    for (const purchase of approvedPurchases || []) {
      const { data: resource } = await supabase
        .from("resources")
        .select("price")
        .eq("id", purchase.resource_id)
        .single();

      revenue += resource?.price || 0;
    }

    setStats({
      resources: resourcesResult.count || 0,
      users: usersResult.count || 0,
      purchases: purchasesResult.count || 0,
      pending: pendingResult.count || 0,
      approved: approvedResult.count || 0,
      revenue,
    });

    const { data: resourceList } = await supabase
      .from("resources")
      .select("id,title");

    const ranking: TopResource[] = [];

    for (const resource of resourceList || []) {
      const { count } = await supabase
        .from("purchases")
        .select("*", {
          count: "exact",
          head: true,
        })
        .eq("resource_id", resource.id)
        .eq("status", "approved");

      ranking.push({
        id: resource.id,
        title: resource.title,
        sales: count || 0,
      });
    }

    ranking.sort((a, b) => b.sales - a.sales);

    setTopResources(ranking.slice(0, 5));

    const { data: recent } = await supabase
      .from("purchases")
      .select(`
        id,
        status,
        created_at,
        resources (
          title,
          price
        )
      `)
      .order("created_at", {
        ascending: false,
      })
      .limit(5);

    setRecentPurchases((recent || []).map((item: any) => ({
  id: item.id,
  status: item.status,
  created_at: item.created_at,
  resources: Array.isArray(item.resources)
    ? item.resources[0] || { title: "Unknown", price: 0 }
    : item.resources || { title: "Unknown", price: 0 },
})));

    setLoading(false);
  }

  if (loading) {
    return (
      <div className="p-10 text-xl">
        Loading dashboard...
      </div>
    );
  }
    return (
    <div>
      <h1 className="text-4xl font-bold">
        Admin Dashboard
        <div className="mt-8">
  <RevenueSummary />
</div>
      </h1>

      <p className="mt-2 text-gray-600">
        Welcome to SomaHub Administration.
      </p>

      {/* Statistics Cards */}
      <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">

        <div className="rounded-2xl bg-white p-6 shadow">
          <p className="text-gray-500">Resources</p>
          <h2 className="mt-2 text-4xl font-bold">
            {stats.resources}
          </h2>
        </div>

        <div className="rounded-2xl bg-white p-6 shadow">
          <p className="text-gray-500">Users</p>
          <h2 className="mt-2 text-4xl font-bold">
            {stats.users}
          </h2>
        </div>

        <div className="rounded-2xl bg-white p-6 shadow">
          <p className="text-gray-500">Purchases</p>
          <h2 className="mt-2 text-4xl font-bold">
            {stats.purchases}
          </h2>
        </div>

        <div className="rounded-2xl bg-white p-6 shadow">
          <p className="text-gray-500">Pending Payments</p>
          <h2 className="mt-2 text-4xl font-bold text-yellow-600">
            {stats.pending}
          </h2>
        </div>

        <div className="rounded-2xl bg-white p-6 shadow">
          <p className="text-gray-500">Approved Purchases</p>
          <h2 className="mt-2 text-4xl font-bold text-green-600">
            {stats.approved}
          </h2>
        </div>

        <div className="rounded-2xl bg-green-600 p-6 text-white shadow">
          <p>Total Revenue</p>
          <h2 className="mt-2 text-4xl font-bold">
            KSh {stats.revenue.toLocaleString()}
          </h2>
        </div>

      </div>

      {/* Two-column layout */}
      <div className="mt-10 grid gap-8 xl:grid-cols-2">

        {/* Top Selling Resources */}
        <div className="rounded-2xl bg-white p-6 shadow">

          <h2 className="text-2xl font-bold">
            🏆 Top Selling Resources
          </h2>

          {topResources.length === 0 ? (

            <p className="mt-6 text-gray-500">
              No sales yet.
            </p>

          ) : (

            <div className="mt-6 space-y-4">

              {topResources.map((resource, index) => (

                <div
                  key={resource.id}
                  className="flex items-center justify-between border-b pb-3"
                >

                  <div className="flex items-center gap-4">

                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 font-bold text-blue-700">
                      {index + 1}
                    </div>

                    <div>
                      <p className="font-semibold">
                        {resource.title}
                      </p>

                      <p className="text-sm text-gray-500">
                        {resource.sales} Sales
                      </p>
                    </div>

                  </div>

                </div>

              ))}

            </div>

          )}

        </div>

        {/* Recent Purchases */}
        <div className="rounded-2xl bg-white p-6 shadow">

          <h2 className="text-2xl font-bold">
            📦 Recent Purchases
          </h2>

          {recentPurchases.length === 0 ? (

            <p className="mt-6 text-gray-500">
              No purchases yet.
            </p>

          ) : (

            <div className="mt-6 space-y-4">

              {recentPurchases.map((purchase) => (

                <div
                  key={purchase.id}
                  className="flex items-center justify-between border-b pb-3"
                >

                  <div>

                    <p className="font-semibold">
                      {purchase.resources?.title ?? "Unknown Resource"}
                    </p>

                    <p className="text-sm text-gray-500">
                      KSh {purchase.resources?.price ?? 0}
                    </p>

                  </div>

                  <span
                    className={`rounded-full px-3 py-1 text-sm font-semibold ${
                      purchase.status === "approved"
                        ? "bg-green-100 text-green-700"
                        : purchase.status === "pending"
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {purchase.status}
                  </span>

                </div>

              ))}

            </div>

          )}

        </div>

      </div>
      <div className="mt-8">
  <RevenueSummary />
</div>
      <div className="mt-8">
  <RevenueChart />
</div>
<div className="mt-8">
  <SalesBySubjectChart />
</div>
<div className="mt-8">
  <UserGrowthChart />
</div>
<div className="mt-8">
  <ActivityFeed />
</div>
<div className="mt-8">
  <MarketplaceInsights />
</div>

    </div>
  );
}