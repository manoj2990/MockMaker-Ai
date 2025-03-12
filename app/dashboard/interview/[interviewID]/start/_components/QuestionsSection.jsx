"use client";

import { Lightbulb, Volume2 } from "lucide-react";
import React from "react";

function QuestionsSection({ mockInterviewQuestion, ActiveQuestionIndex }) {


  const textTOspeach = (text)=>{

    if('speechSynthesis' in window){
      const speech = new SpeechSynthesisUtterance(text);
      window.speechSynthesis.speak(speech)
    }
    else{
      console.error("sorry, Your browser does not support text to speech")
    }
  }
  

  return mockInterviewQuestion && (
    <div className=" p-5 border rounded-lg my-10 ">
    
      <div className=" grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-2 ">
        {mockInterviewQuestion && mockInterviewQuestion?.map((value, index) => (
          
            <h1  key={index} 
            className={`bg-neutral-800  p-2 rounded-full text-xs text-clip md:text-sm text-white text-center cursor-pointer 
              ${ActiveQuestionIndex == index && `bg-slate-500`   }`}
            >Question {index + 1}</h1>
            
        
        ))}
      </div>

      {/* Question */}
      <div>
      <h2 className=" text-white mt-5 text-sm md:text-lg">{mockInterviewQuestion[ActiveQuestionIndex]?.question}</h2>
      </div>
        
        {/* speaker */}
        <Volume2 className=" text-white font-semibold cursor-pointer" onClick={ ()=> textTOspeach(mockInterviewQuestion[ActiveQuestionIndex]?.question) }/>
        <div className=" border rounded-lg p-5 bg-neutral-900 mt-20">
          <h2 className=" flex gap-2 items-center ">
            <Lightbulb/>
            <strong>Note:</strong>
          </h2>
          <h2 className=" text-sm my-2 ">
            Click on Record Answer when you want to the asnwer.At the Ens of interview we will give you the feedback along with correct answer for each of question and answer to compare it.
          </h2>
        </div>
    </div>
  );
}

export default QuestionsSection;
