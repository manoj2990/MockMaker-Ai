import { NextResponse } from "next/server";
import { db } from "../../../../utils/neondbConfig"; 
import { subscriptions } from "../../../../utils/schema"; 
import { eq } from "drizzle-orm";

export async function POST(req) {
    
    try {
        const { userId,email } = await req.json();
        
        if (!userId || !email) {
            return NextResponse.json({ error: "userId,email is required" }, { status: 400 });
        }

        // Check if subscription already exists
        const existing = await db.select().from(subscriptions).where(eq(subscriptions.userId, userId));

        if (existing.length > 0) {
            return NextResponse.json({ message: "Subscription already exists" }, { status: 200 });
        }

        // Create a new subscription
        await db.insert(subscriptions).values({
            userId,
            userEmail:email,
            planStatus: "free",
        });

        return NextResponse.json({ message: "Subscription created successfully" }, { status: 201 });
    } catch (error) {
        console.error("Subscription API error:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
