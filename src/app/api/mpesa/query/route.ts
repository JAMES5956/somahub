import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function GET(req: NextRequest) {
  const checkoutRequestId =
    req.nextUrl.searchParams.get("checkoutRequestId");

  if (!checkoutRequestId) {
    return NextResponse.json(
      {
        success: false,
        message: "Missing checkoutRequestId",
      },
      { status: 400 }
    );
  }

  const { data, error } = await supabase
    .from("payments")
    .select("status")
    .eq("checkout_request_id", checkoutRequestId)
    .single();

  if (error) {
    return NextResponse.json(
      {
        success: false,
      },
      { status: 404 }
    );
  }

  return NextResponse.json({
    success: true,
    status: data.status,
  });
}