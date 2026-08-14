import { useEffect, useState } from "react";
import { HeroSection } from "../components/UI/HeroSection";
import { About } from "./About";
import { getCountryData } from "../api/postApi";
import { CountryCard } from "../components/Layout/CountryCard";
import { motion } from "framer-motion";
import {
  FaGlobe, FaSearchLocation, FaChartPie, FaArrowRight,
  FaMountain, FaWater, FaCity,
} from "react-icons/fa";
import { NavLink } from "react-router-dom";

const features = [
  {
    icon: <FaGlobe />,
    title: "250+ Nations",
    desc: "Comprehensive data for every country and territory on Earth.",
    iconCls: "bg-[linear-gradient(135deg,#3b82f6,#6d28d9)] shadow-[0_8px_24px_rgba(59,130,246,0.25)]",
    border: "border-[rgba(59,130,246,0.2)]",
    bar: "bg-[linear-gradient(90deg,#3b82f6,#8b5cf6)]",
    hover: "hover:shadow-[0_20px_50px_rgba(59,130,246,0.25)]",
  },
  {
    icon: <FaSearchLocation />,
    title: "Smart Filtering",
    desc: "Instantly sort, search, and navigate through global geographic zones.",
    iconCls: "bg-[linear-gradient(135deg,#10b981,#0d9488)] shadow-[0_8px_24px_rgba(16,185,129,0.25)]",
    border: "border-[rgba(16,185,129,0.2)]",
    bar: "bg-[linear-gradient(90deg,#10b981,#34d399)]",
    hover: "hover:shadow-[0_20px_50px_rgba(16,185,129,0.25)]",
  },
  {
    icon: <FaChartPie />,
    title: "Live Demographics",
    desc: "Access up-to-date population, currency, and border statistics.",
    iconCls: "bg-[linear-gradient(135deg,#f59e0b,#d97706)] shadow-[0_8px_24px_rgba(245,158,11,0.25)]",
    border: "border-[rgba(245,158,11,0.2)]",
    bar: "bg-[linear-gradient(90deg,#f59e0b,#fb923c)]",
    hover: "hover:shadow-[0_20px_50px_rgba(245,158,11,0.25)]",
  },
];

const regionCards = [
  {
    name: "Africa", count: "54", icon: <FaMountain />,
    cls: "bg-[rgba(245,158,11,0.08)] border-[rgba(245,158,11,0.2)] hover:border-[rgba(245,158,11,0.5)] hover:shadow-[0_16px_40px_rgba(245,158,11,0.12)]",
    iconCls: "bg-[rgba(245,158,11,0.15)] text-[#f59e0b]",
    textCls: "text-[#f59e0b]",
  },
  {
    name: "Americas", count: "57", icon: <FaCity />,
    cls: "bg-[rgba(16,185,129,0.08)] border-[rgba(16,185,129,0.2)] hover:border-[rgba(16,185,129,0.5)] hover:shadow-[0_16px_40px_rgba(16,185,129,0.12)]",
    iconCls: "bg-[rgba(16,185,129,0.15)] text-[#10b981]",
    textCls: "text-[#10b981]",
  },
  {
    name: "Asia", count: "49", icon: <FaGlobe />,
    cls: "bg-[rgba(139,92,246,0.08)] border-[rgba(139,92,246,0.2)] hover:border-[rgba(139,92,246,0.5)] hover:shadow-[0_16px_40px_rgba(139,92,246,0.12)]",
    iconCls: "bg-[rgba(139,92,246,0.15)] text-[#8b5cf6]",
    textCls: "text-[#8b5cf6]",
  },
  {
    name: "Europe", count: "44", icon: <FaCity />,
    cls: "bg-[rgba(59,130,246,0.08)] border-[rgba(59,130,246,0.2)] hover:border-[rgba(59,130,246,0.5)] hover:shadow-[0_16px_40px_rgba(59,130,246,0.12)]",
    iconCls: "bg-[rgba(59,130,246,0.15)] text-[#3b82f6]",
    textCls: "text-[#3b82f6]",
  },
  {
    name: "Oceania", count: "27", icon: <FaWater />,
    cls: "bg-[rgba(244,63,94,0.08)] border-[rgba(244,63,94,0.2)] hover:border-[rgba(244,63,94,0.5)] hover:shadow-[0_16px_40px_rgba(244,63,94,0.12)]",
    iconCls: "bg-[rgba(244,63,94,0.15)] text-[#f43f5e]",
    textCls: "text-[#f43f5e]",
  },
];

