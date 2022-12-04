import React, { Component } from "react";
import WeatherCard from "./Components/WeatherCard";
import axios from "axios";
import "./App.css";
export class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      city: "",
      description: "",
      icon: "",
      temp: "",
      country: "",
      loading: false,
      location: "",
    };
  }

  getCurrWeather = () => {
    this.setState({ loading: true });
    navigator.geolocation.getCurrentPosition((position) => {
      const key = "29da4ac9ed4552e77d90788296abc187";
      const urlCurrLoc = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&units=metric&appid=${key}`;
      axios
        .get(urlCurrLoc)
        .then((res) => {
          const weather = res.data;
          this.setState({
            city: weather.name,
            description: weather.weather[0].description,
            icon: weather.weather[0].icon,
            temp: weather.main.temp,
            country: weather.sys.country,
            loading: false,
          });
          console.log(weather);
        })
        .catch((err) => console.log(err));
    });
  };

  componentDidMount() {
    if (navigator.geolocation) {
      this.getCurrWeather();
    } else {
      alert("pls enable access to your location");
    }
  }

  getInputCityWeather = () => {
    const key = "29da4ac9ed4552e77d90788296abc187";
    const urlCity = `https://api.openweathermap.org/data/2.5/weather?q=${this.state.location}&APPID=${key}`;
    axios
      .get(urlCity)
      .then((res) => {
        const weather = res.data;
        this.setState({
          city: weather.name,
          description: weather.weather[0].description,
          icon: weather.weather[0].icon,
          temp: weather.main.temp,
          loading: false,
        });
        console.log(weather);
      })
      .catch((err) => console.log(err));
  };

  componentWillMount() {
    if (this.state.city) {
      this.getInputCityWeather();
    }
  }

  getLocWeather = (e) => {
    this.setState({
      location: e.target.value,
    });
    console.log(e.target.value);
  };

  render() {
    const { city, temp, icon, country, description, loading } = this.state;
    return (
      <div>
        <WeatherCard
          city={city}
          temp={temp}
          icon={icon}
          description={description}
          country={country}
          loading={loading}
          getLocWeather={this.getLocWeather}
          getInputCityWeather={this.getInputCityWeather}
        />
      </div>
    );
  }
}

export default App;
