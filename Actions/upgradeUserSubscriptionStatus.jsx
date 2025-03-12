"use server"

import { db } from "../utils/neondbConfig"
import { subscriptions } from "../utils/schema";
import { eq } from "drizzle-orm";

export async function upgradeUserSubscriptionStatus(userId) {
    try {
        const result = await db
            .update(subscriptions)
            .set({ planStatus: "premium" })
            .where(eq(subscriptions.userId, userId))
            .returning(); 


        
        return result;
    } catch (error) {
        throw new Error("Failed to update plan status");
    }
}

    
