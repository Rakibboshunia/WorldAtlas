"use client";
import { useEffect, useState, useTransition } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { getCountryIndData, getCountriesByCodes } from "../../api/postApi";
import { Loader } from "../UI/Loader";
import { FaArrowLeft, FaExternalLinkAlt, FaGlobeAmericas, FaUsers, FaLanguage, FaMoneyBillWave } from "react-icons/fa";
import { motion } from "framer-motion";

const regionStyles = {
  Africa:    "bg-[rgba(245,158,11,0.15)] border-[rgba(245,158,11,0.4)] text-[#f59e0b]",
  Americas:  "bg-[rgba(16,185,129,0.15)] border-[rgba(16,185,129,0.4)] text-[#10b981]",
  Asia:      "bg-[rgba(139,92,246,0.15)] border-[rgba(139,92,246,0.4)] text-[#8b5cf6]",
  Europe:    "bg-[rgba(59,130,246,0.15)] border-[rgba(59,130,246,0.4)] text-[#3b82f6]",
  Oceania:   "bg-[rgba(244,63,94,0.15)] border-[rgba(244,63,94,0.4)] text-[#f43f5e]",
};

const getRS = (region) =>
  regionStyles[region] || "bg-[rgba(255,255,255,0.08)] border-[rgba(255,255,255,0.25)] text-[#94a3b8]";

// Per-card color tokens for bento grid
const cardTokens = [
  {
    iconBg: "bg-[rgba(59,130,246,0.1)] text-[#3b82f6]",
    border: "border-[rgba(59,130,246,0.15)]",
  },
  {
    iconBg: "bg-[rgba(139,92,246,0.1)] text-[#8b5cf6]",
    border: "border-[rgba(139,92,246,0.15)]",
  },
  {
    iconBg: "bg-[rgba(245,158,11,0.1)] text-[#f59e0b]",
    border: "border-[rgba(245,158,11,0.15)]",
  },
  {
    iconBg: "bg-[rgba(16,185,129,0.1)] text-[#10b981]",
    border: "border-[rgba(16,185,129,0.15)]",
  },
];

