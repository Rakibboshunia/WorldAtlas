import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";
import { FaArrowRight } from "react-icons/fa";

const regionStyles = {
  Africa:    "bg-[rgba(245,158,11,0.15)] border-[rgba(245,158,11,0.35)] text-[#f59e0b]",
  Americas:  "bg-[rgba(16,185,129,0.15)] border-[rgba(16,185,129,0.35)] text-[#10b981]",
  Asia:      "bg-[rgba(139,92,246,0.15)] border-[rgba(139,92,246,0.35)] text-[#8b5cf6]",
  Europe:    "bg-[rgba(59,130,246,0.15)] border-[rgba(59,130,246,0.35)] text-[#3b82f6]",
  Oceania:   "bg-[rgba(244,63,94,0.15)] border-[rgba(244,63,94,0.35)] text-[#f43f5e]",
  Antarctic: "bg-[rgba(148,163,184,0.15)] border-[rgba(148,163,184,0.35)] text-[#94a3b8]",
};

const getRegionStyle = (region) =>
  regionStyles[region] || "bg-[rgba(255,255,255,0.08)] border-[rgba(255,255,255,0.2)] text-[#94a3b8]";

export const CountryCard = ({ country, viewMode = "grid" }) => {
  const { flags, name, population, region, capital } = country;
  const rs = getRegionStyle(region);

  if (viewMode === "list") {
    return (
      <motion.li
        className="list-none"
        initial={{ opacity: 0, x: -16 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.35 }}
        whileHover={{ x: 3 }}
      >
        <div
          className="flex items-center gap-0 rounded-2xl overflow-hidden transition-all duration-300 group bento-card hover:border-[rgba(59,130,246,0.35)] hover:shadow-[0_0_30px_rgba(59,130,246,0.1),0_10px_30px_rgba(0,0,0,0.3)]"
        >
          {/* Flag */}
          <div className="w-36 h-24 flex-shrink-0 overflow-hidden relative">
            <img
              src={flags.svg}
              alt={flags.alt || `Flag of ${name.common}`}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div
              className="absolute inset-0 bg-[linear-gradient(to_right,transparent_70%,rgba(9,20,40,0.8))]"
            />
          </div>

          {/* Content */}
          <div className="flex flex-1 items-center gap-6 py-3 px-5 flex-wrap">
            <span
              className="font-bold text-text-primary text-base min-w-[9rem] font-heading"
              title={name.common}
            >
              {name.common.length > 22 ? name.common.slice(0, 20) + "…" : name.common}
            </span>

            <div className="flex gap-6 flex-1 flex-wrap text-xs">
              <div>
                <span className="block font-bold uppercase tracking-wider mb-0.5 text-text-muted text-[0.65rem]">Population</span>
                <span className="text-slate-300 font-medium">{population.toLocaleString()}</span>
              </div>
              <div>
                <span className="block font-bold uppercase tracking-wider mb-0.5 text-text-muted text-[0.65rem]">Capital</span>
                <span className="text-slate-300 font-medium">{capital?.[0] || "N/A"}</span>
              </div>
              <div>
                <span className="block font-bold uppercase tracking-wider mb-0.5 text-text-muted text-[0.65rem]">Region</span>
                <span className={`pill-badge text-[0.6rem] border ${rs}`}>
                  {region}
                </span>
              </div>
            </div>

            <NavLink to={`/country/${name.common}`}>
              <button
                className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all duration-200 bg-[rgba(59,130,246,0.08)] border border-[rgba(59,130,246,0.2)] text-[#60a5fa] font-body hover:bg-[rgba(59,130,246,0.2)] hover:text-white"
              >
                Details <FaArrowRight className="text-[0.6rem]" />
              </button>
            </NavLink>
          </div>
        </div>
      </motion.li>
    );
  }

  return (
    <motion.li
      className="list-none"
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      whileHover={{ y: -7 }}
    >
      <div
        className="rounded-2xl overflow-hidden h-full flex flex-col transition-all duration-300 group relative bento-card hover:border-[rgba(59,130,246,0.4)] hover:shadow-[0_0_0_1px_rgba(59,130,246,0.15),0_25px_60px_rgba(59,130,246,0.12),0_10px_30px_rgba(0,0,0,0.4)]"
      >
        {/* Flag */}
        <div className="relative h-48 overflow-hidden">
          <img
            src={flags.svg}
            alt={flags.alt || `Flag of ${name.common}`}
            className="w-full h-full object-cover transition-transform duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] group-hover:scale-110"
          />
          {/* Gradient overlay */}
          <div
            className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent_40%,rgba(9,20,40,0.9)_100%)]"
          />
          {/* Country name overlaid */}
          <div className="absolute bottom-0 left-0 right-0 p-3">
            <h3
              className="text-text-primary font-bold text-base truncate font-heading drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]"
              title={name.common}
            >
              {name.common}
            </h3>
          </div>
          {/* Region badge */}
          <div className="absolute top-3 right-3">
            <span
              className={`pill-badge text-[0.6rem] backdrop-blur-md border ${rs}`}
            >
              {region}
            </span>
          </div>
        </div>

        {/* Info */}
        <div className="flex flex-col flex-1 px-4 pt-3 pb-4">
          <div className="flex flex-col gap-2 flex-1">
            {[
              { label: "Population", value: population.toLocaleString() },
              { label: "Capital", value: capital?.[0] || "N/A" },
            ].map(({ label, value }) => (
              <div
                key={label}
                className="flex justify-between items-center py-1.5 border-b border-[rgba(59,130,246,0.06)]"
              >
                <span
                  className="text-xs font-bold uppercase tracking-wider text-text-muted text-[0.62rem]"
                >
                  {label}
                </span>
                <span className="text-slate-300 text-xs font-medium">{value}</span>
              </div>
            ))}
          </div>

          <NavLink to={`/country/${name.common}`} className="mt-4 block">
            <button
              className="w-full py-2.5 rounded-xl text-xs font-semibold transition-all duration-300 flex items-center justify-center gap-2 group/btn font-body bg-[rgba(59,130,246,0.08)] border border-[rgba(59,130,246,0.18)] text-[#60a5fa] hover:bg-[linear-gradient(135deg,#3b82f6_0%,#6d28d9_100%)] hover:text-white hover:border-transparent hover:shadow-[0_4px_15px_rgba(59,130,246,0.35)]"
            >
              View Details <FaArrowRight className="text-[0.6rem]" />
            </button>
          </NavLink>
        </div>
      </div>
    </motion.li>
  );
};
