import React, { Component } from 'react';
import { DateDisplay } from "./components/DateDisplay";
import { TimeDisplay } from "./components/TimeDisplay";
import { LocationTitleDisplay } from "./components/LocationTitleDisplay";
import { WeatherBoxDisplay } from "./components/WeatherBoxDisplay";
import * as APIHelpers from "./utils/APIHelpers";
import "normalize.css";
import "./App.css";

export class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      currentCoordinates: [],
      currentLocation: "",
      currentTemp: "",
      currentSummary: "",
      currentDaySummary: "",
      currentWind: "",
      currentHumidity: "",
      currentVisibility: "",
      currentIcon: "",
      currentDate: new Date(),
      error: null
    };
  }

  componentDidMount() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          this._getForecast(position.coords.latitude, position.coords.longitude);

          this._getReverseGeolocation(position.coords.latitude, position.coords.longitude);

          this.setState({
            currentCoordinates: [position.coords.latitude, position.coords.longitude]
          })
        },

        () => {
          this.setState({
            error: new Error("Failed request to geolocation")
          });
        }
      );
    } else {
      this.setState({
        error: new Error("Your browser does not support geolocation")
      });
    }
  }  

  _getForecast = (latitude, longitude) => {
    const url = `https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/86c75ecb51f9869d11c2dcfb869d069a/${latitude},${longitude}`

    APIHelpers.apiSkeleton(url, APIHelpers.options, this._onForecastSuccess, this._onForecastFail);
  }

  _onForecastSuccess = (response) => {
    const currentTemp = response.currently.temperature;
    const currentSummary = response.currently.summary;
    const currentDaySummary = response.hourly.summary;
    const currentWind = response.currently.windSpeed;
    const currentHumidity = response.currently.humidity;
    const currentVisibility = response.currently.visibility;
    const currentIcon = response.currently.icon;

    this.setState({
      currentTemp,
      currentSummary,
      currentDaySummary,
      currentWind,
      currentHumidity,
      currentVisibility,
      currentIcon
    })
  }

  _onForecastFail = (error) => {
    this.setState({
      error
    });
  }

  _getReverseGeolocation = (latitude, longitude) => {

    const url = `https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=AIzaSyB2mV9wU6kQ4pTU-MFS1vUSRaAilCXorxA`;

    APIHelpers.apiSkeleton(url, APIHelpers.options, this._onReverseGeolocationSuccess, this._onReverseGeolocationFail);
  }

  _onReverseGeolocationSuccess = (response) => {
    const currentLocation = response.results[1].formatted_address;

    this.setState({
      currentLocation
    })
  }
  
  _onReverseGeolocationFail = (error) => {
    this.setState({
      error
    });
  }

  render() {
    const error = this.state.error;
    const currentWeather = {
      currentTemp: this.state.currentTemp,
      currentSummary: this.state.currentSummary,
      currentDaySummary: this.state.currentDaySummary,
      currentWind: this.state.currentWind,
      currentHumidity: this.state.currentHumidity,
      currentVisibility: this.state.currentVisibility,
      currentIcon: this.state.currentIcon
    };

    return (

      <div id="app-body">
        <div id="title-time">
          <DateDisplay dateString={this.state.currentDate.toLocaleDateString("en-us")} day={this.state.currentDate.getDate()} month={this.state.currentDate.getMonth()} year={this.state.currentDate.getFullYear()} />
          <LocationTitleDisplay currentLocation={this.state.currentLocation} />
          <TimeDisplay hour={this.state.currentDate.getHours()} minute={this.state.currentDate.getMinutes()} time={this.state.currentDate.toLocaleTimeString("en-US", {hour: "2-digit", minute: "2-digit"})} />
        </div>
        <div>
          <WeatherBoxDisplay currentWeather={currentWeather} />
        </div> 

        {
          error &&
          <div style={{ color: 'red' }}>
            {error.message || error.toString} {` (${error.status} ${error.statusText})`}
          </div>
        }
      </div>
    );
  }
}
