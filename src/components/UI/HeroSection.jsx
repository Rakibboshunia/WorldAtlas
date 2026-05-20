import { FaLongArrowAltRight } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import heroBg from "../../assets/images/hero-bg.png";
import { motion } from "framer-motion";

export const HeroSection = () => {
  return (
    <main 
      className="hero-section main"
      style={{
        backgroundImage: `linear-gradient(rgba(10, 11, 16, 0.7), rgba(10, 11, 16, 0.95)), url(${heroBg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
        backgroundRepeat: 'no-repeat',
        minHeight: '85vh',
        display: 'flex',
        alignItems: 'center',
        width: '100%',
        padding: '0',
        marginTop: '-8rem' // offset the header height to let the bg go underneath
      }}
    >
      <div className="container" style={{ width: '100%', position: 'relative', zIndex: 10 }}>
        <motion.div
          className="hero-content"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          style={{ maxWidth: '900px', margin: '12rem auto 4rem auto', textAlign: 'center' }}
        >
          <motion.h1
            className="heading-xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            style={{ 
              textShadow: '0 4px 30px rgba(0,0,0,0.8)', 
              fontSize: 'clamp(5.2rem, 7vw, 8.4rem)',
              lineHeight: 1.1
            }}
          >
            Explore the World, One Country at a Time.
          </motion.h1>
          <motion.p
            className="paragraph"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            style={{ 
              margin: '3rem auto 5rem auto', 
              fontSize: '2rem', 
              color: '#f8fafc', 
              textShadow: '0 2px 10px rgba(0,0,0,0.8)',
              fontWeight: 300,
              maxWidth: '700px'
            }}
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
              <button className="btn-darken btn-inline" style={{ 
                padding: '1.8rem 4rem', 
                fontSize: '1.8rem', 
                boxShadow: '0 10px 30px rgba(99, 102, 241, 0.5)',
                borderRadius: '4rem'
              }}>
                Start Exploring <FaLongArrowAltRight />
              </button>
            </NavLink>
          </motion.div>
        </motion.div>
      </div>
    </main>
  );
};
