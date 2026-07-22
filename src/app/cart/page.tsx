"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Trash2, ShoppingCart } from "lucide-react";
import { supabase } from "@/lib/supabase";

type CartItem = {
  id: string;
  resource_id: string;
  resources: {
    id: string;
    title: string;
    subject: string;
    grade: string;
    price: number;
    thumbnail_url?: string | null;
  };
};

export default function CartPage() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [removing, setRemoving] = useState<string | null>(null);


  useEffect(() => {
    loadCart();
  }, []);


  async function loadCart() {
    try {
      setLoading(true);

      const {
        data: { user },
      } = await supabase.auth.getUser();


      if (!user) {
        setCartItems([]);
        return;
      }


      const { data, error } = await supabase
        .from("cart")
        .select(`
          id,
          resource_id,
          resources (
            id,
            title,
            subject,
            grade,
            price,
            thumbnail_url
          )
        `)
        .eq("user_id", user.id);


      if (error) {
        console.error(error);
        return;
      }


      setCartItems((data as unknown as CartItem[]) || []);

    } catch (error) {
      console.error(error);

    } finally {
      setLoading(false);
    }
  }



  async function removeItem(cartId: string) {

    try {

      setRemoving(cartId);


      const response = await fetch("/api/cart/remove", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          cartId,
        }),
      });


      const result = await response.json();


      if (!response.ok) {
        throw new Error(result.error);
      }


      setCartItems((current) =>
        current.filter((item) => item.id !== cartId)
      );


    } catch (error: any) {

      alert(error.message);

    } finally {

      setRemoving(null);

    }

  }



  const total = cartItems.reduce(
    (sum, item) =>
      sum + Number(item.resources?.price || 0),
    0
  );



  return (

    <main className="min-h-screen bg-slate-100 px-6 py-10">

      <div className="mx-auto max-w-6xl">


        <div className="mb-10 flex items-center gap-3">

          <ShoppingCart className="h-10 w-10 text-blue-600" />

          <h1 className="text-4xl font-bold">
            My Cart
          </h1>

        </div>



        {loading ? (

          <div className="rounded-2xl bg-white p-10 text-center shadow">
            Loading cart...
          </div>


        ) : cartItems.length === 0 ? (


          <div className="rounded-2xl bg-white p-12 text-center shadow">


            <ShoppingCart className="mx-auto h-20 w-20 text-gray-400" />


            <h2 className="mt-6 text-2xl font-bold">
              Your cart is empty
            </h2>


            <p className="mt-2 text-gray-500">
              Browse learning resources and add them to your cart.
            </p>



            <Link
              href="/resources"
              className="mt-8 inline-block rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700"
            >
              Browse Resources
            </Link>


          </div>


        ) : (


          <>


            <div className="space-y-6">


              {cartItems.map((item) => (

                <div
                  key={item.id}
                  className="flex items-center justify-between rounded-2xl bg-white p-5 shadow"
                >


                  <div className="flex gap-5">


                    <div className="relative h-28 w-24 overflow-hidden rounded-lg">


                      <Image
                        src={
                          item.resources?.thumbnail_url ??
                          "/placeholder.png"
                        }
                        alt={
                          item.resources?.title ??
                          "Resource"
                        }
                        fill
                        className="object-cover"
                      />


                    </div>



                    <div>


                      <h2 className="text-xl font-bold">
                        {item.resources.title}
                      </h2>


                      <p className="mt-2 text-gray-600">
                        {item.resources.subject}
                      </p>


                      <p className="text-gray-600">
                        {item.resources.grade}
                      </p>


                      <p className="mt-3 text-2xl font-bold text-blue-600">
                        KSh {item.resources.price}
                      </p>


                    </div>


                  </div>




                  <button
                    onClick={() => removeItem(item.id)}
                    disabled={removing === item.id}
                    className="rounded-xl bg-red-600 p-3 text-white hover:bg-red-700 disabled:opacity-50"
                  >

                    <Trash2 className="h-5 w-5" />

                  </button>


                </div>


              ))}


            </div>




            <div className="mt-10 rounded-2xl bg-white p-8 shadow">


              <div className="flex items-center justify-between">


                <h2 className="text-3xl font-bold">
                  Total
                </h2>


                <h2 className="text-4xl font-bold text-blue-600">
                  KSh {total}
                </h2>


              </div>




              <Link
                href="/checkout"
                className="mt-8 block rounded-xl bg-green-600 py-4 text-center text-lg font-bold text-white hover:bg-green-700"
              >
                Proceed to Checkout
              </Link>



            </div>



          </>

        )}


      </div>


    </main>

  );
}