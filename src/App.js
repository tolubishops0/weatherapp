import React, { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";
import WeatherCard from "./Components/WeatherCard";

function App() {
  const [lat, setLat] = useState("");
  const [long, setLong] = useState("");

  const [data, setData] = useState([]);
  const [city, setCity] = useState("");

  const [loading, setLoading] = useState(false);

  const key = "29da4ac9ed4552e77d90788296abc187";
  const urlCurrLoc = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&units=metric&appid=${key}`;
  const urlCity = `https://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=${key}`;

  const getGeoLocData = () => {
    setLoading(true);
    navigator.geolocation.getCurrentPosition(function (position) {
      setLat(position.coords.latitude);
      setLong(position.coords.longitude);
    });

    axios
      .get(urlCurrLoc)
      .then((response) => {
        setData(response.data);
        setLoading(false);
        console.log(response.data);
      })
      .catch((error) => {
        setLoading(false);
        console.error(`Error: ${error}`);
      });
  };

  useEffect(() => {
    getGeoLocData();
    console.log('useefect called')
  }, [lat, long]);

  const getData = () => {
    axios
      .get(urlCity)
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.log(`Error: ${error}`);
      });
  };

  useEffect(() => {
    getData();
  }, [urlCity]);

  const getCity = (e) => {
    setCity(e.target.value);
  };

  return (
    <div>
      <WeatherCard
        data={data}
        getCity={getCity}
        getData={getData}
        loading={loading}
      />
    </div>
  );
}

export default App;
