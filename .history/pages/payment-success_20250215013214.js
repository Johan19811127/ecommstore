import NavLinks from '../components/NavLinks';
import Navbar from '../components/Navbar';
import { useRouter } from 'next/router';


export default function PaymentSuccess() {
    const router = useRouter();
    
    return (
        <div className="bg-white h-screen w-screen ">
            <Navbar />
            <NavLinks/>
        <div className="flex flex-row flex-1 items-center justify-center p-5">
            
            <div className=" max-w-[1200px] h-auto p-6 rounded-lg text-center">
                <h1 className="text-2xl text-blue-900 font-bold">Payment Successful!</h1>
                <p className="mt-4 text-blue-800">
Thank you for your purchase! Your payment has been received successfully.</p>

<h2 className="text-xl font-bold mb-2 mt-5 text-blue-800 "> What Happens Next?</h2>
<ul>
<p className>You will receive an confirmation email from us shortly that will confirm all details about your order</p>
<p>Your order is being processed, and we’ll notify you once it's ready.
If you have any questions, feel free to contact our support team.
📧 Need Help?
If you didn’t receive a confirmation email, please check your spam folder or reach out to us.</p></ul>
                <button
                    onClick={() => router.push('/')} 
                    className="mt-6 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                    Go to Homepage
                </button>
            </div>
        </div>
        </div>
    );
}
