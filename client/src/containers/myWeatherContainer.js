import React, { Component } from 'react';
import LocationInput from '../components/locationInput'
import { connect } from 'react-redux'
import retrieveLocation from '../actions/location_actions'
import LocationsContainer from './locationsContainer'
import DisplayContainer from './displayContainer'

class MyWeatherContainer extends Component {
	constructor(props) {
		super(props)

		if (props.match.params.zip) {
			const zip = props.match.params.zip

			props.retrieveLocation(zip)
		}
	}

	render() {
		return (
			<div className="weather-container">
				<LocationInput retrieveLocation={this.props.retrieveLocation} /> <br/>
				<LocationsContainer locations={this.props.locations} />
				<DisplayContainer />
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
		retrieveLocation: (text) => dispatch(retrieveLocation(text))
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(MyWeatherContainer)