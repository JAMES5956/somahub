const consumerKey = process.env.DARAJA_CONSUMER_KEY!;
const consumerSecret = process.env.DARAJA_CONSUMER_SECRET!;

export async function getAccessToken() {
  const auth = Buffer.from(
    `${consumerKey}:${consumerSecret}`
  ).toString("base64");

  const response = await fetch(
    "https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials",
    {
      method: "GET",
      headers: {
        Authorization: `Basic ${auth}`,
      },
      cache: "no-store",
    }
  );

  if (!response.ok) {
    throw new Error("Failed to get Daraja access token.");
  }

  const data = await response.json();

  return data.access_token;
}