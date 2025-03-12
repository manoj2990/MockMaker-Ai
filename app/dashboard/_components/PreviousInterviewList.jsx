

"use client"; 
import { useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import InterviewCard from "./InterviewCard";
import { fetchInterviews } from "../../../Actions/interview";
import { Ellipsis } from 'lucide-react';


const PreviousInterviewList = () => {
  const [interviewList, setInterviewList] = useState([]);
  const [loading, setLoading] = useState(true);
    const { user } = useUser();
    const email = user?.primaryEmailAddress?.emailAddress

  useEffect(() => {
    if (!email) return;

    const getInterviews = async () => {
      setLoading(true);
      try {
        const data = await fetchInterviews(email);
        setInterviewList(data);
      } catch (error) {
        console.error("Error fetching interviews:", error);
      }finally{
        setLoading(false);
      }
    };

    getInterviews();
  }, [email]);


  //update interviewList on delete interview from db inside InterviewCard
  const updatedList = ( data)=>{
    setInterviewList(data)
  }

  return (
    <div>
      <h2 className="text-xl font-medium">Previous Mock Interviews</h2>

      {loading ? (
        <p className="text-gray-500 mt-2 flex items-center justify-center"><Ellipsis className="h-10 w-10 text-white animate-bounce" /></p>
      ) : interviewList.length === 0 ? (
        <p className="text-gray-500 mt-2">No previous interviews found.</p>
      ) : (
        <div className="gap-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 my-3">
          {interviewList.map((interview, i) => (
            <InterviewCard key={interview.id || i} interviewData={interview} updatedListfxn={updatedList} email={email} />
          ))}
        </div>
      )}
    </div>
  );
};

export default PreviousInterviewList;
