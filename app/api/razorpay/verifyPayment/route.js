import { NextResponse } from "next/server";
import crypto from "crypto";
import { currentUser } from '@clerk/nextjs/server'
import {upgradeUserSubscriptionStatus} from "../../../../Actions/upgradeUserSubscriptionStatus"


export async function POST(req) {
   
    const user = await currentUser()
   
    try {
        const { razorpay_order_id, razorpay_payment_id, razorpay_signature, } = await req.json();
        
    
        const secret = process.env.RAZORPAY_KEY_SECRET;
        const generated_signature = crypto
            .createHmac("sha256", secret)
            .update(`${razorpay_order_id}|${razorpay_payment_id}`)
            .digest("hex");

        if (generated_signature === razorpay_signature) {
           

            await upgradeUserSubscriptionStatus(user?.id);
            return NextResponse.json({ message: "Payment verified successfully" }, { status: 200 });
        } else {
            
            return NextResponse.json({ error: "Invalid payment signature" }, { status: 400 });
        }
    } catch (error) {
        
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}