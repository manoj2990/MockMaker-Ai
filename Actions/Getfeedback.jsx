

"use server";

import { db } from "../utils/neondbConfig";
import { eq } from "drizzle-orm";
import { UserAnswer } from "../utils/schema";

export async function GetFeedback(mockId) {
  if (!mockId) return [];

  try {
    const result = await db
      .select()
      .from(UserAnswer)
      .where(eq(UserAnswer.mockIdRef, mockId))
      .orderBy(UserAnswer.id);
      
    return result;
  } catch (error) {
    console.error("Error fetching feedback:", error);
    return [];
  }
}
