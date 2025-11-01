"use server";
import { generateFromGemini } from "../utils/GeminiAI";
import { db } from "../utils/neondbConfig";
import { MockInterview } from "../utils/schema";
import { v4 as uuidv4 } from "uuid";
import moment from "moment";
import { currentUser } from "@clerk/nextjs/server";
import { desc, eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { cache } from "react";

export async function GenerateInterviewQuestions(
  jobposition,
  jobdescription,
  experience
) {
  const user = await currentUser(); //use currentUser to get userDetails at serverside

  const prompt = `
    Given the following details:
    - Job Position: ${jobposition}
    - Job Description: ${jobdescription}
    - Years of Experience: ${experience}
    
    Please generate 5 interview questions and answers based on the above information. 
    Return the results in JSON format with each entry containing 'question' and 'answer' fields.
    `;

  try {
    // const result = await chatSession.sendMessage(prompt); //give details to gemini for qustion & answer generation
    const result = await generateFromGemini(prompt);

    const AI_Generated_Questions = result
      // .text()
      .replace("```json", "")
      .replace("```", "");

    const dbResp = await db
      .insert(MockInterview)
      .values({
        mockId: uuidv4(),
        jsonMockResp: AI_Generated_Questions,
        jobPosition: jobposition,
        jobDesc: jobdescription,
        jobExperience: experience,
        createdBy: user?.emailAddresses[0]?.emailAddress,
        createdAt: moment().format("DD-MM-YYYY"),
      })
      .returning({ mockId: MockInterview.mockId });

    return dbResp[0].mockId; // Return mockId for redirection
  } catch (error) {
    console.error("Error generating interview questions:", error);
    throw error;
  }
}

export async function getInterviewDetails(interviewID) {
  if (!interviewID) {
    throw new Error("Invalid interview ID");
  }

  try {
    const response = await db
      .select()
      .from(MockInterview)
      .where(eq(MockInterview.mockId, interviewID));

    return response[0] || null;
  } catch (error) {
    console.error("Error in geting Interview Details:", error);
    throw error;
  }
}

export const getInterviewQuestionAndAnswer = async (id) => {
  try {
    if (!id) {
      throw new Error("Invalid Interview ID");
    }

    const result = await db
      .select()
      .from(MockInterview)
      .where(eq(MockInterview.mockId, id));

    if (!result || result.length === 0) {
      throw new Error("No interview data found.");
    }

    const jsonMockResp = result[0]?.jsonMockResp
      ? JSON?.parse(result[0].jsonMockResp)
      : [];

    //  const jsonMockResp = result[0]?.jsonMockResp
    //   ? result[0].jsonMockResp
    //   : [];

    return {
      InterviewData: result[0],
      mockInterviewQuestion: jsonMockResp,
    };
  } catch (error) {
    console.error("Error fetching Interview Question And Answer:", error);
    return { InterviewData: null, mockInterviewQuestion: [] };
  }
};

const fetchInterviewsFromDB = async (email) => {
  if (!email) return [];

  try {
    return await db
      .select()
      .from(MockInterview)
      .where(eq(MockInterview.createdBy, email))
      .orderBy(desc(MockInterview.id));
  } catch (error) {
    console.error("Error fetching interviews:", error);
    return [];
  }
};

export const fetchInterviews = cache(async (email) => {
  if (!email) return [];

  return await fetchInterviewsFromDB(email);
});

export const deleteInterview = async (interviewId) => {
  try {
    // Ensure interviewId is provided
    if (!interviewId) {
      throw new Error("Interview ID is required");
    }

    // Delete the interview from the database
    await db.delete(MockInterview).where(eq(MockInterview.mockId, interviewId));

    return { success: true, message: "Interview deleted successfully" };
  } catch (error) {
    console.error("Error deleting interview:", error);
    return { success: false, message: error.message || "Something went wrong" };
  }
};
