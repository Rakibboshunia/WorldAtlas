"use client";
import Link from "next/link";
import { FaHome } from "react-icons/fa";
import { motion } from "framer-motion";
import { RiEarthLine } from "react-icons/ri";

export const ErrorPage = ({ error }) => {
  console.error("Route Error:", error);

  return (
    <div className="min-h-screen flex items-center justify-center p-6 relative overflow-hidden bg-[#020917]">
      {/* Ambient blobs */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[50rem] h-[50rem] rounded-full pointer-events-none bg-[radial-gradient(circle,rgba(59,130,246,0.07)_0%,transparent_65%)] blur-[70px]" />
      <div className="absolute top-0 right-0 w-[25rem] h-[25rem] rounded-full pointer-events-none bg-[radial-gradient(circle,rgba(244,63,94,0.07)_0%,transparent_65%)] blur-[60px]" />

      {/* Grid */}
      <svg className="absolute inset-0 w-full h-full opacity-[0.025]" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="err-grid" width="60" height="60" patternUnits="userSpaceOnUse">
            <path d="M 60 0 L 0 0 0 60" fill="none" stroke="#3b82f6" strokeWidth="1" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#err-grid)" />
      </svg>

      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative text-center max-w-lg w-full p-10 rounded-3xl bg-[rgba(9,20,40,0.85)] backdrop-blur-[20px] border border-[rgba(244,63,94,0.2)] shadow-[0_0_60px_rgba(244,63,94,0.08),0_40px_80px_rgba(0,0,0,0.5)]"
      >
        {/* Globe icon */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="flex justify-center mb-6"
        >
          <RiEarthLine className="text-[4rem] text-[#f43f5e] drop-shadow-[0_0_20px_rgba(244,63,94,0.5)]" />
        </motion.div>

        {/* 404 glitch number */}
        <div className="relative mb-4 inline-block">
          <p
            data-text="404"
            className="glitch-text font-bold font-[family-name:var(--font-heading)] text-[7rem] leading-none text-[#f0f6ff] tracking-[-0.04em]"
          >
            404
          </p>
        </div>

        <h1 className="text-white font-bold text-xl mb-3 font-[family-name:var(--font-heading)]">
          Page Not Found
        </h1>
        <p className="text-sm mb-6 leading-relaxed text-[#4a6280]">
          We couldn't find the page you were looking for, or an unexpected error occurred on your journey.
        </p>

        {error && (
          <div className="text-left p-3 rounded-xl mb-6 bg-[rgba(244,63,94,0.06)] border border-[rgba(244,63,94,0.2)] border-l-[3px] border-l-[#f43f5e]">
            <p className="text-xs font-mono text-[#f87171]">
              {error.statusText || error.message || error.data}
            </p>
          </div>
        )}

        <Link href="/">
          <motion.button
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.97 }}
            className="btn-primary justify-center w-full"
          >
            <FaHome /> Back to Home
          </motion.button>
        </Link>

        <p className="text-xs mt-4 text-[#2e4060]">
          Or explore our{" "}
          <Link href="/country" className="transition-colors text-[#3b82f6] hover:text-[#60a5fa]">
            Country Explorer
          </Link>
        </p>
      </motion.div>
    </div>
  );
};