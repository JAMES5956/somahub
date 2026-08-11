"use client";

import { Suspense, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { supabase } from "@/lib/supabase";

function PaymentContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const resourceId = searchParams.get("resourceId");
  const amount = searchParams.get("amount");

  const [phone, setPhone] = useState("");
  const [transactionId, setTransactionId] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    async function checkUser() {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        router.push("/login");
      }
    }

    checkUser();
  }, [router]);

  async function submitPayment() {
    if (!phone.trim()) {
      setMessage("Please enter your M-Pesa phone number.");
      return;
    }

    if (!transactionId.trim()) {
      setMessage("Please enter your M-Pesa transaction ID.");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        router.push("/login");
        return;
      }

      const { error } = await supabase.from("purchases").insert({
        user_id: user.id,
        resource_id: resourceId,
        payment_id: transactionId.trim(),
        status: "pending",
      });

      if (error) {
        console.error(error);
        setMessage(error.message);
        return;
      }

      setMessage(
        "Payment submitted successfully. Your payment is awaiting verification."
      );

      setTimeout(() => {
        router.push("/my-purchases");
      }, 2000);
    } catch (error) {
      console.error(error);
      setMessage("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-100 px-4 py-10">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-xl">

        <h1 className="text-center text-3xl font-bold text-gray-900">
          Complete Payment
        </h1>

        <p className="mt-2 text-center text-gray-500">
          Pay using M-Pesa and submit your transaction details.
        </p>

        <div className="mt-6 rounded-xl bg-blue-50 p-5">
          <p className="text-sm text-gray-500">
            Amount to pay
          </p>

          <p className="mt-1 text-3xl font-bold text-blue-600">
            KSh {amount || "0"}
          </p>
        </div>

        <div className="mt-6 rounded-xl border border-gray-200 p-5">
          <p className="font-semibold text-gray-900">
            M-Pesa Payment
          </p>

          <p className="mt-2 text-sm text-gray-600">
            Send the exact amount to the SomaHub M-Pesa Till number shown
            during checkout.
          </p>

          <p className="mt-3 text-sm text-gray-600">
            After paying, enter your M-Pesa phone number and transaction ID
            below.
          </p>
        </div>

        <div className="mt-6 space-y-4">

          <input
            type="tel"
            placeholder="M-Pesa phone number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full rounded-xl border border-gray-300 p-4 outline-none focus:border-blue-600"
          />

          <input
            type="text"
            placeholder="M-Pesa transaction ID"
            value={transactionId}
            onChange={(e) => setTransactionId(e.target.value)}
            className="w-full rounded-xl border border-gray-300 p-4 uppercase outline-none focus:border-blue-600"
          />

          <button
            type="button"
            onClick={submitPayment}
            disabled={loading}
            className="w-full rounded-xl bg-green-600 p-4 font-semibold text-white hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading ? "Submitting..." : "Submit Payment"}
          </button>

          {message && (
            <div className="rounded-xl bg-blue-50 p-4 text-center text-sm text-gray-700">
              {message}
            </div>
          )}

        </div>

        <button
          type="button"
          onClick={() => router.back()}
          className="mt-5 w-full text-sm font-medium text-gray-500 hover:text-blue-600"
        >
          Go Back
        </button>

      </div>
    </main>
  );
}

export default function PaymentPage() {
  return (
    <Suspense
      fallback={
        <main className="flex min-h-screen items-center justify-center bg-gray-100">
          <p className="text-gray-600">Loading payment...</p>
        </main>
      }
    >
      <PaymentContent />
    </Suspense>
  );
}
