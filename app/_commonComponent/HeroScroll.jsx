
"use client";

import React from 'react'
import Image from "next/image";
import { ContainerScroll } from '../../components/ui/container-scroll-animation';
import { MovingBorderDemo } from './MovingBorderDemo';


function HeroScroll() {

  return (
    <section >
       <div className="flex flex-col overflow-hidden mt-20">
      <ContainerScroll
      
        titleComponent={
          <>
            <h1 className="text-4xl font-semibold text-white dark:text-black ">
            Master Your Interviews <br />
              <span className="text-6xl md:text-[6rem] font-bold mt-1 leading-none">
              MockMaster-AI
              </span>
            </h1>
            
      
            <section className=' my-8 flex justify-center'>
            <MovingBorderDemo 
            text='Book Demo'
            className='text-sm text-white'
            containerClassName='h-10 w-28'/>
            
            
            
            </section>
            
          
           
          </>
        }
      >
        
        <Image
          src={`/interviewimg.webp`}
          alt="Interview Image"
          height={720}
          width={1400}
          className="mx-auto rounded-2xl object-cover h-full object-left-top"
          draggable={false}
          priority = {true}
        />
      </ContainerScroll>
    </div>
    </section>
  )
}

export default HeroScroll;
