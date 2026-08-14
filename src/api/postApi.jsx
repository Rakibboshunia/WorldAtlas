import axios from "axios";

const DATA_URL = "https://files-03.restcountries.com/countries.00/legacy.json";

let cachedData = null;

const fetchAllCountries = async () => {
  if (cachedData) return cachedData;
  const res = await axios.get(DATA_URL);
  cachedData = res.data;
  return cachedData;
};

// HTTP GET METHOD
export const getCountryData = async () => {
  const data = await fetchAllCountries();
  return { data };
};

// HTTP GET METHOD fro the indvi. country name
export const getCountryIndData = async (name) => {
  const data = await fetchAllCountries();
  const country = data.find(
    (c) => c.name?.common?.toLowerCase() === name.toLowerCase() ||
           c.name?.official?.toLowerCase() === name.toLowerCase()
  );
  return { data: country ? [country] : [] };
};

// HTTP GET METHOD for multiple country codes (border countries)
export const getCountriesByCodes = async (codes) => {
  const data = await fetchAllCountries();
  const borders = data.filter((c) =>
    c.cca3 && codes.includes(c.cca3)
  );
  return { data: borders };
};
