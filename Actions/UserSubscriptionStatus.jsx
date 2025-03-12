"use server";

import { db } from "../utils/neondbConfig";
import { MockInterview,subscriptions } from "../utils/schema";
import { currentUser } from "@clerk/nextjs/server";
import { desc,eq } from "drizzle-orm";


export const checkuserSubscriptionStatus = async (email) => {
    if (!email) return [];
  
    try {
      const interviews = await db
        .select()
        .from(MockInterview)
        .where(eq(MockInterview.createdBy, email))
        .orderBy(desc(MockInterview.id));


        const status =  await db
        .select()
        .from(subscriptions)
        .where(eq(subscriptions.userEmail, email))
        

        if(!interviews || !status){
            throw new Error("somthing went wrong...");
        }

        return {interviews,status}

    } catch (error) {
      console.error("Error fetching interviews:", error);
      return [];
    }
  
  }