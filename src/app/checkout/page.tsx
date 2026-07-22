"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import { CreditCard } from "lucide-react";

type CartItem = {
  id: string;
  resources: {
    title: string;
    price: number;
  };
};

export default function CheckoutPage() {
  const [items, setItems] = useState<CartItem[]>([]);
  const [phone, setPhone] = useState("");
  const [transactionCode, setTransactionCode] = useState("");
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    loadCart();
  }, []);

  async function loadCart() {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      setLoading(false);
      return;
    }

    const { data, error } = await supabase
      .from("cart")
      .select(`
        id,
        resources (
          title,
          price
        )
      `)
      .eq("user_id", user.id);

    if (!error && data) {
      setItems(data as CartItem[]);
    }

    setLoading(false);
  }

  const total = items.reduce(
    (sum, item) => sum + Number(item.resources.price),
    0
  );

  async function submitPayment() {
    if (!phone || !transactionCode) {
      alert("Please enter your phone number and transaction code.");
      return;
    }

    try {
      setSubmitting(true);

      const {
  data: { session },
} = await supabase.auth.getSession();

const response = await fetch("/api/orders/create", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${session?.access_token}`,
  },
  body: JSON.stringify({
    phone,
    transactionCode,
    amount: total,
  }),
});

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error);
      }

      alert(
        "Payment submitted successfully. Your payment is awaiting verification."
      );

      setPhone("");
      setTransactionCode("");

    } catch (error: any) {
      alert(error.message);
    } finally {
      setSubmitting(false);
    }
  }

  if (loading) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        Loading...
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-100 py-10 px-6">
      <div className="mx-auto max-w-3xl rounded-2xl bg-white p-8 shadow">

        <div className="mb-8 flex items-center gap-3">
          <CreditCard className="h-10 w-10 text-green-600" />
          <h1 className="text-4xl font-bold">
            Checkout
          </h1>
        </div>

        <div className="rounded-xl bg-blue-50 p-6">

          <h2 className="text-xl font-bold">
            Pay via M-Pesa
          </h2>

          <div className="mt-5 space-y-2">

            <p>
              <strong>Business Name:</strong>
              <br />
              DONLINK VIRTUAL SOLUTIONS
            </p>

            <p>
              <strong>Till Number:</strong>
              <br />
              5004045
            </p>

            <p>
              <strong>Total Amount:</strong>
              <br />
              KSh {total}
            </p>

          </div>

        </div>

        <div className="mt-8 rounded-xl border p-5">

          <h3 className="font-bold text-lg">
            Payment Instructions
          </h3>

          <ol className="mt-3 list-decimal pl-5 space-y-2 text-gray-700">
            <li>Open M-Pesa.</li>
            <li>Select Lipa na M-Pesa.</li>
            <li>Select Buy Goods and Services.</li>
            <li>Enter Till Number <strong>5004045</strong>.</li>
            <li>Pay the exact amount shown above.</li>
            <li>Complete the payment.</li>
            <li>Enter your phone number and M-Pesa transaction code below.</li>
          </ol>

        </div>

        <div className="mt-8 space-y-5">

          <input
            type="text"
            placeholder="Phone Number (07XXXXXXXX)"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full rounded-xl border p-4"
          />

          <input
            type="text"
            placeholder="M-Pesa Transaction Code"
            value={transactionCode}
            onChange={(e) => setTransactionCode(e.target.value.toUpperCase())}
            className="w-full rounded-xl border p-4 uppercase"
          />

          <button
            onClick={submitPayment}
            disabled={submitting}
            className="w-full rounded-xl bg-green-600 py-4 text-lg font-bold text-white hover:bg-green-700 disabled:opacity-50"
          >
            {submitting ? "Submitting..." : "Submit Payment"}
          </button>

        </div>

        <Link
          href="/cart"
          className="mt-6 block text-center text-blue-600"
        >
          Back to Cart
        </Link>

      </div>
    </main>
  );
}