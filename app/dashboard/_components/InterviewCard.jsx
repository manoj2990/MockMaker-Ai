"use client"

import React from 'react'
import { Button } from '../../../components/ui/button'
import { useRouter } from 'next/navigation'
import {deleteInterview} from '../../../Actions/interview'
import { toast } from 'sonner'
import { Trash2 } from 'lucide-react';
import { fetchInterviews } from "../../../Actions/interview";

function InterviewCard({interviewData, updatedListfxn, email}) {

    const router =  useRouter();

    const start = () =>{
        router.push(`dashboard/interview/${interviewData?.mockId}`)
    }

    
    const feedback = () =>{
        router.push(`dashboard/interview/${interviewData?.mockId}/feedback`)
    }


    const onDelete = async(mockId)=>{
      //delete the interview
      const resp = await deleteInterview(mockId);

      if(resp.success){ 
      // fetch new interview from db & call updatedListfxn from PreviousInterviewList
        toast.success(resp.message)
        const updatedInterviews = await fetchInterviews(email);
        updatedListfxn(updatedInterviews)
      }else{
        toast.error(resp.message)
      }

    }

  return (
    <div className=' border shadow-sm rounded-lg p-3'>
      <div className=' flex items-start justify-between'>
      <div>
      <h2 className=' font-bold text-white'>{interviewData?.jobPosition}</h2>
      <h2 className=' text-sm text-gray-400'>{interviewData?.jobExperience} Year of Experience</h2>
      <h2 className=' text-xs text-gray-500'> createdAt: {interviewData?.createdAt}</h2>
      </div>
      <button
          className="mt-2 text-red-300 "
          onClick={() => onDelete(interviewData?.mockId)}
        >
          
          <Trash2/>
        </button>

      </div>
     <div className=' flex justify-between gap-5 mt-3'>
        <Button onClick= {feedback}
         variant='secondary' className="w-full bg-slate-800 text-white">Feedback</Button>
        <Button onClick = { start}
         className="w-full ">Start</Button>
     </div>
    </div>
  )
}

export default InterviewCard
