
import { useEffect, useState, useTransition } from "react";
import { getCountryData } from "../api/postApi";
import { Loader } from "../components/UI/Loader";
import { CountryCard } from "../components/Layout/CountryCard";
import { SearchFilter } from "../components/UI/SearchFilter";
import { FaGlobeAmericas, FaUsers, FaMapMarkedAlt } from "react-icons/fa";

export const Country = () => {
  const [isPending, startTransition] = useTransition();
  const [countries, setCountries] = useState([]);
  const [originalCountries, setOriginalCountries] = useState([]);

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [viewMode, setViewMode] = useState("grid");
  const [sortOrder, setSortOrder] = useState("");

  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(12);

  useEffect(() => {
    startTransition(async () => {
      try {
        const res = await getCountryData();
        setCountries(res.data);
        setOriginalCountries(res.data);
      } catch (error) {
        console.error("Error fetching country data:", error);
      }
    });
  }, []);

  const handleSearchChange = (val) => {
    setSearch(val);
    setCurrentPage(1);
  };

  const handleFilterChange = (val) => {
    setFilter(val);
    setCurrentPage(1);
  };

  if (isPending) return <Loader />;

  const searchCountry = (country) => {
    if (search) {
      return country.name.common.toLowerCase().includes(search.toLowerCase());
    }
    return true;
  };

  const filterRegion = (country) => {
    if (filter === "all") return true;
    return country.region === filter;
  };

  // Main logic
  const filterCountries = countries.filter(
    (country) => searchCountry(country) && filterRegion(country)
  );

  // Statistics calculation
  const totalFilteredCount = filterCountries.length;
  const totalPopulation = filterCountries.reduce((acc, curr) => acc + (curr.population || 0), 0);
  const uniqueRegions = [...new Set(filterCountries.map((c) => c.region))].filter(Boolean).length;

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filterCountries.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(totalFilteredCount / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    // Smooth scroll back to top of the controls
    const element = document.querySelector(".section-search-filter");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleReset = () => {
    setSearch("");
    setFilter("all");
    setSortOrder("");
    setCountries(originalCountries);
    setCurrentPage(1);
  };

  return (
    <section className="country-section">
      {/* Stats Dashboard */}
      <div className="stats-dashboard container">
        <div className="stat-card">
          <div className="stat-icon"><FaGlobeAmericas /></div>
          <div className="stat-details">
            <span className="stat-label">Matching Countries</span>
            <span className="stat-number">{totalFilteredCount}</span>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon"><FaUsers /></div>
          <div className="stat-details">
            <span className="stat-label">Total Population</span>
            <span className="stat-number">{totalPopulation.toLocaleString()}</span>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon"><FaMapMarkedAlt /></div>
          <div className="stat-details">
            <span className="stat-label">Regions Represented</span>
            <span className="stat-number">{uniqueRegions}</span>
          </div>
        </div>
      </div>

      <SearchFilter
        search={search}
        setSearch={handleSearchChange}
        filter={filter}
        setFilter={handleFilterChange}
        countries={countries}
        setCountries={setCountries}
        viewMode={viewMode}
        setViewMode={setViewMode}
        onReset={handleReset}
        sortOrder={sortOrder}
        setSortOrder={setSortOrder}
      />

      {totalFilteredCount === 0 ? (
        <div className="no-countries-found container">
          <h3>No countries found matching your criteria.</h3>
          <button onClick={handleReset} className="btn-clear-search">Clear Filters</button>
        </div>
      ) : (
        <>
          <ul className={`grid container ${viewMode === "list" ? "list-layout" : "grid-four-cols"}`}>
            {currentItems.map((curCountry) => {
              return (
                <CountryCard 
                  country={curCountry} 
                  key={curCountry.name.common} 
                  viewMode={viewMode} 
                />
              );
            })}
          </ul>

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className="pagination-wrapper container">
              <div className="pagination-info">
                Showing {indexOfFirstItem + 1} to {Math.min(indexOfLastItem, totalFilteredCount)} of {totalFilteredCount} countries
              </div>
              
              <div className="pagination-buttons">
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="btn-pagination prev"
                >
                  Prev
                </button>
                
                {Array.from({ length: totalPages }, (_, i) => i + 1)
                  .filter((page) => page === 1 || page === totalPages || Math.abs(page - currentPage) <= 1)
                  .map((page, idx, arr) => {
                    const elements = [];
                    // Add ellipsis if there is a gap
                    if (idx > 0 && page - arr[idx - 1] > 1) {
                      elements.push(
                        <span key={`ellipsis-${page}`} className="pagination-ellipsis">
                          ...
                        </span>
                      );
                    }
                    elements.push(
                      <button
                        key={page}
                        onClick={() => handlePageChange(page)}
                        className={`btn-pagination num ${currentPage === page ? "active" : ""}`}
                      >
                        {page}
                      </button>
                    );
                    return elements;
                  })}

                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="btn-pagination next"
                >
                  Next
                </button>
              </div>

              <div className="items-per-page-selector">
                <span>Show:</span>
                <select
                  value={itemsPerPage}
                  onChange={(e) => {
                    setItemsPerPage(Number(e.target.value));
                    setCurrentPage(1);
                  }}
                  className="select-items-count"
                >
                  <option value={12}>12</option>
                  <option value={24}>24</option>
                  <option value={48}>48</option>
                  <option value={96}>96</option>
                </select>
              </div>
            </div>
          )}
        </>
      )}
    </section>
  );
};
