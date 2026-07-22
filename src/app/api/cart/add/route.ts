import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(req: NextRequest) {
  try {
    const { userId, resourceId } = await req.json();

    if (!userId || !resourceId) {
      return NextResponse.json(
        { error: "Missing data." },
        { status: 400 }
      );
    }

    const { error } = await supabase
      .from("cart")
      .insert({
        user_id: userId,
        resource_id: resourceId,
      });

    if (error) {
      if (error.code === "23505") {
        return NextResponse.json({
          success: true,
          message: "Already in cart.",
        });
      }

      throw error;
    }

    return NextResponse.json({
      success: true,
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