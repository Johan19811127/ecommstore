import { NextResponse } from 'next/server';
import crypto from 'crypto';

export async function POST(req) {
    try {
        const formData = await req.formData();
        const data = Object.fromEntries(formData);
        
        // Validate PayFast signature
        const passphrase = process.env.PAYFAST_PASSPHRASE || '';
        let signatureString = Object.keys(data)
            .filter(key => key !== 'signature')
            .sort()
            .map(key => `${key}=${data[key]}`)
            .join('&');
        
        if (passphrase) {
            signatureString += `&passphrase=${passphrase}`;
        }
        
        const calculatedSignature = crypto.createHash('md5').update(signatureString).digest('hex');
        
        if (calculatedSignature !== data.signature) {
            return NextResponse.json({ message: 'Invalid signature' }, { status: 400 });
        }
        
        // Process successful payment
        if (data.payment_status === 'COMPLETE') {
            // Update order in database (replace with your logic)
            await updateOrderStatus(data.m_payment_id, 'paid');
        }
        
        return NextResponse.json({ message: 'Webhook received' }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: 'Error processing webhook', error: error.message }, { status: 500 });
    }
}

async function updateOrderStatus(orderId, status) {
    // Implement your database update logic here
    console.log(`Updating order ${orderId} to status: ${status}`);
}
