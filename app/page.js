"use client";

import Header from "./dashboard/_components/Header";
import HeroScroll from "./_commonComponent/HeroScroll";
import HowItWorks from "./_commonComponent/HowItWork";
import {steps }from "../constants/Steps";
import UpgradePage from '../app/price/page';
import Footer from '../app/_commonComponent/footer'
import { useRef } from "react";
import Testimonial from '../app/_commonComponent/Testimonial';
import CreateSubscription from './_commonComponent/subscriptionHelper'
export default  function Home() {

  //it use to make a ref to component that show some action
  //when onHowItWorksClick button trigger in navabr and call the scrollToSection fxn
  //inside home page
  const howItWorks = useRef(null);

  const scrollToSection = ()=>{
    
    howItWorks.current?.scrollIntoView({ behavior: "smooth" });
  }
 
  
  return (
    <section className=" w-10/12 mx-auto h-screen">
      <Header onHowItWorksClick={scrollToSection}/>
      <HeroScroll/>
      {/* <div ref={howItWorks}>  */}
      <HowItWorks ref={howItWorks} steps={steps} />
      {/* </div> */}
      <UpgradePage/>
      <Testimonial/>
      <Footer/>
      <CreateSubscription/>
    </section>
    
    
  );
}
