"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";



const HowItWorks = ({ steps }) => {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  
  return (
    <div className="relative bg-neutral-950 text-white font-sans   px-6 md:px-20">
      {/* Header */}
      <h1 className="text-center text-4xl font-bold mb-4">It's easy as 1, 2, 3</h1>
      <p className="text-center text-lg mb-10">
        Our AI Mock Interview platform helps you prepare effectively.
      </p>

      {/* Steps */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {steps.map((step, idx) => (
          <div
            key={idx}
            className="relative group p-4 rounded-2xl border border-transparent bg-[#161B22] dark:border-white/[0.2] overflow-hidden"
            onMouseEnter={() => setHoveredIndex(idx)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            {/* Background Shadow Effect */}
            <AnimatePresence>
              {hoveredIndex === idx && (
                <motion.div
                  className="absolute inset-0 bg-gradient-to-b from-black/10 to-black/30 rounded-2xl shadow-2xl"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{
                    opacity: 1,
                    scale: 1,
                    transition: { duration: 0.3, ease: "easeInOut" },
                  }}
                  exit={{
                    opacity: 0,
                    scale: 0.95,
                    transition: { duration: 0.3, ease: "easeInOut" },
                  }}
                ></motion.div>
              )}
            </AnimatePresence>

            {/* Content */}
            <div className="relative z-10 p-6">
              <h4 className="text-xl font-bold tracking-wide">{step.title}</h4>
              <p className="mt-4 text-sm text-zinc-400">{step.description}</p>
              <p className="mt-6 text-lg font-semibold">{step.duration}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HowItWorks;
