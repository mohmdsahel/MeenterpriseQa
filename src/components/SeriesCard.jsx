import React, { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";

import { testimonials } from "../constants";

export const SeriesCard = ({
  items,
  direction = "left", // Default direction is now left

  pauseOnHover = true,
  className,
}) => {
  const containerRef = useRef(null);
  const scrollerRef = useRef(null);
  const [start, setStart] = useState(false);

  useEffect(() => {
    addAnimation();
  }, []);

  function addAnimation() {
    if (containerRef.current && scrollerRef.current) {
      const scrollerContent = Array.from(scrollerRef.current.children);

      scrollerContent.forEach((item) => {
        const duplicatedItem = item.cloneNode(true);
        if (scrollerRef.current) {
          scrollerRef.current.appendChild(duplicatedItem);
        }
      });

      getDirection();
      getSpeed();
      setStart(true);
    }
  }

  const getDirection = () => {
    if (containerRef.current) {
      if (direction === "left") {
        containerRef.current.style.setProperty(
          "--animation-direction",
          "forwards"
        );
      } else {
        containerRef.current.style.setProperty(
          "--animation-direction",
          "reverse"
        );
      }
    }
  };

  const getSpeed = () => {
    if (containerRef.current) {
      containerRef.current.style.setProperty("--animation-duration", "200s");
    }
  };

  const mergeClasses = (...classes) => classes.filter(Boolean).join(' ');

  return (
    <div

      ref={containerRef}
      className={mergeClasses(
        "relative z-20 max-w-7xl overflow-hidden",
        "mask-linear-gradient",
        className
      )}
      style={{
        maskImage: "linear-gradient(to right, transparent, white 20%, white 80%, transparent)",
        '--transform-direction': 'translateX(-50%)', // Add this line
      }}
    >
      <motion.ul
        ref={scrollerRef}
        className={mergeClasses(
          "flex w-max min-w-full shrink-0 flex-nowrap gap-4 py-4",
          start && "animate-scroll"
        )}
        style={{
          animation: start ? `scroll var(--animation-duration) forwards linear infinite` : "none",
          // Animation runs if start is true, paused otherwise
          animationPlayState: start ? "running" : "paused",
        }}
        // Pause animation on hover if pauseOnHover is true
        whileHover={pauseOnHover ? { animationPlayState: "paused" } : {}}
        // Pause animation on tap if pauseOnHover is true
        whileTap={pauseOnHover ? { animationPlayState: "paused" } : {}}
      >
        {items.map((item, idx) => (
          <motion.li
            // Updated card background gradient to Dark background (using new color name)
            // Updated border color to Dark background (using new color name)
            // Increased card width slightly for all breakpoints
            className="relative w-[320px] max-w-full shrink-0 rounded-xl sm:rounded-2xl border border-b-0 border-color-5/20 bg-gradient-to-br from-color-5/90 to-color-5/70 backdrop-blur-sm sm:w-[400px] md:w-[500px] shadow-2xl overflow-hidden"
            key={item.title}
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <div className="flex flex-row items-center">
              <div className="w-2/3 p-2 sm:p-4">
                {/* Updated title color to Off-white (using new color name) */}
                <h3 className="text-lg sm:text-xl font-bold text-color-4/90 mb-1 sm:mb-2">
                  {item.name}
                </h3>
                <div className="relative z-20 mt-2 sm:mt-4 flex flex-row items-center">
                  <span className="flex flex-col gap-1">
                    {/* Updated text color to Vibrant Magenta (using new color name) */}
                    <span className="text-xs sm:text-sm leading-[1.6] font-medium text-color-2/80">
                      {item.title}
                    </span>
                    {/* Updated role text color to Vibrant Magenta (using new color name) */}
                    <span className="text-xs sm:text-sm leading-[1.6] font-normal text-color-2/80 italic">
                      {item.role}
                    </span>
                  </span>
                </div>
              </div>
              <div className="w-1/3 h-full">
                <img
                  src={item.img}
                  alt={item.name}
                  className="w-full h-[170px] sm:h-full object-cover object-center"
                />
              </div>
            </div>
          </motion.li>
        ))}
      </motion.ul>
    </div>
  );
};

export default function SeriesCardDemo() {
  return (
    <div className="h-fit rounded-md flex flex-col items-center justify-center relative overflow-hidden">
      <SeriesCard
        items={testimonials}
        direction="left"
        pauseOnHover={true}
      />
    </div>
  );
}