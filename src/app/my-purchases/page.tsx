"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { Download } from "lucide-react";

type Purchase = {
  id: string;
  resource_id: string;
  status: string;
  created_at: string;
  resources: {
    title: string;
    subject: string;
    grade: string;
    pdf_url: string;
  };
};

export default function MyPurchasesPage() {
  const [purchases, setPurchases] = useState<Purchase[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadPurchases();
  }, []);

  async function loadPurchases() {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      setLoading(false);
      return;
    }

    const { data, error } = await supabase
      .from("purchases")
      .select(`
        id,
        resource_id,
        status,
        created_at,
        resources (
          title,
          subject,
          grade,
          pdf_url
        )
      `)
      .eq("user_id", user.id)
      .eq("status", "approved")
      .order("created_at", {
        ascending: false,
      });

    if (error) {
      console.error(error);
    } else {
      setPurchases(
  (data || []).map((item: any) => ({
    id: item.id,
    resource_id: item.resource_id,
    status: item.status,
    created_at: item.created_at,
    resources: Array.isArray(item.resources)
      ? item.resources[0] || {
          title: "Unknown",
          subject: "Unknown",
          grade: "Unknown",
          pdf_url: "",
        }
      : item.resources || {
          title: "Unknown",
          subject: "Unknown",
          grade: "Unknown",
          pdf_url: "",
        },
  }))
);
    }

    setLoading(false);
  }

  if (loading) {
    return (
      <div className="p-10 text-xl">
        Loading purchases...
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gray-100 px-6 py-10">
      <div className="mx-auto max-w-5xl">

        <h1 className="text-4xl font-bold">
          My Purchases
        </h1>

        <p className="mt-2 text-gray-600">
          Access all your purchased learning resources.
        </p>

        {purchases.length === 0 ? (

          <div className="mt-8 rounded-xl bg-white p-8 text-center shadow">
            No purchases yet.
          </div>

        ) : (

          <div className="mt-8 grid gap-6 md:grid-cols-2">

            {purchases.map((purchase) => (

              <div
                key={purchase.id}
                className="rounded-xl bg-white p-6 shadow"
              >

                <h2 className="text-xl font-bold">
                  {purchase.resources.title}
                </h2>

                <p className="mt-2 text-gray-600">
                  {purchase.resources.subject}
                </p>

                <p className="text-gray-600">
                  {purchase.resources.grade}
                </p>

                <a
                  href={purchase.resources.pdf_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-green-600 py-3 text-white hover:bg-green-700"
                >
                  <Download className="h-5 w-5" />
                  Download PDF
                </a>

              </div>

            ))}

          </div>

        )}

      </div>
    </main>
  );
}