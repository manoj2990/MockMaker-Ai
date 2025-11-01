"use client";

import Image from "next/image";
import React, { useEffect, useState, useRef } from "react";
import Webcam from "react-webcam";
import { Button } from "../../../../../../components/ui/button";

import useSpeechToText from "react-hook-speech-to-text";
import { Mic, Loader2Icon } from "lucide-react";
import { SaveUserAnswerWithFeedback } from "../../../../../../Actions/SaveUserAnswer";
import { toast } from "sonner";


function RecordAnsSection({
  mockInterviewQuestion,
  ActiveQuestionIndex,
  interviewData,
}) {
  const {
    error,
    interimResult,
    isRecording,
    results,
    setResults,
    startSpeechToText,
    stopSpeechToText,
  } = useSpeechToText({
    continuous: true,
    useLegacyResults: false,
  });

  // const [userAnswer, setUserAnswer] = useState("");
  const [loading, setLoading] = useState(false);

  const latestAnswerRef = useRef("");

  useEffect(() => {
    if (!isRecording) {
      const combinedText = results.map((result) => result.transcript).join(" ").trim();
      // setUserAnswer(combinedText);
      latestAnswerRef.current = combinedText;
    }
  }, [isRecording, results]);



  const startStopRecording = async () => {
    if (isRecording) {
      setLoading(true);
      stopSpeechToText();
  
      setTimeout(async () => {
        // Get the latest transcript instead of relying on state
        const finalAnswer = latestAnswerRef.current.trim();
        
       
  
        if (finalAnswer.length < 10) {
          setLoading(false);
          toast.error("Answer must be at least 10 characters!");
          return;
        }
  
        const question = mockInterviewQuestion[ActiveQuestionIndex]?.question || "No question provided";
        const correctAns = mockInterviewQuestion[ActiveQuestionIndex]?.answer;
        const mockId = interviewData?.mockId;
  
        try {
          const response = await SaveUserAnswerWithFeedback(mockId, question, correctAns, finalAnswer);
          if (response.success) {
            // setUserAnswer(""); // Clear state after submission
            setResults([]); // Clear previous results
            latestAnswerRef.current = ""; // Reset ref
            toast.success(response.message);
          } else {
            toast.error(response.message);
          }
        } catch (error) {
          toast.error("Failed to save answer. Please try again.");
        }
  
        setLoading(false);
      }, 2000);
    } else {
      startSpeechToText();
    }
  };







  return (
    <div className=" flex flex-col items-center">
      <div className=" flex flex-col mt-20 justify-center items-center bg-neutral-900 rounded-lg ">
        <Image
          src={"/webcam.png"}
          width={200}
          height={200}
          className=" absolute"
          alt="webcam Image"
        />
        <Webcam
          mirrored={true}
          style={{
            height: 300,
            width: "100%",
            zIndex: 10,
          }}
        />
      </div>
      <Button
        disabled={loading}
        className={`mt-10 ${ isRecording ? "bg-red-500" : "bg-white"}`}
        onClick={  startStopRecording}
      >
        {isRecording ? ( 
          <h2 className="flex gap-1 ">
            <Mic /> Stop Recording
          </h2>
        ) : (
          <h2 className="flex gap-1 ">
            Record Answer
            {loading && <Loader2Icon className="animate-spin" />}
          </h2>
        )}
      </Button>

    </div>
  );
}

export default RecordAnsSection;
