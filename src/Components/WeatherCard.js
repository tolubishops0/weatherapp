import React, { Component } from "react";
import moment from "moment/moment";
import "../App.css";

class WeatherCard extends Component {
  render() {
    return (
      <div className="content__page">
        <div className="input-div">
          <div className="location-icon">
            <span>
              <ion-icon name="location-outline" className="icon"></ion-icon>
              {this.props.city} in {this.props.country}
            </span>
            <span>
              {moment().format("dddd")} {moment().format("LL")}
            </span>
          </div>

          <form
            className="form-input"
            onSubmit={(e) => {
              e.preventDefault();
              this.props.getInputCityWeather();
            }}
          >
            <input
              type="text"
              placeholder="enter location"
              onChange={this.props.getLocWeather}
              value={this.props.location}
            />
          </form>
        </div>

        {this.props.loading ? <>Loading...</> : ""}
        <div className="weathericon">
          <img
            className="weather-icon"
            src={`http://openweathermap.org/img/w/${this.props.icon}.png`}
            alt="weather icon"
          />
          <h1 className="temp">{this.props.temp}℃</h1>
          <img
            className="weather-icon"
            src={`http://openweathermap.org/img/w/${this.props.icon}.png`}
            alt="weather icon"
          />
        </div>
        <p className="description">{this.props.description}</p>
      </div>
    );
  }
}
export default WeatherCard;
