import React, { Component } from 'react'
import { Col } from 'react-bootstrap'
import { connect } from 'react-redux'
import RetrievingData from '../components/stateless/retrievingData'
import Location from '../components/location'
import retrieveCurrentConditions, { retrieveHourlyConditions, retrieveWeeklyForecast } from '../actions/weather_actions'
import { setLocation } from '../actions/location_actions'

class LocationContainer extends Component {


	handleClick(){
		const loc = this.props.locations.find( loc => loc.id === this.props.data.id)
		this.props.setLocation(loc)
	}

	retrieveAll() {
		// need to put units in sessionReducer eventually to give users ability to change between metric and imperial
		
		const units = this.props.units
		const code = this.props.currentLocation.preferred_observation_code
		const locationId = this.props.currentLocation.locationId
		const id = this.props.currentLocation.id

		this.props.retrieveCurrentConditions(code, id, units)
		this.props.retrieveHourlyConditions(locationId, id, units)
		this.props.retrieveWeeklyForecast(locationId, id, units)
	}
	
	render() {		
		const setStyling = () => (this.props.currentLocation && (this.props.currentLocation.id === this.props.data.id)) ? {backgroundColor: 'white', color: 'black'} : {backgroundColor: '#333333', color: 'white'}
		const id = this.props.data.id		
		
		return (
			<Col 
				xs md='auto' 
				className="location" 
				id={id} 
				style={setStyling()}
				onClick={this.handleClick.bind(this) }>
				{this.props.data.loadingData ? <RetrievingData message={this.props.data.text} /> : <Location data={this.props.data} retrieveAll={this.retrieveAll.bind(this)} weatherSite={this.props.weatherSites[this.props.data.id]} />}
			</Col>
		)
	}
}

const mapDispatchToProps = dispatch => {
	return {
		retrieveCurrentConditions: (code, id, units) => dispatch(retrieveCurrentConditions(code, id, units)),
		retrieveHourlyConditions: (locationId, id, units) => dispatch(retrieveHourlyConditions(locationId, id, units)),
		retrieveWeeklyForecast: (locationId, id, units) => dispatch(retrieveWeeklyForecast(locationId, id, units)),
		setLocation: id => dispatch(setLocation(id))
	}
}

const mapStateToProps = state => {
	return {
		weatherSites: state.weatherReducer.sites,
		currentLocation: state.sessionReducer.currentLocation,
		locations: state.locationReducer.locations,
		units: state.sessionReducer.units
	}
}


export default connect(mapStateToProps, mapDispatchToProps)(LocationContainer)