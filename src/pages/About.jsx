import { useState } from "react";
import countryFacts from "../api/countryData.json";
import { motion } from "framer-motion";

export const About = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [visibleCount, setVisibleCount] = useState(6);

  // Filter country facts based on search term
  const filteredFacts = countryFacts.filter((country) => {
    const matchesName = country.countryName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCapital = country.capital.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFact = country.interestingFact.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesName || matchesCapital || matchesFact;
  });

  const handleShowMore = () => {
    setVisibleCount((prev) => Math.min(prev + 6, filteredFacts.length));
  };

  const handleShowLess = () => {
    setVisibleCount(6);
  };

  // List of card theme classes to cycle through
  const cardThemes = ["bg-blue-box", "bg-green-box", "bg-yellow-box", "bg-white-box"];

  return (
    <section className="section-about container">
      <h2 className="container-title">
        Here are the Interesting Facts
        <br />
        We’re proud of
      </h2>

      {/* Facts Search Input */}
      <div className="facts-search-wrapper">
        <input
          type="text"
          placeholder="Search interesting facts by country or capital..."
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setVisibleCount(6); // Reset count on search
          }}
          className="facts-search-input"
        />
        {searchTerm && (
          <span className="facts-count-badge">
            Found {filteredFacts.length} {filteredFacts.length === 1 ? "fact" : "facts"}
          </span>
        )}
      </div>

      {filteredFacts.length === 0 ? (
        <div className="no-facts-found">
          <p>No interesting facts match your search. Try another query!</p>
        </div>
      ) : (
        <>
          <div className="gradient-cards">
            {filteredFacts.slice(0, visibleCount).map((country, idx) => {
              const { id, countryName, capital, population, interestingFact } = country;
              // Cycle themes based on index
              const themeClass = cardThemes[idx % cardThemes.length];

              return (
                <motion.div 
                  className="card" 
                  key={id}
                  initial={{ opacity: 0, scale: 0.95, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: idx * 0.05 }}
                  whileHover={{ scale: 1.02 }}
                >
                  <div className={`container-card ${themeClass}`}>
                    <p className="card-title">{countryName}</p>
                    <div className="fact-details">
                      <p>
                        <span className="card-description">Capital:</span>{" "}
                        <span className="detail-value">{capital}</span>
                      </p>
                      <p>
                        <span className="card-description">Population:</span>{" "}
                        <span className="detail-value">{population}</span>
                      </p>
                      <p className="fact-text-block">
                        <span className="card-description">Interesting Fact:</span>{" "}
                        <span className="fact-value">{interestingFact}</span>
                      </p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          <div className="about-actions-btn">
            {visibleCount < filteredFacts.length && (
              <button onClick={handleShowMore} className="btn-load-more">
                Load More Facts
              </button>
            )}
            {visibleCount > 6 && (
              <button onClick={handleShowLess} className="btn-show-less">
                Show Less
              </button>
            )}
          </div>
        </>
      )}
    </section>
  );
};
