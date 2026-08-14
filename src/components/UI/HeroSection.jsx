import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";
import { FaArrowRight, FaGlobeAmericas, FaUsers, FaMapMarkedAlt } from "react-icons/fa";
import { RiEarthLine } from "react-icons/ri";

const stats = [
  { icon: <FaGlobeAmericas />, value: "250+", label: "Nations", color: "text-[#3b82f6]", border: "border-[#3b82f6]/20" },
  { icon: <FaUsers />, value: "8B+", label: "People", color: "text-[#8b5cf6]", border: "border-[#8b5cf6]/20" },
  { icon: <FaMapMarkedAlt />, value: "7", label: "Regions", color: "text-[#f59e0b]", border: "border-[#f59e0b]/20" },
];

export const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-[#020917] -mt-16 pt-16">
      {/* Animated mesh background orbs */}
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
      >
        {/* Primary blue orb */}
        <div
          className="absolute glow-orb top-[5%] -left-[10%] w-[55rem] h-[55rem] rounded-full bg-[radial-gradient(circle,rgba(59,130,246,0.18)_0%,transparent_65%)] blur-[70px] animate-[neon-pulse_4s_ease-in-out_infinite]"
        />
        {/* Violet orb */}
        <div
          className="absolute glow-orb bottom-0 -right-[8%] w-[45rem] h-[45rem] rounded-full bg-[radial-gradient(circle,rgba(139,92,246,0.14)_0%,transparent_65%)] blur-[60px] animate-[neon-pulse_4s_ease-in-out_infinite]"
          style={{ animationDelay: "2s" }}
        />
        {/* Gold accent orb */}
        <div
          className="absolute top-[55%] left-[45%] w-[25rem] h-[25rem] rounded-full bg-[radial-gradient(circle,rgba(245,158,11,0.07)_0%,transparent_65%)] blur-[50px]"
        />

        {/* Grid lines */}
        <svg
          className="absolute inset-0 w-full h-full opacity-[0.03]"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <pattern id="hero-grid" width="60" height="60" patternUnits="userSpaceOnUse">
              <path d="M 60 0 L 0 0 0 60" fill="none" stroke="#3b82f6" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#hero-grid)" />
        </svg>

        {/* Floating particles */}
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className={`absolute rounded-full opacity-50 ${i % 3 === 0 ? "bg-[#3b82f6]" : i % 3 === 1 ? "bg-[#8b5cf6]" : "bg-[#f59e0b]"}`}
            style={{
              width: `${3 + (i % 4)}px`,
              height: `${3 + (i % 4)}px`,
              left: `${8 + i * 8}%`,
              animation: `particle-float ${6 + i * 0.7}s ease-in-out infinite`,
              animationDelay: `${i * 0.4}s`,
            }}
          />
        ))}
      </div>

      {/* Globe decoration */}
      <div className="absolute -right-[5%] top-1/2 -translate-y-1/2 pointer-events-none hidden lg:block opacity-[0.06]">
        <RiEarthLine className="text-[32rem] text-[#3b82f6]" />
      </div>

      {/* Content */}
      <div className="max-w-[1400px] mx-auto px-6 lg:px-8 w-full relative z-10">
        <div className="max-w-[820px] pt-24 pb-16 md:pt-32 md:pb-24">

          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-8 bg-[rgba(59,130,246,0.1)] border border-[rgba(59,130,246,0.25)] text-[#60a5fa] text-[0.7rem] font-bold tracking-[0.12em] uppercase"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#10b981] shadow-[0_0_6px_#10b981] animate-[neon-pulse_1.5s_ease-in-out_infinite]" />
            Live World Data · 250+ Countries
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="mb-6 leading-[1.05] font-heading text-[clamp(3.2rem,7vw,6.5rem)] font-bold tracking-[-0.03em]"
          >
            <span className="text-text-primary">Explore</span>{" "}
            <span className="shimmer-text">Every Nation</span>
            <br />
            <span className="text-white">on Earth.</span>
          </motion.h1>

          {/* Sub-text */}
          <motion.p
            className="mb-10 leading-relaxed text-[clamp(1rem,2vw,1.15rem)] max-w-[560px] text-text-secondary font-body"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            Discover the history, culture, and geography of every country and
            territory. Search, filter, and dive deep into global data.
          </motion.p>

          {/* CTAs */}
          <motion.div
            className="flex flex-wrap gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.45 }}
          >
            <NavLink to="/country">
              <motion.button
                whileHover={{ scale: 1.04, y: -2 }}
                whileTap={{ scale: 0.97 }}
                className="btn-primary"
              >
                Start Exploring <FaArrowRight className="text-xs" />
              </motion.button>
            </NavLink>
            <NavLink to="/about">
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="btn-ghost"
              >
                World Facts
              </motion.button>
            </NavLink>
          </motion.div>

          {/* Stats */}
          <motion.div
            className="flex flex-wrap gap-4 mt-14 pt-10 border-t border-[rgba(59,130,246,0.1)]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.65 }}
          >
            {stats.map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.7 + i * 0.12 }}
                className={`flex items-center gap-3 px-5 py-3 rounded-2xl bg-[rgba(9,20,40,0.8)] border ${s.border} backdrop-blur-md`}
              >
                <span className={`text-[1.2rem] ${s.color}`}>{s.icon}</span>
                <div>
                  <div className="font-bold text-text-primary text-xl leading-none font-heading">
                    {s.value}
                  </div>
                  <div className="text-xs mt-0.5 text-text-muted font-semibold tracking-[0.06em]">
                    {s.label}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 w-full h-32 pointer-events-none bg-[linear-gradient(to_bottom,transparent,#020917)]" />
    </section>
  );
};
