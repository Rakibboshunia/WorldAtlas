"use client";
import { useState } from "react";
import countryFacts from "../api/countryData.json";
import { motion } from "framer-motion";
import { FaSearch } from "react-icons/fa";

const cardAccents = [
  {
    bar: "bg-[linear-gradient(90deg,#3b82f6,#8b5cf6)]",
    border: "border-[rgba(59,130,246,0.18)]",
    hover: "hover:shadow-[0_20px_50px_rgba(59,130,246,0.15)]",
  },
  {
    bar: "bg-[linear-gradient(90deg,#10b981,#34d399)]",
    border: "border-[rgba(16,185,129,0.18)]",
    hover: "hover:shadow-[0_20px_50px_rgba(16,185,129,0.15)]",
  },
  {
    bar: "bg-[linear-gradient(90deg,#f59e0b,#fb923c)]",
    border: "border-[rgba(245,158,11,0.18)]",
    hover: "hover:shadow-[0_20px_50px_rgba(245,158,11,0.15)]",
  },
  {
    bar: "bg-[linear-gradient(90deg,#8b5cf6,#f43f5e)]",
    border: "border-[rgba(139,92,246,0.18)]",
    hover: "hover:shadow-[0_20px_50px_rgba(139,92,246,0.15)]",
  },
];

export const About = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [visibleCount, setVisibleCount] = useState(6);

  const filteredFacts = countryFacts.filter((c) => {
    const q = searchTerm.toLowerCase();
    return (
      c.countryName.toLowerCase().includes(q) ||
      c.capital.toLowerCase().includes(q) ||
      c.interestingFact.toLowerCase().includes(q)
    );
  });

  return (
    <section className="max-w-[1400px] mx-auto px-6 lg:px-8 py-20">
      {/* Header */}
      <div className="text-center mb-12">
        <span className="section-label mx-auto justify-center">✦ World Facts</span>
        <motion.h2
          className="text-text-primary font-bold font-heading text-[clamp(2rem,3.5vw,2.8rem)]"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          Interesting Facts
          <br />
          <span className="gradient-text">We're Proud Of</span>
        </motion.h2>
        <motion.p
          className="text-sm mt-4 max-w-md mx-auto text-text-muted"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          Fascinating trivia, capitals, and unique details about nations across the globe.
        </motion.p>
      </div>

      {/* Search */}
      <div className="relative max-w-xl mx-auto mb-10">
        <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-sm text-[#4a6280]" />
        <input
          type="text"
          placeholder="Search by country, capital, or fact..."
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setVisibleCount(6);
          }}
          className={`input-field pl-[2.75rem] ${searchTerm ? "pr-[4rem]" : "pr-4"}`}
        />
        {searchTerm && (
          <span className="absolute right-4 top-1/2 -translate-y-1/2 px-2.5 py-0.5 rounded-full text-xs font-semibold text-white bg-[rgba(59,130,246,0.5)]">
            {filteredFacts.length}
          </span>
        )}
      </div>

      {/* Cards */}
      {filteredFacts.length === 0 ? (
        <div className="text-center py-20">
          <div className="text-5xl mb-4">🔍</div>
          <p className="text-sm text-text-muted">
            No facts match your search. Try another query!
          </p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredFacts.slice(0, visibleCount).map((country, idx) => {
              const { id, countryName, capital, population, interestingFact } = country;
              const accent = cardAccents[idx % cardAccents.length];
              return (
                <motion.div
                  key={id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: idx * 0.04 }}
                  whileHover={{ y: -7 }}
                  className={`bento-card relative transition-all duration-300 border ${accent.border} ${accent.hover}`}
                >
                  {/* Top accent bar */}
                  <div className={`absolute top-0 left-0 w-full h-[2px] ${accent.bar}`} />
                  <div className="p-5 pt-6">
                    <h3 className="text-text-primary font-bold text-lg mb-4 font-heading">
                      {countryName}
                    </h3>
                    <div className="flex flex-col gap-2.5">
                      {[
                        { label: "Capital", value: capital },
                        { label: "Population", value: population },
                      ].map(({ label, value }) => (
                        <div
                          key={label}
                          className="flex justify-between items-center py-1.5 border-b border-[rgba(59,130,246,0.06)]"
                        >
                          <span className="text-xs font-bold uppercase tracking-wider text-text-muted text-[0.62rem]">
                            {label}
                          </span>
                          <span className="text-slate-300 text-sm font-medium">{value}</span>
                        </div>
                      ))}
                      <div className="pt-2">
                        <span className="text-xs font-bold uppercase tracking-wider block mb-2 text-text-muted text-[0.62rem]">
                          Interesting Fact
                        </span>
                        <p className="text-sm leading-relaxed italic text-[#8ba3c7]">
                          {interestingFact}
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Actions */}
          <div className="flex justify-center gap-4 mt-10">
            {visibleCount < filteredFacts.length && (
              <button
                onClick={() => setVisibleCount((p) => Math.min(p + 6, filteredFacts.length))}
                className="btn-primary"
              >
                Load More Facts
              </button>
            )}
            {visibleCount > 6 && (
              <button
                onClick={() => setVisibleCount(6)}
                className="btn-ghost"
              >
                Show Less
              </button>
            )}
          </div>
        </>
      )}
    </section>
  );
};
