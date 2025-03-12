
import React from 'react'
import AddNewInterview from "./_components/AddNewInterview"
import PreviousInterviewList from "./_components/PreviousInterviewList"



  function dashboard() {

  return (
    <div className=' p-10 text-white '>
      <h1 className=' font-bold text-gray-100 text-4xl'>Dashboard</h1>
      <h1 className=' text-gray-300 '>Create and Start Your New AI Mockup Interview</h1>
      <div className=' grid grid-cols-1 md:grid-cols-3 my-5 '>
        <AddNewInterview/>
      </div>
      <div>
        {/* show all prevoius interview */}
        <PreviousInterviewList  />
      </div>
    </div>
  )
}

export default dashboard;
