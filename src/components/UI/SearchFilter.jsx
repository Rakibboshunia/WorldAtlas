import { FaSearch, FaUndo, FaSortAlphaDown, FaSortAlphaUp } from "react-icons/fa";
import { BsGrid3X3GapFill, BsListUl } from "react-icons/bs";

const regionClasses = {
  Africa:   "bg-[rgba(245,158,11,0.1)] border-[rgba(245,158,11,0.3)] text-[#f59e0b]",
  Americas: "bg-[rgba(16,185,129,0.1)] border-[rgba(16,185,129,0.3)] text-[#10b981]",
  Asia:     "bg-[rgba(139,92,246,0.1)] border-[rgba(139,92,246,0.3)] text-[#8b5cf6]",
  Europe:   "bg-[rgba(59,130,246,0.1)] border-[rgba(59,130,246,0.3)] text-[#3b82f6]",
  Oceania:  "bg-[rgba(244,63,94,0.1)] border-[rgba(244,63,94,0.3)] text-[#f43f5e]",
};

const regions = ["Africa", "Americas", "Asia", "Europe", "Oceania"];

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
  const handleInputChange = (e) => setSearch(e.target.value);

  const sortCountries = (order) => {
    setSortOrder(order);
    const sorted = [...countries].sort((a, b) =>
      order === "asc"
        ? a.name.common.localeCompare(b.name.common)
        : b.name.common.localeCompare(a.name.common)
    );
    setCountries(sorted);
  };

  const iconBtn = (active) =>
    `flex items-center justify-center w-9 h-9 rounded-xl text-sm transition-all duration-200 cursor-pointer border ${
      active
        ? "text-white border-blue-500/40 bg-blue-500/15 shadow-[0_0_12px_rgba(59,130,246,0.2)]"
        : "text-slate-400 border-white/8 bg-white/4 hover:text-white hover:border-blue-400/30 hover:bg-blue-500/8"
    }`;

  return (
    <section className="max-w-[1400px] mx-auto px-6 lg:px-8 mb-8">
      {/* Search Bar */}
      <div className="relative mb-4">
        <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-sm text-[#4a6280]" />
        <input
          type="text"
          placeholder="Search country by name..."
          value={search}
          onChange={handleInputChange}
          className={`input-field pl-[2.75rem] ${search ? "pr-[3rem]" : "pr-4"}`}
        />
        {search && (
          <button
            onClick={() => setSearch("")}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white transition-colors"
          >
            ×
          </button>
        )}
      </div>

      {/* Controls Row */}
      <div className="flex flex-wrap gap-3 items-center bg-[rgba(9,20,40,0.6)] border border-[rgba(59,130,246,0.08)] backdrop-blur-md p-3 rounded-2xl">
        {/* Region Filter Pills */}
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setFilter("all")}
            className={`pill-badge cursor-pointer transition-all duration-200 text-[0.7rem] ${
              filter === "all"
                ? "bg-[rgba(59,130,246,0.15)] border border-[rgba(59,130,246,0.35)] text-[#3b82f6]"
                : "bg-[rgba(255,255,255,0.04)] border border-[rgba(255,255,255,0.08)] text-[#4a6280]"
            }`}
          >
            All
          </button>
          {regions.map((r) => {
            const isActive = filter === r;
            return (
              <button
                key={r}
                onClick={() => setFilter(r)}
                className={`pill-badge cursor-pointer transition-all duration-200 text-[0.7rem] ${
                  isActive
                    ? regionClasses[r]
                    : "bg-[rgba(255,255,255,0.04)] border border-[rgba(255,255,255,0.08)] text-[#4a6280]"
                }`}
              >
                {r}
              </button>
            );
          })}
        </div>

        {/* Spacer */}
        <div className="flex-1" />

        {/* Sort */}
        <div className="flex gap-2">
          <button
            className={iconBtn(sortOrder === "asc")}
            onClick={() => sortCountries("asc")}
            title="Sort A to Z"
          >
            <FaSortAlphaDown />
          </button>
          <button
            className={iconBtn(sortOrder === "desc")}
            onClick={() => sortCountries("desc")}
            title="Sort Z to A"
          >
            <FaSortAlphaUp />
          </button>
        </div>

        {/* View Mode */}
        <div className="flex gap-2">
          <button
            className={iconBtn(viewMode === "grid")}
            onClick={() => setViewMode("grid")}
            title="Grid View"
          >
            <BsGrid3X3GapFill />
          </button>
          <button
            className={iconBtn(viewMode === "list")}
            onClick={() => setViewMode("list")}
            title="List View"
          >
            <BsListUl />
          </button>
        </div>

        {/* Reset */}
        <button
          className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold transition-all duration-200 cursor-pointer border text-slate-500 border-white/8 bg-white/4 hover:text-rose-400 hover:border-rose-400/30 hover:bg-rose-500/8"
          onClick={onReset}
          title="Reset Filters"
        >
          <FaUndo className="text-[0.65rem]" /> Reset
        </button>
      </div>
    </section>
  );
};
