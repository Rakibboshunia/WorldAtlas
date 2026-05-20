
import footerContact from "../../api/footerApi.json";
import { IoCallSharp } from "react-icons/io5";
import { MdPlace } from "react-icons/md";
import { TbMailPlus } from "react-icons/tb";
import { FaGithub, FaTwitter, FaLinkedinIn, FaDribbble } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";

const Footer = () => {
  const footerIcon = {
    MdPlace: <MdPlace />,
    IoCallSharp: <IoCallSharp />,
    TbMailPlus: <TbMailPlus />,
  };

  return (
    <footer className="footer-section">
      {/* Decorative top border glow */}
      <div className="footer-glow-line"></div>

      <div className="container">
        {/* Main Footer Content */}
        <div className="footer-content grid grid-three-cols">

          {/* Brand & Socials */}
          <div className="footer-brand-section">
            <NavLink to="/" className="footer-logo">
              <span className="logo-icon">🌍</span>
              <span className="logo-text">Geo<span className="logo-highlight">Pulse</span></span>
            </NavLink>
            <p className="footer-description">
              Discover the history, culture, and beauty of every nation. Your ultimate guide to exploring the world, one country at a time.
            </p>
            <div className="social-links">
              <a href="https://github.com/Rakibboshunia" target="_blank" rel="noopener noreferrer" className="social-icon"><FaGithub /></a>
              <a href="#" className="social-icon"><FaTwitter /></a>
              <a href="#" className="social-icon"><FaLinkedinIn /></a>
              <a href="#" className="social-icon"><FaDribbble /></a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="footer-links-section">
            <h3 className="footer-heading">Quick Links</h3>
            <ul className="footer-links-list">
              <li><NavLink to="/">Home</NavLink></li>
              <li><NavLink to="/about">About Us</NavLink></li>
              <li><NavLink to="/country">Explore Countries</NavLink></li>
              <li><NavLink to="/contact">Contact</NavLink></li>
            </ul>
          </div>

          {/* Contact Info (From API) */}
          <div className="footer-contact-section">
            <h3 className="footer-heading">Get in Touch</h3>
            <div className="footer-contacts-wrapper">
              {footerContact.map((curData, index) => (
                <motion.div
                  className="footer-contact-item"
                  key={index}
                  whileHover={{ x: 5 }}
                >
                  <div className="contact-icon">{footerIcon[curData.icon]}</div>
                  <div className="contact-text">
                    <span className="contact-title">{curData.title}</span>
                    <span className="contact-details">{curData.details}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

        </div>
      </div>

      {/* Bottom Copyright Area */}
      <div className="copyright-area">
        <div className="container copyright-flex">
          <p className="copyright-text">
            © {new Date().getFullYear()} GeoPulse. Designed with ❤️ by{" "}
            <NavLink to="https://github.com/Rakibboshunia" target="_blank" className="creator-link">
              Boshunia
            </NavLink>
          </p>
          <div className="copyright-links">
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