export const Home = () => {
  const [featured, setFeatured] = useState([]);

  useEffect(() => {
    const fetchFeatured = async () => {
      try {
        const res = await getCountryData();
        const interestingNames = ["Japan", "Switzerland", "Brazil", "Australia"];
        const interestingCountries = res.data.filter((c) =>
          interestingNames.includes(c.name.common)
        );
        setFeatured(
          interestingCountries.length > 0
            ? interestingCountries
            : res.data.slice(0, 4)
        );
      } catch (err) {
        console.error("Failed to load featured countries:", err);
      }
    };
    fetchFeatured();
  }, []);

  return (
    <>
      <HeroSection />

      {/* Features Bento */}
      <section className="max-w-[1400px] mx-auto px-6 lg:px-8 -mt-6 relative z-10 mb-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.12 }}
              whileHover={{ y: -8 }}
              className={`relative rounded-2xl overflow-hidden p-6 text-center transition-all duration-300 bg-[rgba(9,20,40,0.85)] border ${f.border} ${f.hover}`}
            >
              {/* Top accent bar */}
              <div className={`absolute top-0 left-0 w-full h-[2px] ${f.bar}`} />
              {/* Icon */}
              <div className={`inline-flex items-center justify-center w-14 h-14 rounded-2xl text-white text-2xl mb-5 mx-auto ${f.iconCls}`}>
                {f.icon}
              </div>
              <h3 className="text-white font-bold text-lg mb-2 font-[family-name:var(--font-heading)]">
                {f.title}
              </h3>
              <p className="text-sm leading-relaxed text-[#4a6280]">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Featured Countries */}
      {featured.length > 0 && (
        <section className="max-w-[1400px] mx-auto px-6 lg:px-8 mb-24">
          <div className="mb-10">
            <span className="section-label">✦ Featured</span>
            <motion.h2
              className="text-white font-bold font-[family-name:var(--font-heading)] text-[clamp(1.8rem,3vw,2.5rem)]"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              Trending{" "}
              <span className="bg-[linear-gradient(135deg,#3b82f6,#8b5cf6)] bg-clip-text text-transparent">
                Destinations
              </span>
            </motion.h2>
          </div>

          <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {featured.map((country) => (
              <CountryCard country={country} key={country.name.common} />
            ))}
          </ul>

          <div className="flex justify-center mt-10">
            <NavLink to="/country">
              <motion.button
                whileHover={{ scale: 1.04, y: -2 }}
                whileTap={{ scale: 0.97 }}
                className="flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold transition-all duration-300 font-[family-name:var(--font-body)] text-[#60a5fa] border border-[rgba(59,130,246,0.25)] bg-[rgba(59,130,246,0.06)] hover:bg-[rgba(59,130,246,0.15)] hover:text-white hover:border-[rgba(59,130,246,0.5)]"
              >
                View All Countries <FaArrowRight className="text-xs" />
              </motion.button>
            </NavLink>
          </div>
        </section>
      )}

      {/* Explore by Region */}
      <section className="max-w-[1400px] mx-auto px-6 lg:px-8 mb-24">
        <div className="mb-10">
          <span className="section-label">✦ Regions</span>
          <h2 className="text-white font-bold font-[family-name:var(--font-heading)] text-[clamp(1.8rem,3vw,2.5rem)]">
            Explore by{" "}
            <span className="bg-[linear-gradient(135deg,#f59e0b,#f43f5e)] bg-clip-text text-transparent">
              Region
            </span>
          </h2>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {regionCards.map((r, i) => (
            <motion.div
              key={r.name}
              initial={{ opacity: 0, scale: 0.93 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              whileHover={{ y: -6 }}
            >
              <NavLink to={`/country?region=${r.name}`}>
                <div className={`flex flex-col items-center justify-center gap-3 p-6 rounded-2xl text-center cursor-pointer transition-all duration-300 border ${r.cls}`}>
                  <div className={`flex items-center justify-center w-12 h-12 rounded-xl text-xl ${r.iconCls}`}>
                    {r.icon}
                  </div>
                  <div>
                    <div className="font-bold text-white text-sm font-[family-name:var(--font-heading)]">
                      {r.name}
                    </div>
                    <div className={`text-xs mt-0.5 ${r.textCls}`}>
                      {r.count} countries
                    </div>
                  </div>
                </div>
              </NavLink>
            </motion.div>
          ))}
        </div>
      </section>

      <About />
    </>
  );
};
