"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import { ArrowLeft, ShieldCheck, Smartphone } from "lucide-react";
import { supabase } from "@/lib/supabase";

export default function CheckoutPage() {
  const { id } = useParams();
  const router = useRouter();

  const [resource, setResource] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const [phone, setPhone] = useState("2547");
  const [paying, setPaying] = useState(false);

  useEffect(() => {
    loadResource();
  }, []);

  async function loadResource() {
    const { data } = await supabase
      .from("resources")
      .select("*")
      .eq("id", id)
      .single();

    setResource(data);
    setLoading(false);
  }

  async function payNow() {
    if (!phone.startsWith("254")) {
      alert("Phone number must start with 254.");
      return;
    }

    setPaying(true);

    try {
      const response = await fetch("/api/mpesa/stkpush", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          phone,
          amount: resource.price,
        }),
      });

      const data = await response.json();

      console.log(data);

      if (
        data.ResponseCode === "0" ||
        data.responseCode === "0"
      ) {
        alert(
          "STK Push sent successfully.\nCheck your phone."
        );
      } else {
        alert(
          data.errorMessage ||
            data.ResponseDescription ||
            "Failed to send STK Push."
        );
      }
    } catch (error) {
      console.error(error);
      alert("Something went wrong.");
    }

    setPaying(false);
  }

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center">
        <h1 className="text-3xl font-bold">
          Loading Checkout...
        </h1>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-100">

      <div className="bg-gradient-to-r from-blue-700 to-sky-600 py-10">

        <div className="mx-auto flex max-w-6xl items-center justify-between px-6">

          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 text-white"
          >
            <ArrowLeft />
            Back
          </button>

          <h1 className="text-4xl font-bold text-white">
            Checkout
          </h1>

        </div>

      </div>

      <div className="mx-auto mt-10 grid max-w-6xl gap-10 px-6 lg:grid-cols-2">

        {/* LEFT */}

        <div className="rounded-3xl bg-white p-8 shadow-lg">

          <Image
            src={resource.thumbnail_url}
            alt={resource.title}
            width={700}
            height={500}
            className="rounded-2xl"
          />

          <h2 className="mt-6 text-3xl font-bold text-slate-900">
            {resource.title}
          </h2>

          <p className="mt-5 text-slate-700">
            {resource.description}
          </p>

        </div>

        {/* RIGHT */}

        <div className="rounded-3xl bg-white p-8 shadow-lg">

          <h2 className="text-2xl font-bold text-slate-900">
            Order Summary
          </h2>

          <div className="mt-8 space-y-5">

            <div className="flex justify-between">
              <span>Resource</span>
              <span>{resource.title}</span>
            </div>

            <div className="flex justify-between">
              <span>Grade</span>
              <span>{resource.grade}</span>
            </div>

            <div className="flex justify-between">
              <span>Subject</span>
              <span>{resource.subject}</span>
            </div>

            <div className="border-t pt-5">

              <div className="flex justify-between">

                <span className="text-xl font-bold">
                  Total
                </span>

                <span className="text-3xl font-bold text-blue-600">
                  KSh {resource.price}
                </span>

              </div>

            </div>

          </div>

          <div className="mt-8">

            <label className="mb-2 block font-semibold text-slate-900">
              M-Pesa Phone Number
            </label>

            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="254712345678"
              className="w-full rounded-xl border p-4 text-lg"
            />

          </div>

          <button
            onClick={payNow}
            disabled={paying}
            className="mt-8 flex w-full items-center justify-center gap-3 rounded-2xl bg-green-600 py-5 text-xl font-bold text-white hover:bg-green-700"
          >
            <Smartphone />

            {paying
              ? "Sending..."
              : "Pay with M-Pesa"}

          </button>

          <div className="mt-8 flex items-center gap-3 rounded-xl bg-green-50 p-5">

            <ShieldCheck className="text-green-600" />

            <p className="text-green-800">
              Secure payment powered by M-Pesa.
            </p>

          </div>

        </div>

      </div>

    </main>
  );
}