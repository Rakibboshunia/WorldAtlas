"use client";
import { RiEarthLine } from "react-icons/ri";
import { motion } from "framer-motion";

export const Loader = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] gap-5">
      {/* Globe + rings */}
      <div className="relative flex items-center justify-center">
        {/* Outer ring */}
        <div className="loader-ring-outer" />
        {/* Inner ring */}
        <div className="loader-ring-inner absolute" />
        {/* Center globe */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
          className="absolute flex items-center justify-center"
        >
          <RiEarthLine className="text-[1.6rem] text-[#3b82f6] drop-shadow-[0_0_8px_rgba(59,130,246,0.6)]" />
        </motion.div>
      </div>

      {/* Text */}
      <div className="flex flex-col items-center gap-1">
        <motion.span
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          className="font-[family-name:var(--font-body)] text-[0.7rem] font-bold tracking-[0.2em] uppercase text-[#4a6280]"
        >
          Exploring the world...
        </motion.span>
      </div>
    </div>
  );
};
