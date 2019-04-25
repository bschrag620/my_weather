import React, { Component } from 'react'
import Location from '../components/location'
import uuid from 'uuid'

export default class LocationsContainer extends Component {

	render () {
		return (
			<div className="locations-container">

				{this.props.locations.map( location => 
					<Location location={location} key={uuid()}/>
					)}				
			</div>
		)
	}
}