import React, { Component } from 'react'
import Location from '../components/location'

export default class LocationsContainer extends Component {

	render () {
		return (
			<div className="locations-container">

				{this.props.locations.map( location => 
					<Location location={location} />
					)}				
			</div>
		)
	}
}