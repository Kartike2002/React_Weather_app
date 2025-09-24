import './App.css'
import { useEffect, useState } from 'react';



// https://api.openweathermap.org/data/2.5/weather?id={city id}&appid={API key}2edc75a3027de1d4f40fb17afa5508d4

const App = () => {
  const [city, setCity] = useState("New York");
  const [weatherData, setWeatherData] = useState(null);
  const current = new Date();
  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  const month = months[current.getMonth()];
  const day = current.getDate();
  const year = current.getFullYear();
  const date = `${month} ${day}, ${year}`;
  const API_KEY = "2edc75a3027de1d4f40fb17afa5508d4";
  const fetchWeatherData = async () => {
    try {
      const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`);
      const data = await response.json();
      console.log(data);
      setWeatherData(data);
    } catch (error) {
      console.error("Error fetching weather data:", error);
    }
  };

  useEffect(() => {
    fetchWeatherData();
  }, []);

  const handleInputChange = (event) => {
    event.preventDefault();
    setCity(event.target.value);
  };

  const handleSearch = () => {
    fetchWeatherData();
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    fetchWeatherData();
  };

const getWeatherIconUrl = (main) => {
  switch (main) {
    case 'Clouds':
      return '/thunder.png';
    case 'Rain':
      return '/rain_with_cloud.png';
    case 'Mist':
      return '/Tornado.png';
    case 'Haze':
      return '/sun.png';
    default:
      return '/sun.png'; 
  }
};



  return (
    <>
      <div className="container p-5 my-6 mx-auto min-h-[80vh] rounded-xl bg-sky-400  text-white w-1/3">
        {weatherData && (

          <>
            <div className='flex flex-col justify-center items-center'>
              <h1 className='container_city text-3xl font-bold'>{city}</h1>
              <h1 className='container_date' >{date}</h1>

          <img src={getWeatherIconUrl(weatherData.weather[0].main)} width="180" alt='weather icon' />

              <h1 className='text-3xl font-bold mb-2'>{weatherData.main.temp}°C</h1>
              <form action="" className='w-3/4' onSubmit={handleSubmit}>
                <input type="text" placeholder='Enter the city name' className='  w-full p-2  bg-white text-black rounded-lg mb-4' onChange={handleInputChange} />
                <button className='w-full p-2 bg-blue-700 text-white rounded-lg' onClick={handleSearch}>Search</button>
              </form>
            </div>
            <div className='mt-25'>
            </div>
          </>
        )}

      </div>

    </>
  )
};


export default App
