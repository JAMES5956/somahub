"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function SalesPage() {
  const [loading, setLoading] = useState(true);
  const [revenue, setRevenue] = useState(0);
  const [sales, setSales] = useState(0);
  const [customers, setCustomers] = useState(0);

  useEffect(() => {
    loadSales();
  }, []);

  async function loadSales() {
    setLoading(true);

    // Approved purchases
    const { data: purchases, error } = await supabase
      .from("purchases")
      .select("user_id, resource_id")
      .eq("status", "approved");

    if (error) {
      console.error(error);
      setLoading(false);
      return;
    }

    let totalRevenue = 0;

    for (const purchase of purchases || []) {
      const { data: resource } = await supabase
        .from("resources")
        .select("price")
        .eq("id", purchase.resource_id)
        .single();

      totalRevenue += resource?.price || 0;
    }

    const uniqueCustomers = [
      ...new Set((purchases || []).map((p) => p.user_id)),
    ];

    setRevenue(totalRevenue);
    setSales((purchases || []).length);
    setCustomers(uniqueCustomers.length);

    setLoading(false);
  }

  if (loading) {
    return (
      <div className="p-8 text-xl">
        Loading sales...
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-4xl font-bold text-slate-800">
        Sales Dashboard
      </h1>

      <p className="mt-2 text-slate-600">
        Monitor your marketplace performance.
      </p>

      <div className="mt-8 grid gap-6 md:grid-cols-3">

        <div className="rounded-2xl bg-green-600 p-6 text-white shadow">
          <p className="text-sm opacity-80">
            Total Revenue
          </p>

          <h2 className="mt-2 text-4xl font-bold">
            KSh {revenue.toLocaleString()}
          </h2>
        </div>

        <div className="rounded-2xl bg-blue-600 p-6 text-white shadow">
          <p className="text-sm opacity-80">
            Resources Sold
          </p>

          <h2 className="mt-2 text-4xl font-bold">
            {sales}
          </h2>
        </div>

        <div className="rounded-2xl bg-purple-600 p-6 text-white shadow">
          <p className="text-sm opacity-80">
            Customers
          </p>

          <h2 className="mt-2 text-4xl font-bold">
            {customers}
          </h2>
        </div>

      </div>
    </div>
  );
}