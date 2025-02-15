import { useEffect } from 'react';

const proivatekey= process.env.YOCO_TEST_PRIVATE_KEY
export default function PaymentForm() {
  useEffect(() => {
    // Load the Yoco SDK
    const script = document.createElement('script');
    script.src = 'https://js.yoco.com/sdk/v1/yoco-sdk-web.js';
    script.async = true;
    script.onload = () => {
      // Initialize Yoco instance
      window.yoco = new window.YocoSDK({
        publicKey: private, // Replace with your Yoco public key
      });
    };
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const handlePayment = async () => {
    const token = await window.yoco.showPopup({
      amountInCents: 10000, // Amount in cents (R100.00 = 10000 cents)
      currency: 'ZAR',
    });

    if (token.error) {
      console.error('Payment failed:', token.error.message);
      alert(`Payment failed: ${token.error.message}`);
    } else {
      // Send token to the backend for verification
      const response = await fetch('/api/verify-payment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token: token.id }),
      });

      const result = await response.json();
      if (result.success) {
        alert('Payment successful!');
      } else {
        alert('Payment verification failed.');
      }
    }
  };

  return (
    <div className="flex flex-col items-center p-4">
      <h1 className="text-xl font-bold mb-4">Make a Payment</h1>
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded"
        onClick={handlePayment}
      >
        Pay Now
      </button>
    </div>
  );
}
