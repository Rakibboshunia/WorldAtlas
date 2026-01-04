import { useEffect, useState, useTransition } from 'react'
import { getCountryData } from '../Api/postApi';
import { Loader } from '../components/UI/Loader';
import { CountryCard } from "../components/Layout/CountryCard";

const Country = () => {

  const [ispending, startTransition] = useTransition();
  const [countries, setCountries] = useState([]);

  useEffect (() => {
    startTransition(async () => {
    const res = await getCountryData();
    setCountries(res.data);
    });
  }, []);

  if(ispending) return <Loader />
  return (
    <section className="country-section">
      <ul className="grid grid-four-cols">
        {countries.map((curCountry, index) => {
          return <CountryCard country={curCountry} key={index} />;
        })}
      </ul>
    </section>
  );
};

export default Country
