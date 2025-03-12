"use client";

import React, { useEffect, useRef, useState } from "react";

const testimonials = [
    {
      id: 1,
      name: "Rahul Mehta",
      position: "Software Engineer at Google",
      testimonial:
        "The AI mock interviews felt like a real tech interview. The feedback was incredibly detailed and helped me land my dream job!",
      avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    },
    {
      id: 2,
      name: "Priya Sharma",
      position: "Data Scientist at Microsoft",
      testimonial:
        "This platform gave me an edge in my job search. The AI interviewer asked real-world ML questions, just like my final round at Microsoft!",
      avatar: "https://randomuser.me/api/portraits/women/46.jpg",
    },
    {
      id: 3,
      name: "Amit Raj",
      position: "Backend Developer at Amazon",
      testimonial:
        "The AI-driven coding interviews are top-notch. The system identified my weak areas and provided solutions to improve.",
      avatar: "https://randomuser.me/api/portraits/men/50.jpg",
    },
    {
      id: 4,
      name: "Neha Kapoor",
      position: "Product Manager at Meta",
      testimonial:
        "I loved how realistic the AI behavioral interview was. It prepared me for the actual leadership round with confidence!",
      avatar: "https://randomuser.me/api/portraits/women/30.jpg",
    },
    {
      id: 5,
      name: "Sandeep Verma",
      position: "Full Stack Developer at Flipkart",
      testimonial:
        "The AI interviewer provided real-time hints and detailed feedback on my DSA solutions. Definitely a must-have for job seekers!",
      avatar: "https://randomuser.me/api/portraits/men/10.jpg",
    },
    {
      id: 6,
      name: "Riya Sen",
      position: "AI Researcher at NVIDIA",
      testimonial:
        "This platform is a game-changer! The deep learning technical round was on point, covering everything from CNNs to transformers.",
      avatar: "https://randomuser.me/api/portraits/women/20.jpg",
    },
    {
      id: 7,
      name: "Vikram Joshi",
      position: "DevOps Engineer at IBM",
      testimonial:
        "The AI-driven mock system not only tested my technical knowledge but also my DevOps problem-solving skills in real-world scenarios.",
      avatar: "https://randomuser.me/api/portraits/men/28.jpg",
    },
  ];
  



const Testimonial = () => {

  const scrollRef = useRef(null);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    let scrollSpeed = 1;
    let animationFrame;

    const autoScroll = () => {
      if (!isPaused) {
        scrollContainer.scrollLeft += scrollSpeed;

        // Seamless infinite scroll effect
        if (scrollContainer.scrollLeft >= scrollContainer.scrollWidth / 2) {
          scrollContainer.scrollLeft = 0;
        }
      }
      animationFrame = requestAnimationFrame(autoScroll);
    };

    animationFrame = requestAnimationFrame(autoScroll);

    return () => cancelAnimationFrame(animationFrame);
  }, [isPaused]);


  return (

    <div className="bg-neutral-950 p-10">
      <div className=" mx-auto">
        <h2 className="text-3xl font-semibold text-center text-white mb-6">
          What Our Users Say
        </h2>

        {/* Scrollable Container */}
        <div 
        
          ref={scrollRef}
          className="flex space-x-6 overflow-hidden p-4 "
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {testimonials.concat(testimonials).map((testi, index) => (
            <div
              key={index}
              className="bg-[#161B22] text-white p-6 rounded-xl shadow-lg min-w-[300px] transition-transform duration-500"
            >
              <div className="flex items-center space-x-4 mb-4">
                <img
                  className="w-16 h-16 rounded-full border-2 border-[#30363D]"
                  src={testi.avatar}
                  alt={testi.name}
                />
                <div>
                  <p className="text-lg font-semibold">{testi.name}</p>
                  <p className="text-sm text-gray-400">{testi.position}</p>
                </div>
              </div>
              <p className="text-gray-300">{testi.testimonial}</p>
            </div>
          ))}
        </div>

        {/* Button */}
        <div className="text-center mt-8">
          <button className="bg-[#1F6FEB] hover:bg-[#1159C7] text-white font-bold px-10 py-3 rounded-full">
            Learn More
          </button>
        </div>
      </div>
    </div>
  );
};

export default Testimonial;
