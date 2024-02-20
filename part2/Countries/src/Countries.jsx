
const Countries = ({ allCountries, onShow }) => {
  if (allCountries.length > 10)
    return <p>Too many matches, specify another filter</p>;

  if (allCountries.length < 10 && allCountries.length > 1) {
    return (
      <>
        {allCountries.map((c) => (
          <p key={c.name.common}>{c.name.common} <button onClick={() => onShow(c.name.common)}>show</button></p>
        ))}
      </>
    );
  }
};

export default Countries;
