import React from "react";
import ReactAnimatedWeather from "react-animated-weather";

export class CurrentWeatherDisplay extends React.Component {

  componentWillReceiveProps() {
    const iconOptions = (currentIcon) => {
      switch (this.props.currentWeather.currentIcon) {
        case "clear-day": return {
          icon: 'CLEAR_DAY',
          color: '#fce637',
          size: 150,
          animate: true
        };
        case "clear-night": return {
          icon: 'CLEAR_NIGHT',
          color: '#FFFFFF',
          size: 150,
          animate: true
        };
        case "partly-cloudy-day": return {
          icon: 'PARTLY_CLOUDY_DAY',
          color: '#FFFDED',
          size: 150,
          animate: true
        };
        case "partly-cloudy-night": return {
          icon: 'PARTLY_CLOUDY_NIGHT',
          color: '#edf4ff',
          size: 150,
          animate: true
        };
        case "cloudy": return {
          icon: 'CLOUDY',
          color: '#edf4ff',
          size: 150,
          animate: true
        };
        case "rain": return {
          icon: 'RAIN',
          color: '#91bbff',
          size: 150,
          animate: true
        };
        case "sleet": return {
          icon: 'SLEET',
          color: '#7d99c6',
          size: 150,
          animate: true
        };
        case "snow": return {
          icon: 'SNOW',
          color: '#c2cad6',
          size: 150,
          animate: true
        };
        case "wind": return {
          icon: 'CLEAR_DAY',
          color: 'goldenrod',
          size: 150,
          animate: true
        };
        case "fog": return {
          icon: 'FOG',
          color: '#cdd1d6',
          size: 150,
          animate: true
        };
      }
    };
    const currentIconOptions = iconOptions(this.props.currentIcon);
}

  render() {

    return (
      <div>
        <div id="weather-summary"> 
          <ReactAnimatedWeather icon={currentIconOptions.icon} color={currentIconOptions.color} size={currentIconOptions.size} animate={currentIconOptions.animate} />
          <h1>{this.props.currentWeather.currentSummary || "Should be weather here"}</h1>
          <h1>{Math.round(this.props.currentWeather.currentTemp) || "Should be temperature here"}</h1>
          <button>Change temperature type!</button>
        </div>
        <div id="weather-misc">
          <p>
            Wind: {this.props.currentWeather.currentWind || "Windspeed"} mph
            Humidity: {(this.props.currentWeather.currentHumidity * 100) || "Humidity"}%
            Visibility: {this.props.currentWeather.currentVisibility || "Miles"} miles
          </p>
        </div>
        <div>
          <p>{this.props.currentWeather.currentDaySummary || "Should be more specific weather here"}</p>
        </div>
      </div>
    );
  }
}