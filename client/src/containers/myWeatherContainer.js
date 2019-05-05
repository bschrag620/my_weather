import React, { Component } from 'react';
import LocationInput from '../components/locationInput'
import { connect } from 'react-redux'
import retrieveLocation from '../actions/location_actions'
import LocationsContainer from './locationsContainer'
import DisplayContainer from './displayContainer'
import { BrowserRouter as Router, Route } from 'react-router-dom'

class MyWeatherContainer extends Component {
	componentDidMount() {
		const zip = this.props.match.params.zip
		const matchingLocation = this.props.locations.find( loc => loc.zip === zip )
		if (!matchingLocation) {
			debugger;
			this.props.retrieveLocation(zip)
		}
	}

	render() {
		return (
			<Router>
				<div className="weather-container">
					<LocationInput retrieveLocation={this.props.retrieveLocation} /> <br/>
					<LocationsContainer locations={this.props.locations} />
					<Route path={this.props.match.url} component={ DisplayContainer }/>
				</div>
			</Router>
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