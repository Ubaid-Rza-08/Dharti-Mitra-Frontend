
// components/common/WeatherWidget.jsx
import React, { useState, useEffect } from 'react';
import { 
  Cloud, Thermometer, Droplets, Wind, 
  Loader, AlertTriangle 
} from 'lucide-react';

const WeatherWidget = ({ city = 'Delhi' }) => {
  const [weather, setWeather] = useState({
    loading: true,
    data: null,
    error: null
  });

  useEffect(() => {
    // Mock weather data
    setTimeout(() => {
      setWeather({
        loading: false,
        data: {
          name: city,
          temp: 25,
          humidity: 65,
          condition: 'Clear',
          windSpeed: 2.5
        },
        error: null
      });
    }, 1000);
  }, [city]);

  if (weather.loading) {
    return (
      <div className="fixed top-20 right-4 bg-gradient-to-r from-green-600 to-green-500 text-white p-4 rounded-xl shadow-lg z-40">
        <div className="flex items-center space-x-2">
          <Loader className="h-4 w-4 animate-spin" />
          <span className="text-sm">Loading weather...</span>
        </div>
      </div>
    );
  }

  if (weather.error) {
    return (
      <div className="fixed top-20 right-4 bg-red-500 text-white p-4 rounded-xl shadow-lg z-40">
        <div className="flex items-center space-x-2">
          <AlertTriangle className="h-4 w-4" />
          <span className="text-sm">Weather unavailable</span>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed top-20 right-4 bg-gradient-to-r from-green-600 to-green-500 text-white p-4 rounded-xl shadow-lg z-40 min-w-[200px]">
      <h4 className="flex items-center text-sm font-semibold mb-3">
        <Cloud className="h-4 w-4 mr-2" />
        Current Weather
      </h4>
      <div className="text-center font-medium mb-2">{weather.data.name}</div>
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Thermometer className="h-4 w-4" />
          <span className="text-sm">{weather.data.temp}°C</span>
        </div>
        <div className="flex items-center justify-between">
          <Droplets className="h-4 w-4" />
          <span className="text-sm">{weather.data.humidity}%</span>
        </div>
        <div className="flex items-center justify-between">
          <Cloud className="h-4 w-4" />
          <span className="text-sm">{weather.data.condition}</span>
        </div>
        <div className="flex items-center justify-between">
          <Wind className="h-4 w-4" />
          <span className="text-sm">{weather.data.windSpeed} m/s</span>
        </div>
      </div>
    </div>
  );
};

export default WeatherWidget;