"use client";

import { useState, useEffect } from "react";
import { useUser } from "@clerk/nextjs";
import axios from "axios";
import { toast } from "sonner";
import { Loader2Icon } from "lucide-react";
import { checkuserSubscriptionStatus } from "../Actions/UserSubscriptionStatus";
import {shootsuccessFireWork} from "../razorpayPayment/shootsuccessFireWork"
import { useRouter } from "next/navigation";

export default  function PaymentButton({ text, className, amount }) {
    
    const [loading, setLoading] = useState(false);
    const { user } = useUser();
    const email = user?.primaryEmailAddress?.emailAddress;
    const [razorpayLoaded, setRazorpayLoaded] = useState(false);
    const [isPremium, setIsPremium] = useState(false);
    const router = useRouter();

    useEffect(() => {
        // Check if the user is premium
        const fetchSubscriptionStatus = async () => {
            if (!email) return;
            try {
                const { status } = await checkuserSubscriptionStatus(email);
                
                if (status.length > 0 && status[0].planStatus == 'premium') {
                    setIsPremium(true);
                }
            } catch (error) {
                toast.error("failed to check status")
            }
        };

        fetchSubscriptionStatus();
    }, [email,user?.id]);
    

    

    useEffect(() => {
        if (document.querySelector('script[src="https://checkout.razorpay.com/v1/checkout.js"]')) {
            setRazorpayLoaded(true);
            toast.error("razorpay scripts already Loaded")
            return;
        }
    
        const script = document.createElement("script");
        script.src = "https://checkout.razorpay.com/v1/checkout.js";
        script.async = true;
        script.onload = () => setRazorpayLoaded(true);
        script.onerror = () => {
            toast.error("Failed to load Razorpay script");
            console.error("Failed to load Razorpay script");
        };
        document.body.appendChild(script);
    }, []);
    
    
       

    const handlePayment = async () => {
        
        if (!razorpayLoaded) {
            alert("Payment SDK is still loading. Please try again in a few seconds.");
            return;
        }

        setLoading(true);
        try {
            // Step 1: Create Order on the server
         
            const orderRes = await axios.post("/api/razorpay/checkoutOrder", { amount });
           
            
            const { id: order_id, amount: orderAmount, currency } = orderRes.data;

            // Step 2: Open Razorpay Payment Gateway
            const options = {
                key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID, // Public Key
                amount: orderAmount,
                currency,
                name: "MockMaster-AI",
                description: "Payment for your Subscription",
                order_id,
                prefill: { email },
                handler: async (response) => {
                    try {
                        
                        const verifyRes = await axios.post("/api/razorpay/verifyPayment", response);
                        toast.success(verifyRes.data.message)
                        setIsPremium(true);
                        shootsuccessFireWork();
                        router.push('/dashboard')
                    } catch (err) {
                        console.error("Error verifying payment:", err);
                        toast.error("Payment verification failed")
                        
                    }
                },
                theme: { color: "#4278f5" },
            };

           
            const razorpay = new window.Razorpay(options);
            

            razorpay.open();
            razorpay.on("payment.failed", function (response) {

                toast.error("Oops! Payment Failed.")
            });
        } catch (error) {
            console.error("Payment Error:", error);
            toast.error("Oops! Payment Failed.")
        } finally {
            setLoading(false);
        }
    };

    return (
        <button
            className={className}
            onClick={handlePayment}
            disabled={loading || !razorpayLoaded || isPremium} 
        >
            {isPremium ? "You are Premium" : loading ? (
                <span className="flex justify-center items-center">
                    <Loader2Icon className="animate-spin" />
                </span>
            ) : text}
        </button>
    );
}
