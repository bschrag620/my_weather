import React, { Component } from 'react'
import { Row, Container } from 'react-bootstrap'
import LocationContainer from './locationContainer'
import LocationInput from '../components/locationInput'
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
				<LocationInput retrieveLocation={this.props.retrieveLocation} />
				<Row className='locations-container dark'>
					{renderLocations(this.props.locations, this.props.retrieveCurrentConditions)}
				</Row>
			</Container>
		)
	}
}

export default LocationsContainer