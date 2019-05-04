import React, { Component } from 'react'
import { Row } from 'react-bootstrap'
import { Col } from 'react-bootstrap'
import LocationContainer from './locationContainer'
import uuid from 'uuid'

const noLocation = () => (
	<Col>Enter a location to get started</Col>
)

const renderLocations = (locations, retrieveCurrentConditions) => {
	if (locations.length > 0) {
		return locations.map( location => <LocationContainer data={location} key={uuid()} />)
	} else {
		return noLocation()
	}
}

class LocationsContainer extends Component {

	render () {
		return (
			<Row className='locations-container'>
				{renderLocations(this.props.locations, this.props.retrieveCurrentConditions)}
			</Row>
		)
	}
}

export default LocationsContainer