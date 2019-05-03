import React, { Component } from 'react'
import { Row } from 'react-bootstrap'
import Location from '../components/location'
import uuid from 'uuid'

class LocationsContainer extends Component {

	render () {
		return (
			<Row className='locations-container'>
				{this.props.locations.map( location => 
					<Location location={location} key={uuid()} retrieveCurrentConditions={this.props.retrieveCurrentConditions}/>
				)}				
			</Row>
		)
	}
}

export default LocationsContainer