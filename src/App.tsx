import React, { useState, useEffect, useCallback } from 'react';
import './styles/App.scss';
import { Location, Weather, Coords } from './Models';
import CityChanger from './CityChanger';
import CityName from './CityName';
import WeatherView from './WeatherView';
import WeatherAttributes from './WeatherAttributes';
import MetricChanger from './MetricChanger';

function App() {  
  const apiKey = "23044155044bd05cf1e7831dd739fd31";
  const [location, setLocation] = useState<Location>();
  const [weather, setWeather] = useState<Weather>();
  const [units, setUnits] = useState('metric');
  const [cityChanger, showChanger] = useState<boolean | string>(false);

  const locationByIP = useCallback(async () => {
    let response = await fetch('http://ip-api.com/json?lang=ru&fields=city');
    let data = await response.json();
    setLocation(data);
  }, []);

  const geolocation = useCallback(async () => {
      if ("geolocation" in navigator) {
          navigator.geolocation.getCurrentPosition(
            (position) => { 
              if (position) {
                let coords: Coords = {latitude: position.coords.latitude, longitude: position.coords.longitude};
                setLocation({coords: coords });
              }                    
            },
            () => {
              showChanger('Геолокация недоступна');
            }
          );
      } else {
        locationByIP();
      }
  }, [locationByIP]);

  const fetchWeather = useCallback(async () => {
    let url = "https://api.openweathermap.org/data/2.5/weather?lang=RU&";
    if (location) {
      if (location.coords) {
        url += `lat=${location.coords.latitude}&lon=${location.coords.longitude}&appid=${apiKey}&units=${units}`;
      } else {
        url += `q=${location.city}&appid=${apiKey}&units=${units}`;
      }
      let response = await fetch(url);
      let data: Weather = await response.json();
      if (data.cod === 200) {
        setWeather(data);
        showChanger(false);
      } else {
        showChanger('Город не найден');
      }      
    }  
  }, [location, units])

  useEffect( ()=>{
    location ? fetchWeather() : geolocation();
  }, [location, fetchWeather, geolocation]);

  return (
    <div className="app">
      <header>
        <CityChanger show={cityChanger} onChange={setLocation} />
        <CityName name={weather?.name} />  
        <div className="city-change" onClick={()=>showChanger(true)}>Сменить город</div>      
        <div className="geolocation" onClick={geolocation}>Моё местоположение</div>
        <MetricChanger onChange={setUnits} />
        <WeatherView weather={weather} />
        <WeatherAttributes weather={weather} units={units} />
      </header>
    </div>
  );
}

export default App;
