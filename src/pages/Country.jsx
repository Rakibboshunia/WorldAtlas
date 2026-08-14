import { useEffect, useState, useTransition } from "react";
import { getCountryData } from "../api/postApi";
import { Loader } from "../components/UI/Loader";
import { CountryCard } from "../components/Layout/CountryCard";
import { SearchFilter } from "../components/UI/SearchFilter";
import { FaGlobeAmericas, FaUsers, FaMapMarkedAlt } from "react-icons/fa";
import { motion } from "framer-motion";

const statCards = [
  {
    icon: <FaGlobeAmericas />,
    label: "Matching Countries",
    key: "count",
    iconCls: "bg-[linear-gradient(135deg,#3b82f6,#6d28d9)] shadow-[0_6px_18px_rgba(59,130,246,0.25)]",
    border: "border-[rgba(59,130,246,0.18)]",
    hover: "hover:shadow-[0_10px_35px_rgba(59,130,246,0.25)]",
  },
  {
    icon: <FaUsers />,
    label: "Total Population",
    key: "pop",
    iconCls: "bg-[linear-gradient(135deg,#10b981,#0d9488)] shadow-[0_6px_18px_rgba(16,185,129,0.25)]",
    border: "border-[rgba(16,185,129,0.18)]",
    hover: "hover:shadow-[0_10px_35px_rgba(16,185,129,0.25)]",
  },
  {
    icon: <FaMapMarkedAlt />,
    label: "Regions Represented",
    key: "regions",
    iconCls: "bg-[linear-gradient(135deg,#f59e0b,#d97706)] shadow-[0_6px_18px_rgba(245,158,11,0.25)]",
    border: "border-[rgba(245,158,11,0.18)]",
    hover: "hover:shadow-[0_10px_35px_rgba(245,158,11,0.25)]",
  },
];

