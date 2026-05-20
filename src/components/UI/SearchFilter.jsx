
import { FaSearch, FaUndo, FaSortAlphaDown, FaSortAlphaUp } from "react-icons/fa";
import { BsGrid3X3GapFill, BsListUl } from "react-icons/bs";

export const SearchFilter = ({
  search,
  setSearch,
  filter,
  setFilter,
  countries,
  setCountries,
  viewMode,
  setViewMode,
  onReset,
  sortOrder,
  setSortOrder,
}) => {
  const handleInputChange = (event) => {
    setSearch(event.target.value);
  };

  const handleSelectChange = (event) => {
    setFilter(event.target.value);
  };

  const sortCountries = (order) => {
    setSortOrder(order);
    const sorted = [...countries].sort((a, b) =>
      order === "asc"
        ? a.name.common.localeCompare(b.name.common)
        : b.name.common.localeCompare(a.name.common)
    );
    setCountries(sorted);
  };

  return (
    <section className="section-search-filter container">
      <div className="search-bar-wrapper">
        <FaSearch className="search-icon" />
        <input
          type="text"
          placeholder="Search country by name..."
          value={search}
          onChange={handleInputChange}
          className="search-input"
        />
      </div>

      <div className="filter-controls-group">
        <div className="sort-buttons">
          <button 
            className={`btn-sort ${sortOrder === "asc" ? "active" : ""}`}
            onClick={() => sortCountries("asc")}
            title="Sort A to Z"
          >
            <FaSortAlphaDown /> A-Z
          </button>
          <button 
            className={`btn-sort ${sortOrder === "desc" ? "active" : ""}`}
            onClick={() => sortCountries("desc")}
            title="Sort Z to A"
          >
            <FaSortAlphaUp /> Z-A
          </button>
        </div>

        <div className="select-wrapper">
          <select value={filter} onChange={handleSelectChange} className="select-region">
            <option value="all">Filter by Region</option>
            <option value="Africa">Africa</option>
            <option value="Americas">Americas</option>
            <option value="Asia">Asia</option>
            <option value="Europe">Europe</option>
            <option value="Oceania">Oceania</option>
          </select>
        </div>

        <div className="view-toggle-buttons">
          <button
            className={`btn-view-toggle ${viewMode === "grid" ? "active" : ""}`}
            onClick={() => setViewMode("grid")}
            title="Grid View"
          >
            <BsGrid3X3GapFill />
          </button>
          <button
            className={`btn-view-toggle ${viewMode === "list" ? "active" : ""}`}
            onClick={() => setViewMode("list")}
            title="List View"
          >
            <BsListUl />
          </button>
        </div>

        <button onClick={onReset} className="btn-reset" title="Reset Filters">
          <FaUndo /> Reset
        </button>
      </div>
    </section>
  );
};
