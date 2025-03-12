"use server";

import { db } from "../utils/neondbConfig";
import { chatSession } from "../utils/GeminiAI";
import { UserAnswer } from "../utils/schema";
import { currentUser } from "@clerk/nextjs/server";
import moment from "moment";

export async function SaveUserAnswerWithFeedback(mockId, question, correctAns, userAns) {

    const user = await currentUser();
    const userEmail = user?.emailAddresses[0]?.emailAddress || "No Email";

  if (!userAns || userAns.length < 10) {
    return { success: false, message: "Answer too short!" };
  }

  try {
    // AI Feedback Request
    const feedbackPrompt = `
      Question: ${question}.
      User Answer: ${userAns}.
      Based on the question and user's answer, provide feedback and a rating 
      in JSON format with fields "rating" and "feedback". Keep it concise.
    `;

    const result = await chatSession.sendMessage(feedbackPrompt);
    const jsonMockResp = await result.response.text();
    const cleanedResp = jsonMockResp.replace("```json", "").replace("```", "");
    const feedbackResponse = JSON.parse(cleanedResp);



    // Store in DB
    await db.insert(UserAnswer).values({
      mockIdRef: mockId,
      question,
      correctAns,
      userAns,
      feedback: feedbackResponse?.feedback,
      rating: feedbackResponse?.rating,
      userEmail,
      createdAt: moment().format("DD-MM-YYYY"),
    });

    return { success: true, message: "Answer recorded successfully!" };
  } catch (error) {
    console.error("Error:", error);
    return { success: false, message: "Error saving answer!" };
  }
}
