"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function PaymentPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const resourceId = searchParams.get("resourceId");
  const amount = searchParams.get("amount");

  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [checkoutRequestId, setCheckoutRequestId] = useState("");

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

  async function pay() {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      router.push("/login");
      return;
    }

    if (!phone) {
      setMessage("Enter your M-Pesa phone number.");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      const response = await fetch("/api/mpesa/stkpush", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          phone,
          amount: Number(amount),
          resourceId,
          userId: user.id,
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        setMessage(data.message || "Payment failed.");
        return;
      }

      setCheckoutRequestId(data.checkoutRequestId);

      setMessage(
        "STK Push sent successfully. Please check your phone and enter your PIN."
      );
    } catch (err) {
      console.error(err);
      setMessage("Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (!checkoutRequestId) return;

    const interval = setInterval(async () => {
      try {
        const response = await fetch(
          `/api/mpesa/query?checkoutRequestId=${checkoutRequestId}`
        );

        const data = await response.json();

        if (!data.success) return;

        if (data.status === "PAID") {
          clearInterval(interval);
          router.push("/payment/success");
        }

        if (data.status === "FAILED") {
          clearInterval(interval);
          setMessage("Payment failed.");
        }
      } catch (err) {
        console.error(err);
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [checkoutRequestId, router]);

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-xl">

        <h1 className="mb-6 text-center text-3xl font-bold">
          Complete Payment
        </h1>

        <div className="mb-6 rounded-xl bg-gray-100 p-4">
          <p className="text-gray-500">Amount</p>

          <h2 className="text-3xl font-bold text-blue-600">
            KSh {amount}
          </h2>
        </div>

        <input
          type="tel"
          placeholder="254712345678"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="mb-5 w-full rounded-xl border p-4"
        />

        <button
          onClick={pay}
          disabled={loading}
          className="w-full rounded-xl bg-green-600 p-4 font-semibold text-white hover:bg-green-700 disabled:opacity-50"
        >
          {loading ? "Sending STK Push..." : "Pay with M-Pesa"}
        </button>

        {message && (
          <div className="mt-5 rounded-xl bg-blue-50 p-4 text-center">
            {message}
          </div>
        )}
      </div>
    </main>
  );
}