export const CountryDetails = () => {
  const params = useParams();
  const [isPending, startTransition] = useTransition();
  const [country, setCountry] = useState(null);
  const [borderCountries, setBorderCountries] = useState([]);

  useEffect(() => {
    startTransition(async () => {
      try {
        const res = await getCountryIndData(params.id);
        if (res.data && res.data[0]) {
          const countryData = res.data[0];
          setCountry(countryData);
          if (countryData.borders?.length > 0) {
            const bordersRes = await getCountriesByCodes(countryData.borders);
            if (bordersRes.data) setBorderCountries(bordersRes.data);
          }
        }
      } catch (error) {
        console.error("Error fetching country details:", error);
      }
    });
  }, [params.id]);

  if (isPending || !country) return <Loader />;

  const nativeNames = country.name.nativeName
    ? Object.values(country.name.nativeName).map((n) => n.common).join(", ")
    : "N/A";
  const currencies = country.currencies
    ? Object.values(country.currencies).map((c) => `${c.name} (${c.symbol || ""})`).join(", ")
    : "N/A";
  const languages = country.languages
    ? Object.values(country.languages).join(", ")
    : "N/A";

  const rs = getRS(country.region);

  const infoCards = [
    {
      title: "Geographic Info",
      icon: <FaGlobeAmericas />,
      items: [
        { label: "Capital", value: country.capital?.join(", ") || "N/A" },
        { label: "Sub Region", value: country.subregion || "N/A" },
        { label: "Native Names", value: nativeNames },
        { label: "Top Level Domain", value: country.tld?.join(", ") || "N/A" },
      ],
      extra: country.maps?.googleMaps && (
        <a
          href={country.maps.googleMaps}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-5 flex items-center justify-center gap-2 w-full py-2.5 rounded-xl text-sm font-semibold text-white transition-all duration-300 bg-[linear-gradient(135deg,#3b82f6_0%,#6d28d9_100%)] shadow-[0_4px_16px_rgba(59,130,246,0.35)] font-[family-name:var(--font-body)] hover:brightness-110"
        >
          🗺️ View on Google Maps <FaExternalLinkAlt className="text-xs" />
        </a>
      ),
    },
    {
      title: "Demographics",
      icon: <FaUsers />,
      items: [{ label: "Population", value: country.population.toLocaleString() }],
    },
    {
      title: "Economy",
      icon: <FaMoneyBillWave />,
      items: [{ label: "Currencies", value: currencies }],
    },
    {
      title: "Languages",
      icon: <FaLanguage />,
      items: [{ label: "Languages", value: languages }],
    },
  ];

  return (
    <section className="max-w-[1400px] mx-auto px-6 lg:px-8 py-8 pb-24">
      {/* Back Button */}
      <div className="mb-8">
        <Link href="/country">
          <motion.button
            whileHover={{ x: -4 }}
            whileTap={{ scale: 0.97 }}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-slate-300 transition-all duration-200 font-[family-name:var(--font-body)] bg-[rgba(9,20,40,0.8)] border border-[rgba(59,130,246,0.12)] hover:border-[rgba(59,130,246,0.35)] hover:text-white"
          >
            <FaArrowLeft className="text-xs" /> Back to Countries
          </motion.button>
        </Link>
      </div>

      {/* Hero Flag Banner */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="rounded-3xl overflow-hidden mb-6 relative bg-[rgba(9,20,40,0.85)] border border-[rgba(59,130,246,0.1)]"
      >
        <div className="relative h-64 md:h-80 overflow-hidden">
          <img
            src={country.flags.svg}
            alt={country.flags.alt || `Flag of ${country.name.common}`}
            className="w-full h-full object-cover brightness-[0.88]"
          />
          {/* Overlay */}
          <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(2,9,23,0.05)_0%,rgba(2,9,23,0.88)_100%)]" />
          {/* Text on flag */}
          <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10 flex items-end justify-between gap-4 flex-wrap">
            <div>
              <h1
                className="text-white font-bold leading-tight mb-1 font-[family-name:var(--font-heading)] text-[clamp(2.2rem,5vw,4rem)] tracking-[-0.03em] drop-shadow-[0_4px_20px_rgba(0,0,0,0.8)]"
              >
                {country.name.common}
              </h1>
              <p className="text-sm italic text-[#8ba3c7] drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)]">
                {country.name.official}
              </p>
            </div>
            <span className={`pill-badge flex-shrink-0 border text-[0.75rem] px-4 py-1.5 ${rs}`}>
              {country.region}
            </span>
          </div>
        </div>
      </motion.div>

      {/* Info Bento Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
        {infoCards.map(({ title, icon, items, extra }, i) => (
          <motion.div
            key={title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: i * 0.08 }}
            className={`p-5 rounded-2xl bg-[rgba(9,20,40,0.8)] border ${cardTokens[i].border}`}
          >
            {/* Card header */}
            <div className="flex items-center gap-2.5 mb-4">
              <div className={`flex items-center justify-center w-8 h-8 rounded-xl text-sm flex-shrink-0 ${cardTokens[i].iconBg}`}>
                {icon}
              </div>
              <h3 className="font-bold text-sm font-[family-name:var(--font-heading)] text-[#f0f6ff]">
                {title}
              </h3>
            </div>

            {/* Items */}
            <div className="flex flex-col gap-2.5">
              {items.map(({ label, value }) => (
                <div
                  key={label}
                  className="flex flex-col gap-0.5 border-b border-[rgba(59,130,246,0.06)] pb-2"
                >
                  <span className="text-xs font-bold uppercase tracking-wider text-[#4a6280] text-[0.62rem]">
                    {label}
                  </span>
                  <span className="text-slate-300 text-sm font-medium break-words">{value}</span>
                </div>
              ))}
            </div>
            {extra}
          </motion.div>
        ))}
      </div>

      {/* Bordering Countries */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="p-6 rounded-2xl bg-[rgba(9,20,40,0.8)] border border-[rgba(59,130,246,0.08)]"
      >
        <div className="flex items-center gap-2.5 mb-5">
          <div className="flex items-center justify-center w-8 h-8 rounded-xl text-sm bg-[rgba(245,158,11,0.12)] text-[#f59e0b]">
            🗺️
          </div>
          <h3 className="text-white font-bold text-sm font-[family-name:var(--font-heading)]">
            Bordering Countries
          </h3>
          {borderCountries.length > 0 && (
            <span className="pill-badge ml-2 border border-[rgba(59,130,246,0.25)] bg-[rgba(59,130,246,0.1)] text-[#60a5fa] text-[0.62rem]">
              {borderCountries.length}
            </span>
          )}
        </div>

        {borderCountries.length > 0 ? (
          <div className="flex flex-wrap gap-2.5">
            {borderCountries.map((border) => (
              <Link key={border.name.common} href={`/country/${border.name.common}`}>
                <motion.div
                  whileHover={{ y: -3, scale: 1.05 }}
                  className="flex items-center gap-2 px-3 py-2 rounded-full transition-all duration-200 cursor-pointer bg-[rgba(59,130,246,0.06)] border border-[rgba(59,130,246,0.15)] hover:bg-[rgba(59,130,246,0.15)] hover:border-[rgba(59,130,246,0.4)] hover:shadow-[0_0_15px_rgba(59,130,246,0.2)]"
                >
                  <img
                    src={border.flags.svg}
                    alt={border.name.common}
                    className="w-6 h-6 rounded-full object-cover border border-white/10"
                  />
                  <span className="text-slate-300 text-xs font-semibold hover:text-white transition-colors">
                    {border.name.common}
                  </span>
                </motion.div>
              </Link>
            ))}
          </div>
        ) : (
          <p className="text-sm italic text-[#4a6280]">
            This country has no land borders.
          </p>
        )}
      </motion.div>
    </section>
  );
};
