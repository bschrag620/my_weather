import React, { Component } from 'react'
import { CityState, LatLng, Temperature, Wind, Zip } from '../components/stateless/weatherIndex'
import RetrievingData from './stateless/retrievingData'

const generateHourlyCards = forecasts => {
	debugger;
}

export default class HourlyCard extends Component {
	
	render() {
		debugger;
		return <div> {this.props.hourlyForecast.loadingData ? <RetrievingData message="hourly data" /> : generateHourlyCards(this.props.hourlyForecast) } </div>
	}
}