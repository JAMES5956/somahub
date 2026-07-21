import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    console.log(
      "========== DARAJA CALLBACK =========="
    );
    console.log(JSON.stringify(body, null, 2));

    const callback =
      body.Body?.stkCallback;

    if (!callback) {
      return NextResponse.json({
        success: false,
      });
    }

    const checkoutRequestID =
      callback.CheckoutRequestID;

    const merchantRequestID =
      callback.MerchantRequestID;

    const resultCode =
      callback.ResultCode;

    const resultDesc =
      callback.ResultDesc;

    let amount = null;
    let receipt = null;
    let phone = null;

    if (
      callback.CallbackMetadata?.Item
    ) {
      for (const item of callback.CallbackMetadata.Item) {
        if (item.Name === "Amount")
          amount = item.Value;

        if (
          item.Name ===
          "MpesaReceiptNumber"
        )
          receipt = item.Value;

        if (
          item.Name ===
          "PhoneNumber"
        )
          phone = item.Value;
      }
    }

    await supabase
      .from("payments")
      .insert({
        amount,
        phone,
        mpesa_receipt: receipt,
        merchant_request_id:
          merchantRequestID,
        checkout_request_id:
          checkoutRequestID,
        result_code: resultCode,
        result_desc: resultDesc,
        status:
          resultCode === 0
            ? "Paid"
            : "Failed",
      });

    return NextResponse.json({
      ResultCode: 0,
      ResultDesc: "Accepted",
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        ResultCode: 1,
        ResultDesc: "Failed",
      },
      {
        status: 500,
      }
    );
  }
}