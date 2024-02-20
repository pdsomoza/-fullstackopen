import { useState, useEffect } from "react";
import service from "./services/data";
import CardWeather from "./CardWeather";
import Countries from "./Countries";
import Card from "./Card";

function App() {
  const [country, setCountry] = useState(null);
  const [weather, setWeather] = useState(null);
  const [countries, setCountries] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);

  useEffect(() => {
    if (country === null) {
      service
        .getAll()
        .then((initialCountries) => setCountries(initialCountries));
    } else {
      const latlng = country.capitalInfo.latlng;
      service.getWeather(latlng).then((data) => setWeather({...data, city : country.capital[0]}));
    }
  }, [country]);

  const handleShow = (name) => {
    setCountry(
      filteredCountries.find((c) =>
        c.name.common.toLowerCase().includes(name.toLowerCase())
      )
    );
    setFilteredCountries([]);
  };

  const handleFilter = (e) => {
    const searchTerm = e.target.value;
    if (searchTerm.trim() === "") setFilteredCountries([]);
    else {
      const filteredItems = countries.filter((c) =>
        c.name.common.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setCountry(null);
      setWeather(null);
      setFilteredCountries(filteredItems);

      if (filteredItems.length === 1) setCountry(filteredItems[0]);
    }
  };

  return (
    <>
      <p>
        find countries <input onChange={handleFilter} spellCheck="false" />
      </p>
      <Countries allCountries={filteredCountries} onShow={handleShow} />
      <Card country={country} />
      <CardWeather weather={weather} />
    </>
  );
}

export default App;
