import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import {
  getAccessToken,
  getPassword,
  DarajaConfig,
} from "@/lib/daraja";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(request: NextRequest) {
  try {
    const { phone, amount, resourceId, userId } = await request.json();

    if (!phone || !amount || !resourceId || !userId) {
      return NextResponse.json(
        {
          success: false,
          message: "Missing required fields.",
        },
        { status: 400 }
      );
    }

    const accessToken = await getAccessToken();

    const { password, timestamp } = getPassword();

    const callbackUrl = `${process.env.NEXT_PUBLIC_SITE_URL}/api/mpesa/callback`;

    const stkBody = {
      BusinessShortCode: DarajaConfig.shortcode,
      Password: password,
      Timestamp: timestamp,
      TransactionType: "CustomerPayBillOnline",
      Amount: Number(amount),
      PartyA: phone,
      PartyB: DarajaConfig.shortcode,
      PhoneNumber: phone,
      CallBackURL: callbackUrl,
      AccountReference: "SomaHub",
      TransactionDesc: `Purchase Resource ${resourceId}`,
    };

    const response = await fetch(
      `${DarajaConfig.baseUrl}/mpesa/stkpush/v1/processrequest`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(stkBody),
      }
    );

    const data = await response.json();

    if (data.ResponseCode !== "0") {
      return NextResponse.json(
        {
          success: false,
          message: data.errorMessage || data.ResponseDescription,
          data,
        },
        { status: 400 }
      );
    }

    const { error } = await supabase.from("payments").insert({
      user_id: userId,
      resource_id: resourceId,
      phone,
      amount,
      merchant_request_id: data.MerchantRequestID,
      checkout_request_id: data.CheckoutRequestID,
      status: "PENDING",
    });

    if (error) {
      console.error(error);

      return NextResponse.json(
        {
          success: false,
          message: "Failed to save payment.",
        },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      checkoutRequestId: data.CheckoutRequestID,
      merchantRequestId: data.MerchantRequestID,
      customerMessage: data.CustomerMessage,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Internal server error.",
      },
      { status: 500 }
    );
  }
}