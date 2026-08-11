"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { Star } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

type Review = {
  id: string;
  rating: number;
  review: string;
  created_at: string;
  profiles: {
    full_name: string;
  } | null;
};

export default function ReviewSection({
  resourceId,
}: {
  resourceId: string;
}) {
  const { user } = useAuth();

  const [reviews, setReviews] = useState<Review[]>([]);
  const [rating, setRating] = useState(5);
  const [review, setReview] = useState("");
  const [canReview, setCanReview] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadReviews();

    if (user) {
      checkPurchase();
    }
  }, [user]);

  async function checkPurchase() {
    const { data } = await supabase
      .from("purchases")
      .select("id")
      .eq("user_id", user?.id)
      .eq("resource_id", resourceId)
      .eq("status", "approved")
      .maybeSingle();

    setCanReview(!!data);
  }

  async function loadReviews() {
    const { data } = await supabase
      .from("reviews")
      .select(`
        *,
        profiles(full_name)
      `)
      .eq("resource_id", resourceId)
      .order("created_at", {
        ascending: false,
      });

    setReviews((data as Review[]) || []);
    setLoading(false);
  }

  async function submitReview() {
    if (!user) return;

    const { error } = await supabase
      .from("reviews")
      .upsert({
        user_id: user.id,
        resource_id: resourceId,
        rating,
        review,
      });

    if (error) {
      alert(error.message);
      return;
    }

    setReview("");
    setRating(5);

    loadReviews();
  }

  const average =
    reviews.length === 0
      ? 0
      : reviews.reduce((a, b) => a + b.rating, 0) /
        reviews.length;

  return (
    <div className="mt-12 rounded-2xl bg-white p-8 shadow">

      <h2 className="text-3xl font-bold">
        Reviews
      </h2>

      <div className="mt-4 flex items-center gap-3">

        <span className="text-4xl font-bold">
          {average.toFixed(1)}
        </span>

        <div className="flex">
          {[1,2,3,4,5].map((star)=>(
            <Star
              key={star}
              className={`h-6 w-6 ${
                star <= Math.round(average)
                  ? "fill-yellow-400 text-yellow-400"
                  : "text-gray-300"
              }`}
            />
          ))}
        </div>

        <span className="text-gray-500">
          ({reviews.length} Reviews)
        </span>

      </div>

      {canReview && (

        <div className="mt-8 space-y-4">

          <select
            value={rating}
            onChange={(e)=>setRating(Number(e.target.value))}
            className="rounded-lg border p-3"
          >
            <option value={5}>★★★★★</option>
            <option value={4}>★★★★☆</option>
            <option value={3}>★★★☆☆</option>
            <option value={2}>★★☆☆☆</option>
            <option value={1}>★☆☆☆☆</option>
          </select>

          <textarea
            value={review}
            onChange={(e)=>setReview(e.target.value)}
            rows={4}
            placeholder="Write your review..."
            className="w-full rounded-lg border p-4"
          />

          <button
            onClick={submitReview}
            className="rounded-xl bg-blue-600 px-6 py-3 text-white hover:bg-blue-700"
          >
            Submit Review
          </button>

        </div>

      )}

      <div className="mt-10 space-y-6">

        {loading && (
          <p>Loading reviews...</p>
        )}

        {!loading && reviews.length===0 && (
          <p className="text-gray-500">
            No reviews yet.
          </p>
        )}

        {reviews.map((item)=>(

          <div
            key={item.id}
            className="rounded-xl border p-5"
          >

            <div className="flex items-center justify-between">

              <h3 className="font-bold">
                {item.profiles?.full_name ?? "Student"}
              </h3>

              <div className="flex">

                {[1,2,3,4,5].map((star)=>(
                  <Star
                    key={star}
                    className={`h-5 w-5 ${
                      star<=item.rating
                      ? "fill-yellow-400 text-yellow-400"
                      : "text-gray-300"
                    }`}
                  />
                ))}

              </div>

            </div>

            <p className="mt-3 text-gray-700">
              {item.review}
            </p>

          </div>

        ))}

      </div>

    </div>
  );
}