export const Country = () => {
  const [isPending, startTransition] = useTransition();
  const [countries, setCountries] = useState([]);
  const [originalCountries, setOriginalCountries] = useState([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [viewMode, setViewMode] = useState("grid");
  const [sortOrder, setSortOrder] = useState("");
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

  const handleSearchChange = (val) => { setSearch(val); setCurrentPage(1); };
  const handleFilterChange = (val) => { setFilter(val); setCurrentPage(1); };

  if (isPending) return <Loader />;

  const filterCountries = countries.filter((c) => {
    const matchSearch = search
      ? c.name.common.toLowerCase().includes(search.toLowerCase())
      : true;
    const matchRegion = filter === "all" ? true : c.region === filter;
    return matchSearch && matchRegion;
  });

  const totalFilteredCount = filterCountries.length;
  const totalPopulation = filterCountries.reduce((acc, c) => acc + (c.population || 0), 0);
  const uniqueRegions = [...new Set(filterCountries.map((c) => c.region))].filter(Boolean).length;

  const statValues = {
    count: totalFilteredCount,
    pop: totalPopulation.toLocaleString(),
    regions: uniqueRegions,
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filterCountries.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(totalFilteredCount / itemsPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    document.querySelector(".search-filter-anchor")?.scrollIntoView({ behavior: "smooth" });
  };

  const handleReset = () => {
    setSearch(""); setFilter("all"); setSortOrder("");
    setCountries(originalCountries); setCurrentPage(1);
  };

  const navBtnCls = "px-4 py-2 rounded-xl text-xs font-semibold transition-all duration-200 disabled:opacity-30 disabled:cursor-not-allowed font-[family-name:var(--font-body)] bg-[rgba(9,20,40,0.8)] border border-[rgba(59,130,246,0.12)] text-[#8ba3c7] hover:border-[rgba(59,130,246,0.3)] hover:text-white";

  return (
    <section className="pb-20 pt-6">
      {/* Page Header */}
      <div className="max-w-[1400px] mx-auto px-6 lg:px-8 mb-8">
        <span className="section-label">✦ Explorer</span>
        <h1 className="font-bold text-white font-[family-name:var(--font-heading)] text-[clamp(2rem,4vw,3rem)]">
          Countries of the{" "}
          <span className="gradient-text">World</span>
        </h1>
      </div>

      {/* Stats */}
      <div className="max-w-[1400px] mx-auto px-6 lg:px-8 grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        {statCards.map((s, i) => (
          <motion.div
            key={s.key}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className={`flex items-center gap-4 p-4 rounded-2xl transition-all duration-300 bg-[rgba(9,20,40,0.85)] border ${s.border} ${s.hover}`}
          >
            <div className={`flex items-center justify-center w-12 h-12 rounded-xl text-white text-xl flex-shrink-0 ${s.iconCls}`}>
              {s.icon}
            </div>
            <div>
              <span className="font-bold uppercase tracking-wider block text-[#4a6280] text-[0.6rem]">
                {s.label}
              </span>
              <span className="text-white text-2xl font-bold font-[family-name:var(--font-heading)]">
                {statValues[s.key]}
              </span>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="search-filter-anchor" />

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
        <div className="max-w-[1400px] mx-auto px-6 lg:px-8 text-center py-24">
          <div className="text-6xl mb-4">🌍</div>
          <p className="text-lg mb-2 font-semibold text-white font-[family-name:var(--font-heading)]">
            No countries found
          </p>
          <p className="text-sm mb-6 text-[#4a6280]">
            Try adjusting your search or filters.
          </p>
          <button onClick={handleReset} className="btn-primary">
            Clear All Filters
          </button>
        </div>
      ) : (
        <>
          <div className="max-w-[1400px] mx-auto px-6 lg:px-8">
            <ul
              className={
                viewMode === "list"
                  ? "flex flex-col gap-3"
                  : "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5"
              }
            >
              {currentItems.map((curCountry) => (
                <CountryCard
                  country={curCountry}
                  key={curCountry.name.common}
                  viewMode={viewMode}
                />
              ))}
            </ul>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="max-w-[1400px] mx-auto px-6 lg:px-8 mt-12 flex flex-col items-center gap-5 pt-8 border-t border-[rgba(59,130,246,0.06)]">
              <p className="text-xs text-[#2e4060]">
                Showing {indexOfFirstItem + 1}–{Math.min(indexOfLastItem, totalFilteredCount)} of{" "}
                {totalFilteredCount} countries
              </p>

              <div className="flex gap-2 flex-wrap justify-center">
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className={navBtnCls}
                >
                  ← Prev
                </button>

                {Array.from({ length: totalPages }, (_, i) => i + 1)
                  .filter((p) => p === 1 || p === totalPages || Math.abs(p - currentPage) <= 1)
                  .map((page, idx, arr) => {
                    const elements = [];
                    if (idx > 0 && page - arr[idx - 1] > 1) {
                      elements.push(
                        <span key={`e-${page}`} className="px-2 self-center text-sm text-[#2e4060]">
                          …
                        </span>
                      );
                    }
                    elements.push(
                      <button
                        key={page}
                        onClick={() => handlePageChange(page)}
                        className={`w-9 h-9 rounded-xl text-xs font-semibold transition-all duration-200 font-[family-name:var(--font-body)] ${
                          currentPage === page
                            ? "bg-[linear-gradient(135deg,#3b82f6,#6d28d9)] text-white border border-[rgba(59,130,246,0.5)] shadow-[0_0_16px_rgba(59,130,246,0.4)]"
                            : "bg-[rgba(9,20,40,0.8)] text-[#8ba3c7] border border-[rgba(59,130,246,0.1)] hover:border-[rgba(59,130,246,0.3)] hover:text-white"
                        }`}
                      >
                        {page}
                      </button>
                    );
                    return elements;
                  })}

                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className={navBtnCls}
                >
                  Next →
                </button>
              </div>

              <div className="flex items-center gap-2 text-xs text-[#2e4060]">
                <span>Show:</span>
                <select
                  value={itemsPerPage}
                  onChange={(e) => { setItemsPerPage(Number(e.target.value)); setCurrentPage(1); }}
                  className="px-2 py-1 rounded-lg outline-none font-[family-name:var(--font-body)] bg-[rgba(9,20,40,0.8)] border border-[rgba(59,130,246,0.12)] text-[#8ba3c7]"
                >
                  {[12, 24, 48, 96].map((n) => (
                    <option key={n} value={n} className="bg-[#050e1f]">
                      {n}
                    </option>
                  ))}
                </select>
                <span>per page</span>
              </div>
            </div>
          )}
        </>
      )}
    </section>
  );
};
