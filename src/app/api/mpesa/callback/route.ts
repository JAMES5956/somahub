import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    console.log("========== DARAJA CALLBACK ==========");
    console.log(JSON.stringify(body, null, 2));

    const callback = body.Body?.stkCallback;

    if (!callback) {
      return NextResponse.json({
        ResultCode: 0,
        ResultDesc: "Accepted",
      });
    }

    const checkoutRequestID = callback.CheckoutRequestID;
    const merchantRequestID = callback.MerchantRequestID;
    const resultCode = callback.ResultCode;
    const resultDesc = callback.ResultDesc;

    let amount = null;
    let receipt = null;
    let phone = null;
    let transactionDate = null;

    if (callback.CallbackMetadata?.Item) {
      for (const item of callback.CallbackMetadata.Item) {
        switch (item.Name) {
          case "Amount":
            amount = item.Value;
            break;

          case "MpesaReceiptNumber":
            receipt = item.Value;
            break;

          case "PhoneNumber":
            phone = item.Value;
            break;

          case "TransactionDate":
            transactionDate = item.Value;
            break;
        }
      }
    }

    // Update existing payment
    const { data: payment, error: paymentError } = await supabase
      .from("payments")
      .update({
        amount,
        phone,
        mpesa_receipt: receipt,
        result_code: resultCode,
        result_desc: resultDesc,
        transaction_date: transactionDate,
        status: resultCode === 0 ? "PAID" : "FAILED",
      })
      .eq("checkout_request_id", checkoutRequestID)
      .select()
      .single();

    if (paymentError) {
      console.error(paymentError);
    }

    // Unlock purchased resource
    if (resultCode === 0 && payment) {
      const { error: unlockError } = await supabase
        .from("purchases")
        .insert({
          user_id: payment.user_id,
          resource_id: payment.resource_id,
          payment_id: payment.id,
        });

      if (unlockError) {
        console.error(unlockError);
      }
    }

    return NextResponse.json({
      ResultCode: 0,
      ResultDesc: "Accepted",
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        ResultCode: 1,
        ResultDesc: "Server Error",
      },
      {
        status: 500,
      }
    );
  }
}