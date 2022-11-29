import React from "react";

import moment from "moment/moment";

function WeatherCard({ data, city, getCity, getData, loading }) {
  return (
    <div className="content__page">
      <div className="input-div">
        <div className="location-icon">
          <span>
            <ion-icon name="location-outline" className="icon"></ion-icon>
            {data.name} in {data.weather && data.sys.country}
          </span>
          <span>
            {moment().format("dddd")} {moment().format("LL")}
          </span>
        </div>

        <form
          className="form-input"
          onSubmit={(e) => {
            e.preventDefault();
            getData();
          }}
        >
          <input
            type="text"
            placeholder="enter location..."
            value={city}
            onChange={getCity}
          />
        </form>
      </div>

      {loading ? <>Loading...</> : ""}
      <div className="weathericon">
        <img
          alt="icon"
          src={`https://openweathermap.org/img/w/${
            data.weather && data.weather[0].icon
          }.png`}
        />
        <h1 className="temp">{data.weather && data.main.temp}℃</h1>
        <img
          alt="icon"
          src={`https://openweathermap.org/img/w/${
            data.weather && data.weather[0].icon
          }.png`}
        />
      </div>
      <p className="description">{data.weather && data.weather[0].description}</p>
    </div>
  );
}

export default WeatherCard;
