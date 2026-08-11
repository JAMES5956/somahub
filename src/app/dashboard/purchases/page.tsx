"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

type Purchase = {
  id: string;
  resource_id: string;
  status: string;
};

type Resource = {
  id: string;
  title: string;
  description: string;
  pdf_url: string;
  thumbnail_url: string | null;
};

export default function MyPurchasesPage() {
  const [loading, setLoading] = useState(true);
  const [purchases, setPurchases] = useState<Purchase[]>([]);
  const [resources, setResources] = useState<Record<string, Resource>>({});

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    setLoading(true);

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      setLoading(false);
      return;
    }

    // Load this user's purchases
    const { data: purchaseData, error: purchaseError } = await supabase
      .from("purchases")
      .select("id, resource_id, status")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false });

    if (purchaseError) {
      alert(purchaseError.message);
      setLoading(false);
      return;
    }

    // Load all resources
    const { data: resourceData, error: resourceError } = await supabase
      .from("resources")
      .select("id,title,description,pdf_url,thumbnail_url");

    if (resourceError) {
      alert(resourceError.message);
      setLoading(false);
      return;
    }

    const map: Record<string, Resource> = {};

    (resourceData || []).forEach((resource: any) => {
      map[resource.id] = resource;
    });

    setResources(map);
    setPurchases((purchaseData as Purchase[]) || []);
    setLoading(false);
  }

  if (loading) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        Loading purchases...
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-100 p-8">
      <div className="mx-auto max-w-5xl">

        <h1 className="text-4xl font-bold">
          My Purchases
        </h1>

        <p className="mt-2 text-slate-600">
          Download your approved learning resources.
        </p>

        {purchases.length === 0 ? (
          <div className="mt-8 rounded-xl bg-white p-8 shadow text-center">
            No purchases yet.
          </div>
        ) : (
          <div className="mt-8 space-y-6">

            {purchases.map((purchase) => {
              const resource = resources[purchase.resource_id];

              if (!resource) return null;

              return (
                <div
                  key={purchase.id}
                  className="rounded-2xl bg-white p-6 shadow"
                >
                  <div className="flex justify-between">

                    <div>

                      <h2 className="text-2xl font-bold">
                        {resource.title}
                      </h2>

                      <p className="mt-2 text-slate-600">
                        {resource.description}
                      </p>

                    </div>

                    <span
                      className={`rounded-full px-4 py-2 h-fit font-semibold ${
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

                  <div className="mt-6">

                    {purchase.status === "approved" ? (
                      <a
                        href={resource.pdf_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700"
                      >
                        Download PDF
                      </a>
                    ) : purchase.status === "pending" ? (
                      <p className="font-medium text-yellow-700">
                        Waiting for admin approval...
                      </p>
                    ) : (
                      <p className="font-medium text-red-700">
                        Payment rejected.
                      </p>
                    )}

                  </div>

                </div>
              );
            })}

          </div>
        )}

      </div>
    </main>
  );
}