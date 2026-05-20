import { NavLink } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoSunnyOutline, IoMoonOutline } from "react-icons/io5";
import { useState, useEffect } from "react";
import logo from "../../assets/images/logo.png";

const Header = () => {
  const [show, setShow] = useState(false);
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("theme") || "dark";
  });

  useEffect(() => {
    if (theme === "light") {
      document.body.classList.add("light-theme");
    } else {
      document.body.classList.remove("light-theme");
    }
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <header className="site-header">
      <div className="container header-container">
        <div className="navbar-brand">
          <NavLink to="/" className="logo-link">
            <img src={logo} alt="GeoPulse Logo" className="logo-image" style={{ height: "6rem", width: "auto" }} />
          </NavLink>
        </div>

        <nav className={`nav-menu ${show ? "menu-active" : ""}`}>
          <ul className="nav-links">
            <li>
              <NavLink to="/" onClick={() => setShow(false)}>Home</NavLink>
            </li>
            <li>
              <NavLink to="/about" onClick={() => setShow(false)}>About</NavLink>
            </li>
            <li>
              <NavLink to="/country" onClick={() => setShow(false)}>Country</NavLink>
            </li>
            <li>
              <NavLink to="/contact" onClick={() => setShow(false)}>Contact</NavLink>
            </li>
          </ul>
        </nav>

        <div className="header-actions">
          <button
            className="theme-toggle-btn"
            onClick={toggleTheme}
            title={theme === "dark" ? "Switch to Light Mode" : "Switch to Dark Mode"}
            aria-label="Toggle Theme"
          >
            {theme === "dark" ? <IoSunnyOutline /> : <IoMoonOutline />}
          </button>

          <button
            className="hamburger-btn"
            onClick={() => setShow(!show)}
            aria-label="Toggle Navigation Menu"
          >
            <GiHamburgerMenu />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
