import React, { useState, useEffect } from "react";

interface WeatherProps {
  city: string;
}

interface WeatherInfo {
  city: string;
  temp: number | null;
  description: string | null;
  icon: string | null;
  humidity: number | null;
  windSpeed: number | null;
  sunrise: number | null;
  sunset: number | null;
  localNames: { [key: string]: string } | null;
}

const API_KEY = "4c4f0b1876954338598a7be96c66527b";

export const Weather: React.FC<WeatherProps> = ({ city }) => {
  const [info, setInfo] = useState<WeatherInfo>({
    city: "",
    temp: null,
    description: null,
    icon: null,
    humidity: null,
    windSpeed: null,
    sunrise: null,
    sunset: null,
    localNames: null,
  });
  const [showLocalNames, setShowLocalNames] = useState<boolean>(false);

  const toggleLocalNames = () => {
    setShowLocalNames(!showLocalNames);
  };

  useEffect(() => {
    if (city) {
      fetch(
        `https://api.openweathermap.org/geo/1.0/direct?q=${city}&appid=${API_KEY}`
      )
        .then((res) => res.json())
        .then((data) => {
          if (data && data[0]) {
            fetch(
              `https://api.openweathermap.org/data/2.5/weather?lat=${data[0].lat}&lon=${data[0].lon}&units=metric&appid=${API_KEY}`
            )
              .then((res) => res.json())
              .then((data) => {
                setInfo({
                  city: data.name,
                  temp: data.main.temp,
                  description: data.weather[0].description,
                  icon: `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`,
                  humidity: data.main.humidity,
                  windSpeed: data.wind.speed,
                  sunrise: data.sys.sunrise,
                  sunset: data.sys.sunset,
                  localNames: data[0]?.local_names || null,
                });
              });
          }
        });
    }
  }, [city]);

  return (
    <div>
      <h1>{info.city}</h1>
      <p>{info.temp && Math.round(info.temp)} °C</p>
      <p>{info.description}</p>
      <p>Humidity: {info.humidity} %</p>
      <p>Wind Speed: {info.windSpeed} m/s</p>
      {info.sunrise && (
        <p>Sunrise: {new Date(info.sunrise * 1000).toLocaleTimeString()}</p>
      )}
      {info.sunset && (
        <p>Sunset: {new Date(info.sunset * 1000).toLocaleTimeString()}</p>
      )}
      {info.icon && <img src={info.icon} alt="Weather icon" />}
      {info.localNames && (
        <div>
          <button onClick={toggleLocalNames}>Toggle Local Names</button>
          {showLocalNames &&
            Object.entries(info.localNames).map(([key, name]) => (
              <p key={key}>
                {key}: {name}
              </p>
            ))}
        </div>
      )}
    </div>
  );
};
