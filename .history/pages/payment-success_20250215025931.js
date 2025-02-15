import NavLinks from '../components/NavLinks';
import Navbar from '../components/Navbar';
import { useRouter } from 'next/router';


export default function PaymentSuccess() {
    const router = useRouter();
    const msg = "Thank You! We have received your order. Normally orders are completed within 5 working days. You order will be delivered straight to the learners class. To track your order please log in to your account and  and navigating to your profile via the navigation bar by clicking on your email."
    
    return (
        <div className="bg-white h-screen w-screen ">
            <Navbar />
            <NavLinks message={msg}/>
        <div className="flex flex-row flex-1 items-center justify-center p-5">
            
            <div className=" max-w-[750px] h-auto p-6 rounded-lg text-center">
                <h1 className="text-2xl text-blue-900 font-bold">Payment Successful!</h1>
                <p className="mt-4 text-blue-950">
Thank you for your purchase! Your payment has been received successfully.</p>

<h2 className="text-xl font-bold mb-2 mt-5 text-blue-900 "> What Happens Next?</h2>
<ul className="list-disc px-5 text-left">
<li className="text-blue-950  text-md leading-tight mb-2">You will receive a confirmation email shortly with all the details of your order. If you do not see the email in your inbox, please check your spam or junk folder.</li>
<li className="text-blue-950 text-md leading-tight mb-2">Your order is currently being processed. You can track its status by logging into your account and navigating to your profile via the navigation bar by clicking on your email.</li>
<li className="text-blue-950 text-md leading-tight mb-2">Orders are typically delivered within five school days. Once your order is ready, it will be delivered directly to the learner.</li>
</ul>
<p className="mt-4 text-blue-950 mb-5 px-4 ">Thank you for using the Monte Vista Online Store</p>
<p className="text-sm text-blue-900">If you are done shopping, you may close this window or click the button below to continue shopping.</p>
                <button
                    onClick={() => router.push('/')} 
                    className="mt-6 py-2 px-8  bg-gray text-white rounded-md font-semibold hover:bg-blue-700 shadow-md border-b-2"
                >
                    BACK TO STORE
                </button>
            </div>
        </div>
        </div>
    );
}
