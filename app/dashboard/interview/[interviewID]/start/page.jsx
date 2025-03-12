"use client";

import React, { useEffect, useState } from "react";
import QuestionSection from "../start/_components/QuestionsSection";
// import RecordAnsSection from "../start/_components/RecordAnsSection";
import { Button } from "../../../../../components/ui/button";
import Link from "next/link";
import { Loader, Loader2Icon } from "lucide-react";
import { getInterviewQuestionAndAnswer } from "../../../../../Actions/interview";
import { useParams } from "next/navigation";
import dynamic from "next/dynamic";


const RecordAnsSection = dynamic( ()=> import("../start/_components/RecordAnsSection"),
{ // RecordAnsSection is used react-hook-speech-to-text that render on serverSide 
  // try attempting to access navigator on the server.
  // but faced navigator error so we use dynamic to reder react-hook-speech-to-text to 
  //stop ssr 
  ssr: false
})

function Start() {
  const [mockInterviewQuestion, setMockInterviewQuestion] = useState(null);
  const [interviewData, setInterviewData] = useState(null);
  const [ActiveQuestionIndex, setActiveQuestionIndex] = useState(0);
  const [loading, setLoading] = useState(false);
  const params = useParams();
  const interviewID = params.interviewID; 

  useEffect(() => {
    if (!interviewID) return; // prevent unnecssary interection with db if interviewID is not present

    let isMounted = true; 

    async function fetchData() {
      try {
        const resp = await getInterviewQuestionAndAnswer(interviewID);
        if (isMounted) {
          setInterviewData(resp?.InterviewData);
          setMockInterviewQuestion(resp?.mockInterviewQuestion);
        }
      } catch (error) {
        console.error("Failed to fetch interview data:", error);
      }
    }

    fetchData();

    return () => {
      isMounted = false; // Cleanup function to prevent state updates on unmounted components
    };
  }, [interviewID]);


  
  if (!interviewID || !mockInterviewQuestion) {
    return (
      <div className="text-white flex items-center justify-center">
        <Loader  className=" animate-spin"/>
      </div>
    );
  }



  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 text-white gap-10">
        <QuestionSection
          mockInterviewQuestion={mockInterviewQuestion}
          ActiveQuestionIndex={ActiveQuestionIndex}
        />
        <RecordAnsSection
          mockInterviewQuestion={mockInterviewQuestion}
          ActiveQuestionIndex={ActiveQuestionIndex}
          interviewData={interviewData}
        />
      </div>
      <div className="flex justify-end gap-2">
        {ActiveQuestionIndex > 0 && (
          <Button onClick={() => setActiveQuestionIndex((prev) => prev - 1)}>
            Previous Question
          </Button>
        )}

        {ActiveQuestionIndex < mockInterviewQuestion.length - 1 && (
          <Button onClick={() => setActiveQuestionIndex((prev) => prev + 1)}>
            Next Question
          </Button>
        )}

        {ActiveQuestionIndex === mockInterviewQuestion.length - 1 && (
          <Link href={`/dashboard/interview/${interviewID}/feedback`} onClick={ ()=> setLoading(true)} >
            <Button> {loading ? <> End Interview <Loader2Icon className=" animate-spin"/> </> : <> End Interview</>}</Button>
          </Link>
        )}
      </div>
    </div>
  );
}

export default Start;
