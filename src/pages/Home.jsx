
import { useEffect, useState } from "react";
import { HeroSection } from "../components/UI/HeroSection";
import { About } from "./About";
import { getCountryData } from "../api/postApi";
import { CountryCard } from "../components/Layout/CountryCard";
import { motion } from "framer-motion";
import { FaGlobe, FaSearchLocation, FaChartPie } from "react-icons/fa";

export const Home = () => {
  const [featured, setFeatured] = useState([]);

  useEffect(() => {
    const fetchFeatured = async () => {
      try {
        const res = await getCountryData();
        // Manually selecting some visually stunning/interesting countries to feature
        const interestingNames = ["Japan", "Switzerland", "Brazil", "Australia"];
        const interestingCountries = res.data.filter((c) =>
          interestingNames.includes(c.name.common)
        );
        // Fallback to random if specific ones aren't found
        setFeatured(interestingCountries.length > 0 ? interestingCountries : res.data.slice(0, 4));
      } catch (err) {
        console.error("Failed to load featured countries:", err);
      }
    };
    fetchFeatured();
  }, []);

  return (
    <>
      <HeroSection />

      {/* Premium Features Banner */}
      <section className="features-banner-section container">
        <div className="grid grid-three-cols">
          <motion.div
            className="feature-highlight-card bg-blue-box"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="feature-icon"><FaGlobe /></div>
            <h3>250+ Nations</h3>
            <p>Comprehensive data for every country and territory on Earth.</p>
          </motion.div>

          <motion.div
            className="feature-highlight-card bg-green-box"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="feature-icon"><FaSearchLocation /></div>
            <h3>Smart Filtering</h3>
            <p>Instantly sort, search, and navigate through global geographic zones.</p>
          </motion.div>

          <motion.div
            className="feature-highlight-card bg-yellow-box"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <div className="feature-icon"><FaChartPie /></div>
            <h3>Live Demographics</h3>
            <p>Access up-to-date population, currency, and border statistics.</p>
          </motion.div>
        </div>
      </section>

      {/* Featured / Trending Destinations */}
      {featured.length > 0 && (
        <section className="featured-countries-section container">
          <div className="section-header">
            <motion.h2
              className="container-title"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              Trending Destinations
            </motion.h2>
            <motion.p
              className="section-subtitle"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              Discover some of the most fascinating places across the globe.
            </motion.p>
          </div>
          <ul className="grid grid-four-cols">
            {featured.map((country) => (
              <CountryCard country={country} key={country.name.common} />
            ))}
          </ul>
        </section>
      )}

      <About />
    </>
  );
};
