import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";

export const CountryCard = ({ country, viewMode = "grid" }) => {
  const { flags, name, population, region, capital } = country;
  
  return (
    <motion.li 
      className={`country-card card ${viewMode === "list" ? "list-card" : "grid-card"}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      whileHover={{ y: -5 }}
    >
      <div className="container-card bg-white-box">
        <div className="card-flag-wrapper">
          <img src={flags.svg} alt={flags.alt || `Flag of ${name.common}`} />
        </div>

        <div className="countryInfo">
          <p className="card-title" title={name.common}>
            {name.common.length > 18
              ? name.common.slice(0, 16) + "..."
              : name.common}
          </p>
          <div className="card-stats">
            <p>
              <span className="card-description">Population:</span>
              <span className="card-val">{population.toLocaleString()}</span>
            </p>
            <p>
              <span className="card-description">Region:</span>
              <span className="card-val">{region}</span>
            </p>
            <p>
              <span className="card-description">Capital:</span>
              <span className="card-val">{capital && capital.length > 0 ? capital[0] : "N/A"}</span>
            </p>
          </div>

          <NavLink to={`/country/${name.common}`} className="card-btn-link">
            <button className="btn-details">Read More</button>
          </NavLink>
        </div>
      </div>
    </motion.li>
  );
};
