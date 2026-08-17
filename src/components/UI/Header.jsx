"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoSunnyOutline, IoMoonOutline, IoClose } from "react-icons/io5";
import { useState, useEffect } from "react";
import { RiEarthLine } from "react-icons/ri";
import { motion, AnimatePresence } from "framer-motion";

const Header = () => {
  const pathname = usePathname();
  const [show, setShow] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [theme, setTheme] = useState("dark");

  useEffect(() => {
    setIsMounted(true);
    setTheme(localStorage.getItem("theme") || "dark");
  }, []);

  useEffect(() => {
    if (theme === "light") {
      document.body.classList.add("light-theme");
    } else {
      document.body.classList.remove("light-theme");
    }
    localStorage.setItem("theme", theme);
  }, [theme]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const toggleTheme = () => setTheme(theme === "dark" ? "light" : "dark");

  const navLinks = [
    { to: "/", label: "Home" },
    { to: "/about", label: "About" },
    { to: "/country", label: "Countries" },
    { to: "/contact", label: "Contact" },
  ];

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-500 ${
        scrolled
          ? "backdrop-blur-2xl border-b shadow-[0_4px_40px_rgba(59,130,246,0.08)] bg-[rgba(2,9,23,0.88)] border-[rgba(59,130,246,0.12)]"
          : "bg-transparent border-transparent"
      }`}
    >
      <div className="max-w-[1400px] mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-[4.5rem]">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2.5 group"
            onClick={() => setShow(false)}
          >
            <div className="flex items-center justify-center w-9 h-9 rounded-xl transition-all duration-300 bg-[linear-gradient(135deg,#3b82f6_0%,#8b5cf6_100%)] shadow-[0_0_20px_rgba(59,130,246,0.4)]">
              <RiEarthLine className="text-white text-xl" />
            </div>
            <span className="font-bold text-[1.25rem] tracking-tight font-[family-name:var(--font-heading)]">
              <span className="text-white">World</span>
              <span className="bg-[linear-gradient(90deg,#3b82f6,#8b5cf6)] bg-clip-text text-transparent">
                Atlas
              </span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map(({ to, label }) => {
              const isActive = pathname === to || (to !== "/" && pathname.startsWith(to));
              return (
                <Link
                  key={to}
                  href={to}
                  className={`relative px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? "text-blue-400 nav-active"
                      : "text-slate-400 hover:text-white hover:bg-white/5"
                  }`}
                >
                  {label}
                  {isActive && (
                    <motion.span
                      layoutId="nav-indicator"
                      className="absolute inset-0 rounded-xl bg-[rgba(59,130,246,0.1)] border border-[rgba(59,130,246,0.2)]"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.5 }}
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-2">
            {/* Theme Toggle */}
            <motion.button
              onClick={toggleTheme}
              aria-label="Toggle Theme"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="flex items-center justify-center w-9 h-9 rounded-xl text-slate-300 transition-all duration-300 bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.08)]"
            >
              <motion.span
                key={theme}
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                transition={{ duration: 0.3 }}
                className="text-base"
              >
                {isMounted ? (theme === "dark" ? <IoSunnyOutline /> : <IoMoonOutline />) : <IoSunnyOutline />}
              </motion.span>
            </motion.button>

            {/* Hamburger */}
            <motion.button
              onClick={() => setShow(!show)}
              aria-label="Toggle Navigation Menu"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="md:hidden flex items-center justify-center w-9 h-9 rounded-xl text-slate-300 hover:text-white transition-all duration-200 text-lg bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.08)]"
            >
              <AnimatePresence mode="wait">
                <motion.span
                  key={show ? "close" : "open"}
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  {show ? <IoClose /> : <GiHamburgerMenu />}
                </motion.span>
              </AnimatePresence>
            </motion.button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {show && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="md:hidden overflow-hidden bg-[rgba(2,9,23,0.97)] backdrop-blur-2xl border-t border-[rgba(59,130,246,0.1)]"
          >
            <nav className="flex flex-col py-4 px-6 gap-1">
              {navLinks.map(({ to, label }, i) => {
                const isActive = pathname === to || (to !== "/" && pathname.startsWith(to));
                return (
                  <motion.div
                    key={to}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.06 }}
                  >
                    <Link
                      href={to}
                      onClick={() => setShow(false)}
                      className={`block px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                        isActive
                          ? "text-blue-400 bg-blue-500/10 border border-blue-500/20"
                          : "text-slate-400 hover:text-white hover:bg-white/5"
                      }`}
                    >
                      {label}
                    </Link>
                  </motion.div>
                );
              })}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
