const Card = ({ country }) => {
  if(country !== null){
    return (
      <>
        <h1>{country.name.common}</h1>
        <p>capital: {country.capital}</p>
        <p>area: {country.area}</p>
        <h3>languages:</h3>
        <ul>
          {Object.entries(country.languages).map(([key, v]) => (
            <li key={key}>{v}</li>
          ))}
        </ul>
  
        <img src={country.flags["png"]} />
      </>
    );
  } 
};

export default Card;
