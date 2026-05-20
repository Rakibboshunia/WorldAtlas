
import { FaLongArrowAltRight } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import logo from "../../assets/images/world.png";
import { motion } from "framer-motion";

export const HeroSection = () => {
  return (
    <main className="hero-section main">
      <div className="container grid grid-two-cols">
        <motion.div
          className="hero-content"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <motion.h1
            className="heading-xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Explore the World, One Country at a Time.
          </motion.h1>
          <motion.p
            className="paragraph"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            Discover the history, culture, and beauty of every nation. Sort,
            search, and filter through countries to find the details you need.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <NavLink to="/country">
              <button className="btn-darken btn-inline">
                Start Exploring <FaLongArrowAltRight />
              </button>
            </NavLink>
          </motion.div>
        </motion.div>

        <motion.div
          className="hero-image"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
        >
          <img
            src={logo}
            alt="world is beauty"
            className="banner-image"
          />
        </motion.div>
      </div>
    </main>
  );
};
