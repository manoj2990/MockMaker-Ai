
import React from 'react'
import Header from './_components/Header'
import { currentUser } from "@clerk/nextjs/server";
import { fetchInterviews } from "../../Actions/interview";

async function Dashboardlayout({children}) {

  // const user = await currentUser();
  // const email = user?.emailAddresses[0]?.emailAddress;
  // const interviewList = email ? await fetchInterviews(email) : [];
  // // console.log("Dashboardlayout interviewList>>>",interviewList)
  
  return (
    <div>
      <Header />
     
      <div className="flex flex-col overflow-hidden mt-20 mx-10 md:mx-20 lg:mx-36">
        {/* Pass user and interviewList to children */}
        {children}
      </div>
    </div>
  )
}

export default Dashboardlayout;
