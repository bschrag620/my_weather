import React, { Component } from 'react'
import Location from '../components/location'
import retrieveCurrentConditions from '../actions/weather_actions'
import uuid from 'uuid'


class LocationsContainer extends Component {

	render () {
		return (
			<div className="locations-container">
				{this.props.locations.map( location => 
					<Location location={location} key={uuid()} retrieveCurrentConditions={this.props.retrieveCurrentConditions}/>
				)}				
			</div>
		)
	}
}

export default LocationsContainer