import React, { Component } from 'react'
import { Row, Container } from 'react-bootstrap'
import LocationContainer from './locationContainer'
import LocationInput from '../components/locationInput'
import { connect } from 'react-redux'
import uuid from 'uuid'

const noLocation = () => (
	"Enter a location to get started"
)

const renderLocations = (locations, retrieveCurrentConditions, units, handleSettingsChange) => {
	if (locations.length > 0) {
		return locations.map( location => <LocationContainer data={location} key={uuid()} units={units} handleSettingsChange={handleSettingsChange}/>)
	} else {
		return noLocation()
	}
}

class LocationsContainer extends Component {
	handleSettingsChange() {
		if (this.props.session.delayed && this.props.session.units !== this.props.session.delayed.units) {
			this.props.updateSettings(this.props.session.delayed)
			this.props.clearDelayed('units')
			return true
		} else {
			return false
		}
	}

	render () {

		return (
			<Container>
				<LocationInput retrieveLocation={this.props.retrieveLocation} />
				<Row className='locations-container transparent'>
					{renderLocations(this.props.locations, this.props.retrieveCurrentConditions, this.props.session.units, this.handleSettingsChange.bind(this))}
				</Row>
			</Container>
		)
	}
}

const mapStateToProps = state => {
	return {
		session: state.sessionReducer
	}
}

const mapDispatchToProps = dispatch => {
	return {
		updateSettings: settings => {
			dispatch({
				type: 'UPDATE_SETTINGS',
				payload: settings
				})
		},
		clearDelayed: settings => {
			dispatch({
				type: 'CLEAR_DELAYED',
				payload: settings
			})
		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(LocationsContainer)