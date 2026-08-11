"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

type Purchase = {
  id: string;
  user_id: string;
  resource_id: string;
  phone: string;
  transaction_code: string;
  amount: number;
  status: string;
  created_at: string;
};

type Resource = {
  id: string;
  title: string;
};

export default function PaymentsPage() {
  const [payments, setPayments] = useState<Purchase[]>([]);
  const [resources, setResources] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    setLoading(true);

    // Load purchases
    const { data: purchases, error: purchaseError } = await supabase
      .from("purchases")
      .select("*")
      .order("created_at", { ascending: false });

    if (purchaseError) {
      alert(purchaseError.message);
      setLoading(false);
      return;
    }

    // Load resources
    const { data: resourceData, error: resourceError } = await supabase
      .from("resources")
      .select("id,title");

    if (resourceError) {
      alert(resourceError.message);
      setLoading(false);
      return;
    }

    const map: Record<string, string> = {};

    (resourceData as Resource[]).forEach((resource) => {
      map[resource.id] = resource.title;
    });

    setResources(map);
    setPayments((purchases as Purchase[]) || []);
    setLoading(false);
  }

  async function updateStatus(
    id: string,
    status: "approved" | "rejected"
  ) {
    const { error } = await supabase
      .from("purchases")
      .update({ status })
      .eq("id", id);

    if (error) {
      alert(error.message);
      return;
    }

    loadData();
  }

  if (loading) {
    return (
      <div className="p-8 text-xl">
        Loading payments...
      </div>
    );
  }

  return (
    <div>
      <h1 className="mb-2 text-4xl font-bold">
        Payments
      </h1>

      <p className="mb-8 text-slate-600">
        Review student payments.
      </p>

      <div className="overflow-x-auto rounded-xl bg-white shadow">

        <table className="min-w-full">

          <thead className="bg-slate-100">

            <tr>
              <th className="p-4 text-left">
                Resource
              </th>

              <th className="p-4 text-left">
                Phone
              </th>

              <th className="p-4 text-left">
                Transaction
              </th>

              <th className="p-4 text-left">
                Amount
              </th>

              <th className="p-4 text-left">
                Status
              </th>

              <th className="p-4 text-left">
                Action
              </th>
            </tr>

          </thead>

          <tbody>

            {payments.length === 0 ? (

              <tr>
                <td
                  colSpan={6}
                  className="p-8 text-center text-gray-500"
                >
                  No payments found.
                </td>
              </tr>

            ) : (

              payments.map((payment) => (

                <tr
                  key={payment.id}
                  className="border-t"
                >

                  <td className="p-4">
                    {resources[payment.resource_id] ??
                      "Unknown Resource"}
                  </td>

                  <td className="p-4">
                    {payment.phone}
                  </td>

                  <td className="p-4 font-semibold">
                    {payment.transaction_code}
                  </td>

                  <td className="p-4">
                    KSh {payment.amount}
                  </td>

                  <td className="p-4">
                    <span
                      className={`rounded-full px-3 py-1 text-sm font-semibold ${
                        payment.status === "approved"
                          ? "bg-green-100 text-green-700"
                          : payment.status === "rejected"
                          ? "bg-red-100 text-red-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {payment.status}
                    </span>
                  </td>

                  <td className="p-4">

                    {payment.status === "pending" ? (

                      <div className="flex gap-2">

                        <button
                          onClick={() =>
                            updateStatus(
                              payment.id,
                              "approved"
                            )
                          }
                          className="rounded-lg bg-green-600 px-4 py-2 text-white hover:bg-green-700"
                        >
                          Approve
                        </button>

                        <button
                          onClick={() =>
                            updateStatus(
                              payment.id,
                              "rejected"
                            )
                          }
                          className="rounded-lg bg-red-600 px-4 py-2 text-white hover:bg-red-700"
                        >
                          Reject
                        </button>

                      </div>

                    ) : (

                      <span className="text-slate-500">
                        Completed
                      </span>

                    )}

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