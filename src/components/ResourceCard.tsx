"use client";

import Image from "next/image";
import { ShoppingCart } from "lucide-react";
import { useState } from "react";
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

  async function addToCart() {
    try {
      setAdding(true);
      setMessage("");

      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        setMessage("Please login first");
        return;
      }

      const { error } = await supabase
        .from("cart")
        .insert({
          user_id: user.id,
          resource_id: resource.id,
        });

      if (error) {
        throw error;
      }

      setMessage("Resource added to cart");

    } catch (error: any) {
      setMessage(error.message);
    } finally {
      setAdding(false);
    }
  }


  return (
    <div className="overflow-hidden rounded-2xl bg-white shadow-md hover:shadow-xl transition">

      <div className="relative h-56 w-full">

        <Image
          src={resource?.thumbnail_url ?? "/placeholder.png"}
          alt={resource?.title ?? "Learning Resource"}
          fill
          className="object-cover"
        />

      </div>


      <div className="p-5">

        <h2 className="text-xl font-bold text-gray-900">
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


        <div className="mt-5 flex items-center justify-between">

          <p className="text-2xl font-bold text-blue-600">
            KSh {resource.price}
          </p>


          <button
            onClick={addToCart}
            disabled={adding}
            className="flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-3 text-white font-semibold hover:bg-blue-700 disabled:opacity-50"
          >

            <ShoppingCart className="h-5 w-5" />

            {adding ? "Adding..." : "Add to Cart"}

          </button>

        </div>


        {message && (
          <p className="mt-4 text-center text-sm font-medium text-green-600">
            {message}
          </p>
        )}

      </div>

    </div>
  );
}