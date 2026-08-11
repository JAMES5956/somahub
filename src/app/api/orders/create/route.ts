import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(req: NextRequest) {
  try {
    const { phone, transactionCode } = await req.json();

    if (!phone || !transactionCode) {
      return NextResponse.json(
        {
          error: "Phone number and transaction code are required.",
        },
        {
          status: 400,
        }
      );
    }

    // Get logged-in user
    const authHeader = req.headers.get("Authorization");

    if (!authHeader?.startsWith("Bearer ")) {
      return NextResponse.json(
        {
          error: "Not authenticated.",
        },
        {
          status: 401,
        }
      );
    }

    const token = authHeader.replace("Bearer ", "");

    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser(token);

    if (userError || !user) {
      return NextResponse.json(
        {
          error: "Invalid user.",
        },
        {
          status: 401,
        }
      );
    }

    // Get user's cart
    const { data: cartItems, error: cartError } = await supabase
      .from("cart")
      .select(`
        id,
        resource_id,
        resources (
          price
        )
      `)
      .eq("user_id", user.id);

    if (cartError) {
      throw cartError;
    }

    if (!cartItems || cartItems.length === 0) {
      return NextResponse.json(
        {
          error: "Your cart is empty.",
        },
        {
          status: 400,
        }
      );
    }

    // Create purchases
    const purchases = cartItems.map((item: any) => ({
      user_id: user.id,
      resource_id: item.resource_id,
      phone,
      transaction_code: transactionCode,
      amount: Number(item.resources.price),
      status: "pending",
    }));

    // Prevent duplicate purchases
    const { error: purchaseError } = await supabase
      .from("purchases")
      .upsert(purchases, {
        onConflict: "user_id,resource_id",
      });

    if (purchaseError) {
      throw purchaseError;
    }

    // Clear cart after successful submission
    const { error: deleteError } = await supabase
      .from("cart")
      .delete()
      .eq("user_id", user.id);

    if (deleteError) {
      throw deleteError;
    }

    return NextResponse.json({
      success: true,
      message:
        "Payment submitted successfully. Awaiting verification.",
    });

  } catch (error: any) {
    console.error(error);

    return NextResponse.json(
      {
        error: error.message,
      },
      {
        status: 500,
      }
    );
  }
}