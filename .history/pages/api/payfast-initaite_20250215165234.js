import { NextResponse } from "next/server";
import crypto from "crypto";

export async function POST(req) {
    const { amount } = await req.json();

    const merchantId = process.env.PAYFAST_MERCHANT_ID;
    const merchantKey = process.env.PAYFAST_MERCHANT_KEY;
    const returnUrl = process.env.PAYFAST_RETURN_URL || "http://localhost:3000/payment-success";
    const notifyUrl = process.env.PAYFAST_NOTIFY_URL || "http://localhost:3000/api/payfast-webhook";

    const paymentData = {
        merchant_id: merchantId,
        merchant_key: merchantKey,
        return_url: returnUrl,
        notify_url: notifyUrl,
        amount: amount,
        item_name: "Online Store Purchase",
        m_payment_id: `order_${Date.now()}`, // Unique order ID
    };

    // Generate signature
    const signatureString = Object.keys(paymentData)
        .sort()
        .map((key) => `${key}=${paymentData[key]}`)
        .join("&");

    const signature = crypto.createHash("md5").update(signatureString).digest("hex");

    const payfastUrl = `https://www.payfast.co.za/eng/process?${signatureString}&signature=${signature}`;

    return NextResponse.json({ paymentUrl: payfastUrl });
}