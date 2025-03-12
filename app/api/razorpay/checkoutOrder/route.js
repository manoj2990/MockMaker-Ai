import { NextResponse } from "next/server";
import Razorpay from "razorpay";

const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
});



export async function POST(req) {
    
    try {
        const { amount, currency = "INR" } = await req.json();

        if(!amount || !currency){
            return NextResponse.json({ error: "amount,currency is required" }, { status: 400 });
        }

        const options = {
            amount: amount * 100, 
            currency,
            receipt: `receipt_${Date.now()}`,
        };
       
        const order = await razorpay.orders.create(options);
       
        return NextResponse.json(order, { status: 200 });

    } catch (error) {
      
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}