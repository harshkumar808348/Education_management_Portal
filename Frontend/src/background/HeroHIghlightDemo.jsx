import React from 'react';
import { motion } from "framer-motion";
import { HeroHighlight, Highlight } from "../../components/ui/hero-highlight"; // Adjust path if needed
import BackgroundImage from "../assets/9933548.PNG"; // Adjust path if needed

export default function HeroHighlightDemo() {
  return (
    <HeroHighlight>
      <motion.div
        initial={{
          opacity: 0,
          y: 20,
        }}
        animate={{
          opacity: 1,
          y: [20, -5, 0],
        }}
        transition={{
          duration: 0.5,
          ease: [0.4, 0.0, 0.2, 1],
        }}
        className="text-2xl px-4 md:text-4xl lg:text-5xl font-bold text-neutral-700 dark:text-white max-w-4xl leading-relaxed lg:leading-snug text-center mx-auto"
      >
        <img
          src={BackgroundImage}
          alt="Background"
          className="object-top-left w-108 h-64 rounded-lg"
        />
        Clear all your doubts with expert guidance{" "}
        <Highlight className="text-black dark:text-white">Just Free</Highlight>
      </motion.div>
    </HeroHighlight>
  );
}
