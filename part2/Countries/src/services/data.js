import axios from "axios";
const baseUrl = "https://studies.cs.helsinki.fi/restcountries/api";

const getAll = async () => {
  const request = axios.get(`${baseUrl}/all`);
  const response = await request;
  return response.data;
};

const getWeather = async (latlng) => {
  const request = axios.get(
    `https://api.openweathermap.org/data/2.5/weather?lat=${latlng[0]}&lon=${
      latlng[1]
    }&units=metric&appid=${import.meta.env.VITE_OPENWEATHER_KEY}`
  );
  const response = await request;
  return response.data;
};

export default { getAll, getWeather };
