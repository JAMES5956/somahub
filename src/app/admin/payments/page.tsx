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
  const [updating, setUpdating] = useState<string | null>(null);

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    setLoading(true);

    const { data: purchases, error: purchaseError } = await supabase
      .from("purchases")
      .select("*")
      .order("created_at", { ascending: false });

    if (purchaseError) {
      alert(purchaseError.message);
      setLoading(false);
      return;
    }

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
    setUpdating(id);

    const { data, error } = await supabase
      .from("purchases")
      .update({ status })
      .eq("id", id)
      .select("id,status");

    console.log("UPDATE RESULT:", { data, error });

    if (error) {
      alert("Update failed: " + error.message);
      setUpdating(null);
      return;
    }

    if (!data || data.length === 0) {
      alert("No purchase was updated.");
      setUpdating(null);
      return;
    }

    // Update the payment immediately on the screen
    setPayments((currentPayments) =>
      currentPayments.map((payment) =>
        payment.id === id
          ? { ...payment, status }
          : payment
      )
    );

    setUpdating(null);
  }

  function StatusBadge({ status }: { status: string }) {
    return (
      <span
        className={`inline-block rounded-full px-3 py-1 text-sm font-semibold ${
          status === "approved"
            ? "bg-green-100 text-green-700"
            : status === "rejected"
            ? "bg-red-100 text-red-700"
            : "bg-yellow-100 text-yellow-700"
        }`}
      >
        {status}
      </span>
    );
  }

  function ActionButtons({ payment }: { payment: Purchase }) {
    if (payment.status !== "pending") {
      return (
        <span className="text-sm font-medium text-slate-500">
          Completed
        </span>
      );
    }

    const isUpdating = updating === payment.id;

    return (
      <div className="flex w-full gap-3 sm:w-auto">
        <button
          type="button"
          disabled={isUpdating}
          onClick={() => updateStatus(payment.id, "approved")}
          className="flex-1 rounded-lg bg-green-600 px-4 py-3 font-semibold text-white transition hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-50 sm:flex-none"
        >
          {isUpdating ? "Updating..." : "Approve"}
        </button>

        <button
          type="button"
          disabled={isUpdating}
          onClick={() => updateStatus(payment.id, "rejected")}
          className="flex-1 rounded-lg bg-red-600 px-4 py-3 font-semibold text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-50 sm:flex-none"
        >
          Reject
        </button>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="p-6 text-xl sm:p-8">
        Loading payments...
      </div>
    );
  }

  return (
    <div className="w-full">
      <h1 className="mb-2 text-3xl font-bold sm:text-4xl">
        Payments
      </h1>

      <p className="mb-6 text-slate-600 sm:mb-8">
        Review student payments.
      </p>

      {payments.length === 0 ? (
        <div className="rounded-xl bg-white p-8 text-center text-gray-500 shadow">
          No payments found.
        </div>
      ) : (
        <>
          {/* MOBILE PAYMENT CARDS */}
          <div className="space-y-4 lg:hidden">
            {payments.map((payment) => (
              <div
                key={payment.id}
                className="rounded-xl bg-white p-5 shadow"
              >
                <div className="mb-4 flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <p className="text-xs font-medium uppercase text-slate-500">
                      Resource
                    </p>

                    <h2 className="mt-1 break-words text-lg font-bold text-slate-900">
                      {resources[payment.resource_id] ??
                        "Unknown Resource"}
                    </h2>
                  </div>

                  <StatusBadge status={payment.status} />
                </div>

                <div className="space-y-3 border-t pt-4">
                  <div>
                    <p className="text-xs font-medium uppercase text-slate-500">
                      Phone
                    </p>
                    <p className="font-medium">
                      {payment.phone}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs font-medium uppercase text-slate-500">
                      Transaction Code
                    </p>
                    <p className="break-all font-bold">
                      {payment.transaction_code}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs font-medium uppercase text-slate-500">
                      Amount
                    </p>
                    <p className="text-xl font-bold text-blue-600">
                      KSh {payment.amount}
                    </p>
                  </div>

                  <div className="border-t pt-4">
                    <p className="mb-3 text-xs font-medium uppercase text-slate-500">
                      Action
                    </p>

                    <ActionButtons payment={payment} />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* DESKTOP TABLE */}
          <div className="hidden overflow-x-auto rounded-xl bg-white shadow lg:block">
            <table className="min-w-full">
              <thead className="bg-slate-100">
                <tr>
                  <th className="p-4 text-left">Resource</th>
                  <th className="p-4 text-left">Phone</th>
                  <th className="p-4 text-left">Transaction</th>
                  <th className="p-4 text-left">Amount</th>
                  <th className="p-4 text-left">Status</th>
                  <th className="p-4 text-left">Action</th>
                </tr>
              </thead>

              <tbody>
                {payments.map((payment) => (
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
                      <StatusBadge status={payment.status} />
                    </td>

                    <td className="p-4">
                      <ActionButtons payment={payment} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
}
