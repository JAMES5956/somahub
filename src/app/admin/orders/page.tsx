"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function OrdersPage() {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadOrders();
  }, []);

  async function loadOrders() {
    setLoading(true);

    const { data: purchases, error } = await supabase
      .from("purchases")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error(error);
      setLoading(false);
      return;
    }

    const finalOrders = [];

    for (const purchase of purchases || []) {
      // Get student
      const { data: profile } = await supabase
        .from("profiles")
        .select("full_name,email")
        .eq("id", purchase.user_id)
        .single();

      // Get resource
      const { data: resource } = await supabase
        .from("resources")
        .select("title,price")
        .eq("id", purchase.resource_id)
        .single();

      finalOrders.push({
        ...purchase,
        profile,
        resource,
      });
    }

    setOrders(finalOrders);
    setLoading(false);
  }

  if (loading) {
    return <div className="p-8">Loading orders...</div>;
  }

  return (
    <div>
      <h1 className="text-4xl font-bold text-slate-800">
        Orders
      </h1>

      <p className="mt-2 text-slate-600">
        View all customer orders.
      </p>

      <div className="mt-8 overflow-hidden rounded-2xl bg-white shadow">

        <table className="w-full">

          <thead className="bg-slate-100">
            <tr>
              <th className="px-6 py-4 text-left">Student</th>
              <th className="px-6 py-4 text-left">Resource</th>
              <th className="px-6 py-4 text-left">Amount</th>
              <th className="px-6 py-4 text-left">Status</th>
              <th className="px-6 py-4 text-left">Date</th>
            </tr>
          </thead>

          <tbody>

            {orders.length === 0 ? (

              <tr>
                <td
                  colSpan={5}
                  className="py-8 text-center"
                >
                  No orders found.
                </td>
              </tr>

            ) : (

              orders.map((order) => (

                <tr
                  key={order.id}
                  className="border-t"
                >
                  <td className="px-6 py-4">
                    <div className="font-semibold">
                      {order.profile?.full_name ?? "Unknown"}
                    </div>

                    <div className="text-sm text-slate-500">
                      {order.profile?.email}
                    </div>
                  </td>

                  <td className="px-6 py-4">
                    {order.resource?.title}
                  </td>

                  <td className="px-6 py-4">
                    KSh {order.resource?.price}
                  </td>

                  <td className="px-6 py-4">
                    {order.status}
                  </td>

                  <td className="px-6 py-4">
                    {new Date(order.created_at).toLocaleDateString()}
                  </td>

                </tr>

              ))

            )}

          </tbody>

        </table>

      </div>
    </div>
  );
}