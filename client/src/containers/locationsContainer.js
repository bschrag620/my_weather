import React, { Component } from 'react'
import { Row, Container } from 'react-bootstrap'
import LocationContainer from './locationContainer'
import uuid from 'uuid'

const noLocation = () => (
	"Enter a location to get started"
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
			<Container>
				<Row className='locations-container' style={{backgroundColor: '#333333', color: 'white'}}>
					{renderLocations(this.props.locations, this.props.retrieveCurrentConditions)}
				</Row>
			</Container>
		)
	}
}

export default LocationsContainer