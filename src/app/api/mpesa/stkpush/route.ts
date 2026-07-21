import { NextRequest, NextResponse } from "next/server";
import { getAccessToken } from "@/lib/daraja";

export async function POST(request: NextRequest) {
  try {
    const { phone, amount } = await request.json();

    const accessToken = await getAccessToken();

    const shortcode = process.env.DARAJA_SHORTCODE!;
    const passkey = process.env.DARAJA_PASSKEY!;

    const timestamp = new Date()
      .toISOString()
      .replace(/[-:TZ.]/g, "")
      .slice(0, 14);

    const password = Buffer.from(
      `${shortcode}${passkey}${timestamp}`
    ).toString("base64");

    console.log("========== STK REQUEST ==========");
    console.log({
      shortcode,
      timestamp,
      phone,
      amount,
      password,
    });

    const response = await fetch(
      "https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          BusinessShortCode: shortcode,
          Password: password,
          Timestamp: timestamp,
          TransactionType: "CustomerPayBillOnline",
          Amount: Number(amount),
          PartyA: phone,
          PartyB: shortcode,
          PhoneNumber: phone,
          CallBackURL: `${process.env.NEXT_PUBLIC_APP_URL}/api/mpesa/callback`,
          AccountReference: "SomaHub",
          TransactionDesc: "CBC Resource Purchase",
        }),
      }
    );

    const data = await response.json();

    console.log("========== STK RESPONSE ==========");
    console.log(JSON.stringify(data, null, 2));
    console.log("==================================");

    return NextResponse.json(data, {
      status: response.status,
    });
  } catch (error: any) {
    console.error("========== STK ERROR ==========");
    console.error(error);
    console.error("===============================");

    return NextResponse.json(
      {
        success: false,
        message: error.message,
      },
      {
        status: 500,
      }
    );
  }
}