
"use client"

import React, { useEffect, useState } from 'react'

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "../../../../../@/components/ui/collapsible"
import { ChevronsUpDown } from 'lucide-react'
import { Button } from '../../../../../components/ui/button'
import {GetFeedback} from '../../../../../Actions/Getfeedback'
import Link from 'next/link'
import { useParams } from "next/navigation";
import { Loader2 } from 'lucide-react'

function feedback() {

 
  const [feedbackData, setFeedbackData] = useState([]);
  const [loading, setLoading] = useState(false);
  const params = useParams();
  
  

  useEffect(() => {
    if (params?.interviewID) {
      fetchFeedback(params.interviewID);
    }
  }, [params]);
  
  
  

  const fetchFeedback = async (interviewID) => {
    setLoading(true)
    const feedback = await GetFeedback(interviewID);
    setFeedbackData(feedback);
    setLoading(false)
  };


  // return (
  //   <div className=' w-full text-white p-10 '>
  //     {
  //        feedbackData.length == 0 ? 
  //        (
  //         <h2 className=' font-bold text-lg '>No Feedback is available</h2>
  //        ) 
  //        : 
  //        (
  //         <>
          
  //     <h2 className=' text-3xl font-bold text-green-400'>Congratulation</h2>
  //     <h2 className=' text-2xl font-bold '>Here is your Interview Result</h2>
  //     <h2 className=' text-lg '>Your overall interview rating: <strong>1</strong></h2>
  //     <h2 className=' text-sm text-gray-400 mb-5'>Find below interview question with correct answer, Your answer and feedback for improvment</h2>
  //     {
  //       feedbackData && feedbackData.length > 0 ? (

  //         feedbackData.map((item, index) => (
  //           <Collapsible key={index} className=' mt-3'>
  //           <CollapsibleTrigger
  //           className='flex justify-between gap-7 p-2 bg-slate-800 rounded-lg my-2 text-left w-full'
  //           >{item?.question} <ChevronsUpDown className=' h-5 w-5'/>
  //           </CollapsibleTrigger>
  //           <CollapsibleContent>
  //           <div className=' flex flex-col gap-2'>
  //             <h2 className=' text-red-500 p-2 border rounded-lg bg-neutral-800'><strong>Rating: </strong>{item?.rating}</h2>
  //             <h2 className=' p-2  border rounded-lg bg-neutral-800 text-sm'><strong>Your Answer: </strong>{item?.userAns}</h2>
  //             <h2 className=' p-2  border rounded-lg bg-neutral-800 text-sm'><strong>Correct Answer: </strong>{item?.correctAns}</h2>
  //             <h2 className=' p-2  border rounded-lg bg-neutral-800 text-sm'><strong>Feedback: </strong>{item?.feedback}</h2>
  //           </div>
  //           </CollapsibleContent>
  //         </Collapsible>

  //         ))
  //       ) : (
  //         <p className=' font-bold '>No feedback available.</p>
  //       )
  //     }
  //         </>
  //        )
  //     }
      
  //     <Link href={'/dashboard'}> 
  //     <Button className=' mt-5'>
  //       Go Home
  //     </Button>
  //     </Link>
  //   </div>
  // )

  return (
    <div className='w-full text-white p-10'>
      {loading ? (
        <div className='flex justify-center items-center'>
          <Loader2 className='h-10 w-10 animate-spin' />
        </div>
      ) : feedbackData.length === 0 ? (
        <h2 className='font-bold text-lg'>No Feedback is available</h2>
      ) : (
        <>
          <h2 className='text-3xl font-bold text-green-400'>Congratulation</h2>
          <h2 className='text-2xl font-bold'>Here is your Interview Result</h2>
          <h2 className='text-lg'>Your overall interview rating: <strong>1</strong></h2>
          <h2 className='text-sm text-gray-400 mb-5'>Find below interview question with correct answer, Your answer and feedback for improvement</h2>
          {feedbackData.map((item, index) => (
            <Collapsible key={index} className='mt-3'>
              <CollapsibleTrigger className='flex justify-between gap-7 p-2 bg-slate-800 rounded-lg my-2 text-left w-full'>
                {item?.question} <ChevronsUpDown className='h-5 w-5' />
              </CollapsibleTrigger>
              <CollapsibleContent>
                <div className='flex flex-col gap-2'>
                  <h2 className='text-red-500 p-2 border rounded-lg bg-neutral-800'><strong>Rating: </strong>{item?.rating}</h2>
                  <h2 className='p-2 border rounded-lg bg-neutral-800 text-sm'><strong>Your Answer: </strong>{item?.userAns}</h2>
                  <h2 className='p-2 border rounded-lg bg-neutral-800 text-sm'><strong>Correct Answer: </strong>{item?.correctAns}</h2>
                  <h2 className='p-2 border rounded-lg bg-neutral-800 text-sm'><strong>Feedback: </strong>{item?.feedback}</h2>
                </div>
              </CollapsibleContent>
            </Collapsible>
          ))}
        </>
      )}
      <Link href={'/dashboard'}>
        <Button className='mt-5'>Go Home</Button>
      </Link>
    </div>
  )
}

export default feedback
