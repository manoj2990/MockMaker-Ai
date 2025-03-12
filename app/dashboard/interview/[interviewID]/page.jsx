"use client";

import React, { useEffect, useState, useCallback } from "react";
import { Lightbulb, WebcamIcon,Loader2Icon } from "lucide-react";
import Webcam from "react-webcam";
import { Button } from "../../../../components/ui/button";
import Link from "next/link";
import { useParams } from "next/navigation";
import { getInterviewDetails } from "../../../../Actions/interview";
import { toast } from "sonner";

function Interview() {
  const [interviewData, setInterviewData] = useState(null);
  const [webcamEnabled, setWebcamEnabled] = useState(false);
  const [loading, setLoading] = useState(false);
  
  const params = useParams();
  const interviewID = params?.interviewID;


  //0. At first render the useEffect is run and call the fetchData()
  //1. fectData()--> inside useCallback() it create a instance/reference of async fxn and store into fetchData variable
  //2. useCallback() run the code of async fxn and update the state
  //3. Now again this async fxn is run or change it instance/reference to the variable ---> if its dependecy is change
  //4. if dependecy is chage then it instance is change to variable --> means fetchData is change
  //5. on fetcData change it trigger the useEffect ---> it call the fetchData() or that new instance
  //6. update the state
  
  const fetchData = useCallback(async () => {
    if (!interviewID) return;
    try {
      const data = await getInterviewDetails(interviewID);
      setInterviewData(data);
    } catch (error) {
      console.error("Error fetching interview data:", error);
    }
  }, [interviewID]);

  useEffect(() => {
    toast.success("Please Enable Mic & Camera for interview!")
    fetchData();
  }, [fetchData]);



  
  return (
    <div className="my-10 flex flex-col items-center text-slate-200 md:px-10">
      <h2 className="font-bold text-3xl md:text-3xl mb-8 text-left w-full md:px-40 px-40">
        Let’s Get Started
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-16 w-3/4">
        {/* Job Details */}
        <div className="flex flex-col gap-6">
          <div className="p-6 rounded-lg border shadow-md bg-neutral-800">
            <h2 className="text-lg md:text-lg">
              <strong>Job Role/Position:</strong> {interviewData?.jobPosition || "Loading..."}
            </h2>
            <p className="text-lg md:text-lg mt-3">
              <strong>Job Description/Tech Stack:</strong> {interviewData?.jobDesc || "Loading..."}
            </p>
            <p className="text-lg md:text-lg mt-3">
              <strong>Years of Experience:</strong> {interviewData?.jobExperience || "Loading..."}
            </p>
          </div>

          <div className="p-5 border rounded-lg bg-neutral-700 shadow-md">
            <h2 className="flex items-center gap-2 text-lg font-bold text-yellow-300">
              <Lightbulb /> Information
            </h2>
            <p className="text-sm md:text-base mt-3 leading-6 text-slate-300">
              Enable your webcam and microphone to start the AI-generated mock interview. The interview consists of 5 questions. After completion, you'll receive a report based on your answers.
              <br />
              <span className="font-semibold">Note:</span> We never record your video. Webcam access can be disabled anytime.
            </p>
          </div>
        </div>

        {/* Webcam Section */}
        <div className="flex flex-col items-center">
          {webcamEnabled ? (
            <Webcam
              onUserMedia={() => setWebcamEnabled(true)}
              onUserMediaError={() => setWebcamEnabled(false)}
              mirrored={true}
              style={{ height: 300, width: 300, borderRadius: "0.75rem", overflow: "hidden" }}
            />
          ) : (
            <div className="flex items-center justify-center h-60 w-full bg-slate-800 rounded-lg border text-slate-500">
              <WebcamIcon className="h-20 w-20" />
            </div>
          )}

          <div className="mt-3 text-center">Enable your Webcam and Microphone</div>

          <div className="w-full mt-14 flex justify-end" onClick={ ()=> setLoading(true)}>
            <Link href={`/dashboard/interview/${interviewID}/start`}>
              <Button>{loading ? <> Start Interview <Loader2Icon className=" animate-spin"/> </> : <> Start Interview</>}</Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Interview;
