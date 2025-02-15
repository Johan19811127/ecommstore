import { useRouter } from 'next/router';

export default function PaymentSuccess() {
    const router = useRouter();
    
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-6 rounded-lg shadow-lg text-center">
                <h2 className="text-2xl font-bold">Payment Successful!</h2>
                <p className="mt-4 text-gray-700">
Thank you for your purchase! Your payment has been received successfully.</p>

<h2 className="text-xl font-bold my-2"> What Happens Next?</h2>
<p>You will receive an confirmation email from us shortly that will confirm all details about your order<p
Your order is being processed, and we’ll notify you once it's ready.
If you have any questions, feel free to contact our support team.
📧 Need Help?
If you didn’t receive a confirmation email, please check your spam folder or reach out to us.</p>
                <button
                    onClick={() => router.push('/')} 
                    className="mt-6 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                    Go to Homepage
                </button>
            </div>
        </div>
    );
}
