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
            
            <div className=" max-w-[750px] h-auto p-6 rounded-lg text-center">
                <h1 className="text-2xl text-blue-900 font-bold">Payment Successful!</h1>
                <p className="mt-4 text-blue-950">
Thank you for your purchase! Your payment has been received successfully.</p>

<h2 className="text-xl font-bold mb-2 mt-5 text-blue-900 "> What Happens Next?</h2>
<ul className="list-disc px-5 text-left">
<li className="text-blue-950  textleading-tight mb-2">You will receive a confirmation email shortly with all the details of your order. If you do not see the email in your inbox, please check your spam or junk folder.</li>
<li className="text-blue-950 leading-tight mb-2">Your order is currently being processed. You can track its status by logging into your account and navigating to your profile via the navigation bar by clicking on your email.</li>
<li className="text-blue-950 leading-tight mb-2">Orders are typically delivered within five school days. Once your order is ready, it will be delivered directly to the learner.</li>
</ul>
<p className="mt-4 text-blue-950 mb-5 px-4 ">Thank you for shopping with the Monte Vista Online Store. If you have completed your purchase, you may close this window or click back to continue shopping for more uniform items.</p>
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
