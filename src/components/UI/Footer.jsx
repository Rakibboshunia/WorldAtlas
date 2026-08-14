import footerContact from "../../api/footerApi.json";
import { IoCallSharp } from "react-icons/io5";
import { MdPlace } from "react-icons/md";
import { TbMailPlus } from "react-icons/tb";
import { FaGithub, FaTwitter, FaLinkedinIn, FaDribbble } from "react-icons/fa";
import { RiEarthLine } from "react-icons/ri";
import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";

const Footer = () => {
  const footerIcon = {
    MdPlace: <MdPlace />,
    IoCallSharp: <IoCallSharp />,
    TbMailPlus: <TbMailPlus />,
  };

  const socials = [
    { 
      icon: <FaGithub />, 
      href: "https://github.com/Rakibboshunia", 
      label: "GitHub", 
      hoverClasses: "hover:text-[#f0f6ff] hover:bg-[#f0f6ff]/10 hover:border-[#f0f6ff]/25 hover:shadow-[0_0_15px_rgba(240,246,255,0.2)]"
    },
    { 
      icon: <FaTwitter />, 
      href: "#", 
      label: "Twitter", 
      hoverClasses: "hover:text-[#38bdf8] hover:bg-[#38bdf8]/10 hover:border-[#38bdf8]/25 hover:shadow-[0_0_15px_rgba(56,189,248,0.2)]"
    },
    { 
      icon: <FaLinkedinIn />, 
      href: "#", 
      label: "LinkedIn", 
      hoverClasses: "hover:text-[#3b82f6] hover:bg-[#3b82f6]/10 hover:border-[#3b82f6]/25 hover:shadow-[0_0_15px_rgba(59,130,246,0.2)]"
    },
    { 
      icon: <FaDribbble />, 
      href: "#", 
      label: "Dribbble", 
      hoverClasses: "hover:text-[#ec4899] hover:bg-[#ec4899]/10 hover:border-[#ec4899]/25 hover:shadow-[0_0_15px_rgba(236,72,153,0.2)]"
    },
  ];

  const quickLinks = [
    { to: "/", label: "Home" },
    { to: "/about", label: "About Us" },
    { to: "/country", label: "Explore Countries" },
    { to: "/contact", label: "Contact" },
  ];

  const resources = [
    { label: "REST Countries API", href: "https://restcountries.com" },
    { label: "Privacy Policy", href: "#" },
    { label: "Terms of Service", href: "#" },
    { label: "Sitemap", href: "#" },
  ];

  return (
    <footer className="relative mt-20 bg-[linear-gradient(to_bottom,#020917_0%,#020917_100%)] border-t border-[rgba(59,130,246,0.08)]">
      {/* Animated top glow line */}
      <div className="absolute top-0 left-0 w-full h-[1px] pointer-events-none bg-[linear-gradient(90deg,transparent_0%,#3b82f6_30%,#8b5cf6_60%,transparent_100%)] opacity-60 shadow-[0_0_20px_rgba(59,130,246,0.5)]" />

      <div className="max-w-[1400px] mx-auto px-6 lg:px-8 pt-16 pb-8">
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-[rgba(59,130,246,0.06)]">
          {/* Brand */}
          <div className="lg:col-span-1">
            <NavLink to="/" className="flex items-center gap-2.5 mb-5 group">
              <div className="flex items-center justify-center w-9 h-9 rounded-xl transition-all duration-300 bg-[linear-gradient(135deg,#3b82f6_0%,#8b5cf6_100%)] shadow-[0_0_18px_rgba(59,130,246,0.35)]">
                <RiEarthLine className="text-white text-xl" />
              </div>
              <span className="font-bold text-[1.2rem] tracking-tight font-[family-name:var(--font-heading)]">
                <span className="text-white">World</span>
                <span className="bg-[linear-gradient(90deg,#3b82f6,#8b5cf6)] bg-clip-text text-transparent">
                  Atlas
                </span>
              </span>
            </NavLink>
            <p className="text-sm leading-relaxed mb-6 max-w-xs text-[#4a6280]">
              Your premium guide to exploring every nation, territory, and culture on Earth. Data-driven world exploration.
            </p>
            <div className="flex gap-2.5">
              {socials.map(({ icon, href, label, hoverClasses }) => (
                <motion.a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  whileHover={{ y: -4 }}
                  className={`flex items-center justify-center w-9 h-9 rounded-xl text-base transition-all duration-300 bg-[rgba(255,255,255,0.04)] border border-[rgba(255,255,255,0.07)] text-[#4a6280] ${hoverClasses}`}
                >
                  {icon}
                </motion.a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold text-sm mb-5 text-white tracking-[-0.01em] font-[family-name:var(--font-heading)]">
              Navigation
            </h3>
            <ul className="flex flex-col gap-2.5">
              {quickLinks.map(({ to, label }) => (
                <li key={to}>
                  <NavLink
                    to={to}
                    className="text-sm transition-all duration-200 flex items-center gap-2 group text-[#4a6280] hover:text-[#3b82f6]"
                  >
                    <span className="w-1 h-1 rounded-full transition-all duration-200 bg-[#3b82f6]/20 group-hover:bg-[#3b82f6]" />
                    {label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="font-bold text-sm mb-5 text-white tracking-[-0.01em] font-[family-name:var(--font-heading)]">
              Resources
            </h3>
            <ul className="flex flex-col gap-2.5">
              {resources.map(({ label, href }) => (
                <li key={label}>
                  <a
                    href={href}
                    target={href.startsWith("http") ? "_blank" : "_self"}
                    rel="noopener noreferrer"
                    className="text-sm transition-all duration-200 flex items-center gap-2 group text-[#4a6280] hover:text-[#3b82f6]"
                  >
                    <span className="w-1 h-1 rounded-full bg-[#3b82f6]/20 group-hover:bg-[#3b82f6]" />
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-bold text-sm mb-5 text-white tracking-[-0.01em] font-[family-name:var(--font-heading)]">
              Get in Touch
            </h3>
            <div className="flex flex-col gap-4">
              {footerContact.map((curData, index) => (
                <motion.div
                  key={index}
                  className="flex items-start gap-3 group cursor-default"
                  whileHover={{ x: 3 }}
                >
                  <div className="flex items-center justify-center w-8 h-8 rounded-xl text-sm flex-shrink-0 bg-[rgba(59,130,246,0.1)] border border-[rgba(59,130,246,0.2)] text-[#3b82f6] transition-colors group-hover:bg-[rgba(59,130,246,0.15)]">
                    {footerIcon[curData.icon]}
                  </div>
                  <div className="flex flex-col">
                    <span className="text-white text-xs font-semibold">{curData.title}</span>
                    <span className="text-xs mt-0.5 text-[#4a6280]">{curData.details}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6">
          <p className="text-xs text-[#2e4060]">
            © {new Date().getFullYear()} WorldAtlas. Crafted with ❤️ by{" "}
            <NavLink
              to="https://github.com/Rakibboshunia"
              target="_blank"
              className="font-semibold transition-colors text-[#3b82f6] hover:text-[#60a5fa]"
            >
              Boshunia
            </NavLink>
          </p>
          <p className="text-xs text-[#2e4060]">
            Data powered by{" "}
            <a
              href="https://restcountries.com"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors text-[#3b82f6] hover:text-[#60a5fa]"
            >
              REST Countries API
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
