import React, { Component } from 'react'
import { Row, Container } from 'react-bootstrap'
import LocationContainer from './locationContainer'
import LocationInput from '../components/locationInput'
import { connect } from 'react-redux'
import uuid from 'uuid'

class LocationsContainer extends Component {
	
	handleSettingsChange = () => {
		if (this.props.session.delayed && this.props.session.delayed.units) {
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
					{ this.props.locations.map( location => <LocationContainer data={location} key={uuid()} units={this.props.session.units} handleSettingsChange={this.handleSettingsChange} />) } 
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