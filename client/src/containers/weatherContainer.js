import React, { Component } from 'react';
import LocationInput from '../components/locationInput'

class WeatherContainer extends Component {

	render() {
		return (
			<div className="weather-container">
				Weather container <br/>
				<LocationInput /> <br/>
				add in weather display <br/>
			</div>
		)
	}
}

export default WeatherContainer