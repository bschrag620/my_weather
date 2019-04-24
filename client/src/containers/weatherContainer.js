import React, { Component } from 'react';
import LocationInput from '../components/locationInput'
import { connect } from 'react-redux'

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

const mapStateToProps = state => {
	return {
		location: state.location
	}
}

const mapDispatchToProps = dispatch => {
	return {
		retrieveLocation: text => dispatch({
			type: 'RETRIEVE_LOCATION',
			text: text
		})
	}
}

export default WeatherContainer