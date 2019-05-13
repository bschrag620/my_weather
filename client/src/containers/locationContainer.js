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
		
		// don't try to load the location if it is still gathering data
		if (!loc.loadingData) {
			this.props.setLocation(loc)
		}
	}

	componentDidMount() {
		if (this.props.handleSettingsChange()) {
			// landing here means there was a change to the settings
			// now to invalidate the weather data
			this.props.locations.forEach((loc) => {
			  this.props.invalidateWeatherData(loc.id)
			})
		}
	}

	retrieveAll() {		
		const units = this.props.units
		const code = this.props.currentLocation.preferred_observation_code
		const locationId = this.props.currentLocation.locationId
		const id = this.props.currentLocation.id

		this.props.retrieveCurrentConditions(code, id, units)
		this.props.retrieveHourlyConditions(locationId, id, units)
		this.props.retrieveWeeklyForecast(locationId, id, units)
	}

	setClassName() {
		return (this.props.currentLocation && (this.props.currentLocation.id === this.props.data.id)) ? `tab clickable ${this.props.units} selected` : `tab ${this.props.units} clickable`
	}
	
	render() {		
		
		return (
			<Col 
				xs md='auto' 
				className={this.setClassName()}
				id='location'
				data-type={this.props.units}
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
		setLocation: id => dispatch(setLocation(id)),
		invalidateWeatherData: id => dispatch({
					type: 'INITIALIZE_WEATHER_ID',
					payload: {
						id: id,
						loadingData: true
					}
				})
	}
}

const mapStateToProps = state => {
	return {
		weatherSites: state.weatherReducer.sites,
		currentLocation: state.sessionReducer.currentLocation,
		locations: state.locationReducer.locations,
	}
}


export default connect(mapStateToProps, mapDispatchToProps)(LocationContainer)