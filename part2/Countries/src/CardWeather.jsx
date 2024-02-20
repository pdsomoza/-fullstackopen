const CardWeather = ({ weather }) => {
  if (weather !== null) {
    const srcImg =  `https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`
    return (
      <>
        <h2>Weather in {weather.city}</h2>
        <p>temperature {weather.main.temp} celcius</p>
        <img src={srcImg} />
        <p>wind {weather.wind.speed} m/s</p>
      </>
    );
  }
};

export default CardWeather;
