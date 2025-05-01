import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { MagnifyingGlassIcon } from '@heroicons/react/24/solid';

const Weather = () => {
  const [city, setCity] = useState(() => {
    return localStorage.getItem('weatherCity') || '';
  });
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchInput, setSearchInput] = useState('');

  // For demo purposes, we'll use a mock function instead of a real API call
  const fetchWeather = async (cityName) => {
    if (!cityName) return;
    
    setLoading(true);
    setError(null);
    
    try {
      // Comment out the actual API call since we don't have a valid API key
      // const response = await axios.get(
      //   `https://api.weatherapi.com/v1/current.json?key=YOUR_API_KEY&q=${cityName}&aqi=no`
      // );
      
      // Instead, simulate a successful API response with mock data
      setTimeout(() => {
        const mockWeatherData = getMockWeatherData(cityName);
        setWeather(mockWeatherData);
        localStorage.setItem('weatherCity', cityName);
        setLoading(false);
      }, 1000);
      
    } catch (err) {
      console.error('Error fetching weather:', err);
      setError('Failed to fetch weather data. Please try again.');
      setLoading(false);
    }
  };

  // Function to generate mock weather data
  const getMockWeatherData = (cityName) => {
    const temp = Math.floor(Math.random() * 30) + 5; // Random temperature between 5-35°C
    const conditions = ['Sunny', 'Partly cloudy', 'Cloudy', 'Rainy', 'Stormy', 'Snowy', 'Foggy'];
    const randomCondition = conditions[Math.floor(Math.random() * conditions.length)];
    
    return {
      location: {
        name: cityName,
        region: 'Demo Region',
        country: 'Demo Country',
        localtime: new Date().toLocaleString()
      },
      current: {
        temp_c: temp,
        temp_f: (temp * 9/5) + 32,
        condition: {
          text: randomCondition,
          icon: getWeatherIcon(randomCondition)
        },
        wind_kph: Math.floor(Math.random() * 30),
        wind_dir: ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'][Math.floor(Math.random() * 8)],
        humidity: Math.floor(Math.random() * 100),
        feelslike_c: temp - Math.floor(Math.random() * 5),
        uv: Math.floor(Math.random() * 11)
      }
    };
  };

  // Function to get weather icon based on condition
  const getWeatherIcon = (condition) => {
    const conditionMap = {
      'Sunny': '//cdn.weatherapi.com/weather/64x64/day/113.png',
      'Partly cloudy': '//cdn.weatherapi.com/weather/64x64/day/116.png',
      'Cloudy': '//cdn.weatherapi.com/weather/64x64/day/119.png',
      'Rainy': '//cdn.weatherapi.com/weather/64x64/day/296.png',
      'Stormy': '//cdn.weatherapi.com/weather/64x64/day/389.png',
      'Snowy': '//cdn.weatherapi.com/weather/64x64/day/338.png',
      'Foggy': '//cdn.weatherapi.com/weather/64x64/day/248.png'
    };
    
    return conditionMap[condition] || '//cdn.weatherapi.com/weather/64x64/day/116.png';
  };

  useEffect(() => {
    if (city) {
      fetchWeather(city);
    }
  }, [city]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchInput.trim() === '') return;
    setCity(searchInput);
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Weather</h1>
      
      <form onSubmit={handleSearch} className="mb-6 flex">
        <input
          type="text"
          className="input flex-grow mr-2"
          placeholder="Enter city name..."
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
        />
        <button type="submit" className="btn btn-primary flex items-center">
          <MagnifyingGlassIcon className="h-5 w-5 mr-1" />
          Search
        </button>
      </form>
      
      {loading && (
        <div className="text-center py-8">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-400">Loading weather data...</p>
        </div>
      )}
      
      {error && (
        <div className="bg-red-100 dark:bg-red-900 border border-red-400 text-red-700 dark:text-red-200 px-4 py-3 rounded relative mb-6">
          {error}
        </div>
      )}
      
      {weather && !loading && (
        <div className="card">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="text-center md:text-left mb-4 md:mb-0">
              <h2 className="text-2xl font-bold">{weather.location.name}</h2>
              <p className="text-gray-600 dark:text-gray-400">
                {weather.location.region}, {weather.location.country}
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-500">
                {weather.location.localtime}
              </p>
            </div>
            
            <div className="flex items-center">
              {weather.current.condition.icon && (
                <img 
                  src={`https:${weather.current.condition.icon}`} 
                  alt={weather.current.condition.text}
                  className="w-16 h-16"
                />
              )}
              <div className="text-center">
                <div className="text-4xl font-bold">{weather.current.temp_c}°C</div>
                <div className="text-gray-600 dark:text-gray-400">
                  {weather.current.condition.text}
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-2 bg-gray-100 dark:bg-gray-700 rounded-lg">
              <div className="text-gray-500 dark:text-gray-400 text-sm">Feels Like</div>
              <div className="font-semibold">{weather.current.feelslike_c}°C</div>
            </div>
            
            <div className="text-center p-2 bg-gray-100 dark:bg-gray-700 rounded-lg">
              <div className="text-gray-500 dark:text-gray-400 text-sm">Humidity</div>
              <div className="font-semibold">{weather.current.humidity}%</div>
            </div>
            
            <div className="text-center p-2 bg-gray-100 dark:bg-gray-700 rounded-lg">
              <div className="text-gray-500 dark:text-gray-400 text-sm">Wind</div>
              <div className="font-semibold">{weather.current.wind_kph} km/h</div>
            </div>
            
            <div className="text-center p-2 bg-gray-100 dark:bg-gray-700 rounded-lg">
              <div className="text-gray-500 dark:text-gray-400 text-sm">UV Index</div>
              <div className="font-semibold">{weather.current.uv}</div>
            </div>
          </div>
          
          <div className="mt-4 text-sm text-gray-500 dark:text-gray-400 text-center">
            <p>Note: This is simulated weather data for demonstration purposes.</p>
          </div>
        </div>
      )}
      
      {!weather && !loading && !error && (
        <div className="text-center py-8">
          <p className="text-gray-600 dark:text-gray-400">
            Enter a city name to see the weather information.
          </p>
        </div>
      )}
    </div>
  );
};

export default Weather;