
export const SearchFilter = ({
  search,
  setSearch,
  filter,
  setFilter,
  countries,
  setCountries,
}) => {
  const handleInputChange = (event) => {
    setSearch(event.target.value);
  };

  const handleSelectChange = (event) => {
    setFilter(event.target.value);
  };

  const sortCountries = (order) => {
    const sorted = [...countries].sort((a, b) =>
      order === "asc"
        ? a.name.common.localeCompare(b.name.common)
        : b.name.common.localeCompare(a.name.common)
    );
    setCountries(sorted);
  };

  return (
    <section className="section-searchFilter container">
      <input
        type="text"
        placeholder="Search country..."
        value={search}
        onChange={handleInputChange}
      />

      <button onClick={() => sortCountries("asc")}>A → Z</button>
      <button onClick={() => sortCountries("desc")}>Z → A</button>

      <select value={filter} onChange={handleSelectChange}>
        <option value="all">All</option>
        <option value="Africa">Africa</option>
        <option value="Americas">Americas</option>
        <option value="Asia">Asia</option>
        <option value="Europe">Europe</option>
        <option value="Oceania">Oceania</option>
      </select>
    </section>
  );
};
