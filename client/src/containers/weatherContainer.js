import React, { Component } from 'react';
import LocationInput from '../components/locationInput'
import { connect } from 'react-redux'
import retrieveLocation from '../actions/location_actions'
import setLocation from '../actions/location_actions'
import LocationsContainer from './locationsContainer'

class WeatherContainer extends Component {

	render() {
		return (
			<div className="weather-container">
				Weather container <br/>
				<LocationInput retrieveAndSetLocation={this.props.retrieveAndSetLocation} /> <br/>
				<LocationsContainer locations={this.props.locations} />
				add in weather display <br/>
			</div>
		)
	}
}

const mapStateToProps = state => {
	return {
		locations: state.locationReducer.locations
	}
}

const mapDispatchToProps = dispatch => {
	return {
		retrieveAndSetLocation: 
		(text) => dispatch(retrieveLocation(text))
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(WeatherContainer)