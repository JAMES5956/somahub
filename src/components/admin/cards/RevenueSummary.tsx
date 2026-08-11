"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function RevenueSummary() {
  const [summary, setSummary] = useState({
    today: 0,
    week: 0,
    month: 0,
    year: 0,
  });

  useEffect(() => {
    loadRevenueSummary();
  }, []);

  async function loadRevenueSummary() {
    const { data: purchases } = await supabase
      .from("purchases")
      .select("created_at, resource_id")
      .eq("status", "approved");

    let today = 0;
    let week = 0;
    let month = 0;
    let year = 0;

    const now = new Date();

    for (const purchase of purchases || []) {
      const { data: resource } = await supabase
        .from("resources")
        .select("price")
        .eq("id", purchase.resource_id)
        .single();

      if (!resource) continue;

      const price = Number(resource.price);
      const purchaseDate = new Date(purchase.created_at);

      const diffDays =
        (now.getTime() - purchaseDate.getTime()) /
        (1000 * 60 * 60 * 24);

      if (purchaseDate.toDateString() === now.toDateString()) {
        today += price;
      }

      if (diffDays <= 7) {
        week += price;
      }

      if (
        purchaseDate.getMonth() === now.getMonth() &&
        purchaseDate.getFullYear() === now.getFullYear()
      ) {
        month += price;
      }

      if (purchaseDate.getFullYear() === now.getFullYear()) {
        year += price;
      }
    }

    setSummary({
      today,
      week,
      month,
      year,
    });
  }

  const cards = [
    {
      title: "Today's Revenue",
      value: summary.today,
    },
    {
      title: "This Week",
      value: summary.week,
    },
    {
      title: "This Month",
      value: summary.month,
    },
    {
      title: "This Year",
      value: summary.year,
    },
  ];

  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">

      {cards.map((card) => (
        <div
          key={card.title}
          className="rounded-2xl bg-white p-6 shadow"
        >
          <p className="text-gray-500">
            {card.title}
          </p>

          <h2 className="mt-2 text-3xl font-bold text-green-600">
            KSh {card.value.toLocaleString()}
          </h2>
        </div>
      ))}

    </div>
  );
}