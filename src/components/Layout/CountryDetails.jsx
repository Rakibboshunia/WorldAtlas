
import { useEffect, useState, useTransition } from "react";
import { NavLink, useParams } from "react-router-dom";
import { getCountryIndData, getCountriesByCodes } from "../../api/postApi";
import { Loader } from "../UI/Loader";
import { FaArrowLeft } from "react-icons/fa";

export const CountryDetails = () => {
  const params = useParams();

  const [isPending, startTransition] = useTransition();
  const [country, setCountry] = useState(null);
  const [borderCountries, setBorderCountries] = useState([]);

  useEffect(() => {
    startTransition(async () => {
      try {
        const res = await getCountryIndData(params.id);
        if (res.status === 200 && res.data && res.data[0]) {
          const countryData = res.data[0];
          setCountry(countryData);

          // Fetch borders if they exist
          if (countryData.borders && countryData.borders.length > 0) {
            const bordersRes = await getCountriesByCodes(countryData.borders);
            if (bordersRes.status === 200) {
              setBorderCountries(bordersRes.data);
            }
          }
        }
      } catch (error) {
        console.error("Error fetching country details:", error);
      }
    });
  }, [params.id]);

  if (isPending || !country) return <Loader />;

  // Safely extract native names
  const nativeNames = country.name.nativeName
    ? Object.keys(country.name.nativeName)
        .map((key) => country.name.nativeName[key].common)
        .join(", ")
    : "N/A";

  // Safely extract currencies
  const currencies = country.currencies
    ? Object.keys(country.currencies)
        .map((key) => `${country.currencies[key].name} (${country.currencies[key].symbol || ""})`)
        .join(", ")
    : "N/A";

  // Safely extract languages
  const languages = country.languages
    ? Object.keys(country.languages)
        .map((key) => country.languages[key])
        .join(", ")
    : "N/A";

  return (
    <section className="country-details-section container">
      <div className="details-header">
        <NavLink to="/country" className="back-btn-link">
          <button className="btn-back">
            <FaArrowLeft /> Back to Countries
          </button>
        </NavLink>
      </div>

      <div className="details-card-container">
        <div className="details-hero">
          <div className="details-flag-wrapper">
            <img
              src={country.flags.svg}
              alt={country.flags.alt || `Flag of ${country.name.common}`}
              className="details-flag"
            />
          </div>
          
          <div className="details-title-area">
            <h2 className="details-name">{country.name.common}</h2>
            <p className="details-official-name">{country.name.official}</p>
            <span className="details-region-badge">{country.region}</span>
          </div>
        </div>

        <div className="details-info-grid">
          <div className="info-card">
            <h3>Geographic Info</h3>
            <div className="info-list">
              <p><span className="info-label">Capital:</span> <span className="info-val">{country.capital ? country.capital.join(", ") : "N/A"}</span></p>
              <p><span className="info-label">Sub Region:</span> <span className="info-val">{country.subregion || "N/A"}</span></p>
              <p><span className="info-label">Native Names:</span> <span className="info-val">{nativeNames}</span></p>
              <p><span className="info-label">Top Level Domain:</span> <span className="info-val">{country.tld ? country.tld.join(", ") : "N/A"}</span></p>
            </div>
            {country.maps?.googleMaps && (
              <a href={country.maps.googleMaps} target="_blank" rel="noopener noreferrer" style={{marginTop: '2rem', display: 'inline-block', width: '100%'}}>
                <button className="btn-darken" style={{width: '100%', justifyContent: 'center'}}>
                  🗺️ View on Google Maps
                </button>
              </a>
            )}
          </div>

          <div className="info-card">
            <h3>Demographics & Economy</h3>
            <div className="info-list">
              <p><span className="info-label">Population:</span> <span className="info-val">{country.population.toLocaleString()}</span></p>
              <p><span className="info-label">Currencies:</span> <span className="info-val">{currencies}</span></p>
              <p><span className="info-label">Languages:</span> <span className="info-val">{languages}</span></p>
            </div>
          </div>
        </div>

        {/* Border Countries Section */}
        <div className="details-borders-section">
          <h3>Bordering Countries</h3>
          {borderCountries.length > 0 ? (
            <div className="borders-badges-grid">
              {borderCountries.map((border) => (
                <NavLink
                  key={border.name.common}
                  to={`/country/${border.name.common}`}
                  className="border-country-badge"
                >
                  <img
                    src={border.flags.svg}
                    alt={border.name.common}
                    className="border-badge-flag"
                  />
                  <span className="border-badge-name">{border.name.common}</span>
                </NavLink>
              ))}
            </div>
          ) : (
            <p className="no-borders-text">This country has no land borders.</p>
          )}
        </div>
      </div>
    </section>
  );
};
