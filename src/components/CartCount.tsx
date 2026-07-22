"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function CartCount() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    loadCartCount();
  }, []);

  async function loadCartCount() {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      setCount(0);
      return;
    }

    const { count, error } = await supabase
      .from("cart")
      .select("*", {
        count: "exact",
        head: true,
      })
      .eq("user_id", user.id);

    if (error) {
      console.error(error);
      return;
    }

    setCount(count || 0);
  }

  return (
    <span className="absolute -right-5 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-red-600 text-xs font-bold text-white">
      {count}
    </span>
  );
}