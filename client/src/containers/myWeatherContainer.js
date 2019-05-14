import React, { Component } from 'react';
import { connect } from 'react-redux'
import retrieveLocation from '../actions/location_actions'
import { Container } from 'react-bootstrap'
import LocationsContainer from './locationsContainer'
import DisplayContainer from './displayContainer'


class MyWeatherContainer extends Component {

	setURL() {
		if (this.props.currentLocation && this.props.currentLocation.zip) {
			const zip = this.props.currentLocation.zip

			if (this.props.location.pathname.split('/')[1] !== zip.toString()) {
				this.props.history.push('/' + zip)
			}

			if (!this.props.match.params.displayType) {
				this.props.history.push('/' + zip + '/detail')
			}
		}
	}

	componentWillMount() {
		// checking for initial landing of the site to include a zip code
		// ..../[0-9]{5}
		// if there is a zip, load the location
		if (this.props.match.params.zip && !this.props.locations.find( l => l.zip.toString() === this.props.match.params.zip)) {
			this.props.retrieveLocation(this.props.match.params.zip)
		}

		// let componentDidUpdate handle checking for the rest of the url
		// ..../:zip/ [detail | hourly | weekly ]
		// it will automatically add detail if not there
	}

	componentDidUpdate() {
		this.setURL()
	}

	render() {

		return (
			<Container className="weather-container">
				<LocationsContainer retrieveLocation={this.props.retrieveLocation} locations={this.props.locations} />
				<DisplayContainer currentLocation={this.props.currentLocation} />
			</Container>
		)
	}
}

const mapStateToProps = state => {
	return {
		locations: state.locationReducer.locations,
		currentLocation: state.sessionReducer.currentLocation
	}
}

const mapDispatchToProps = dispatch => {
	return {
		retrieveLocation: (text) => dispatch(retrieveLocation(text)),
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(MyWeatherContainer)