"use client";

import Image from "next/image";
import { ShoppingCart, CheckCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

type Resource = {
  id: string;
  title: string;
  description?: string;
  grade: string;
  subject: string;
  price: number;
  thumbnail_url?: string | null;
};

export default function ResourceCard({
  resource,
}: {
  resource: Resource;
}) {
  const [adding, setAdding] = useState(false);
  const [message, setMessage] = useState("");
  const [alreadyPurchased, setAlreadyPurchased] = useState(false);
  const [inCart, setInCart] = useState(false);

  useEffect(() => {
    checkStatus();
  }, []);

  async function checkStatus() {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) return;

    // Check purchase
    const { data: purchase } = await supabase
      .from("purchases")
      .select("id")
      .eq("user_id", user.id)
      .eq("resource_id", resource.id)
      .eq("status", "approved")
      .maybeSingle();

    if (purchase) {
      setAlreadyPurchased(true);
    }

    // Check cart
    const { data: cartItem } = await supabase
      .from("cart")
      .select("id")
      .eq("user_id", user.id)
      .eq("resource_id", resource.id)
      .maybeSingle();

    if (cartItem) {
      setInCart(true);
    }
  }

  async function addToCart() {
    try {
      setAdding(true);
      setMessage("");

      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        setMessage("Please login first.");
        return;
      }

      const { error } = await supabase.from("cart").insert({
        user_id: user.id,
        resource_id: resource.id,
      });

      if (error) throw error;

      setInCart(true);
      setMessage("Resource added to cart.");
    } catch (error: any) {
      setMessage(error.message);
    } finally {
      setAdding(false);
    }
  }

  return (
    <div className="overflow-hidden rounded-2xl bg-white shadow-md transition hover:shadow-xl">
      <div className="relative h-56 w-full">
        <Image
          src={resource.thumbnail_url ?? "/placeholder.png"}
          alt={resource.title}
          fill
          className="object-cover"
        />
      </div>

      <div className="p-5">
        <h2 className="text-xl font-bold">
          {resource.title}
        </h2>

        <p className="mt-2 text-gray-600">
          {resource.subject}
        </p>

        <p className="text-gray-600">
          {resource.grade}
        </p>

        {resource.description && (
          <p className="mt-3 text-sm text-gray-500">
            {resource.description}
          </p>
        )}

        <p className="mt-4 text-2xl font-bold text-blue-600">
          KSh {resource.price}
        </p>

        {alreadyPurchased && (
          <div className="mt-4 rounded-lg border border-yellow-300 bg-yellow-50 p-3">
            <div className="flex items-start gap-2">
              <CheckCircle className="mt-0.5 h-5 w-5 text-yellow-700" />

              <div>
                <p className="font-semibold text-yellow-800">
                  You have already purchased this resource.
                </p>

                <p className="mt-1 text-sm text-yellow-700">
                  You can download it from <strong>My Purchases</strong>.
                  You can still purchase it again if you wish.
                </p>
              </div>
            </div>
          </div>
        )}

        <button
          onClick={addToCart}
          disabled={adding || inCart}
          className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 py-3 font-semibold text-white hover:bg-blue-700 disabled:opacity-50"
        >
          <ShoppingCart className="h-5 w-5" />

          {adding
            ? "Adding..."
            : inCart
            ? "Already in Cart"
            : "Add to Cart"}
        </button>

        {message && (
          <p className="mt-3 text-center text-sm text-green-600">
            {message}
          </p>
        )}
      </div>
    </div>
  );
}