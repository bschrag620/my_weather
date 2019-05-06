import React, { Component } from 'react'
import { Col } from 'react-bootstrap'
import { connect } from 'react-redux'
import RetrievingData from '../components/stateless/retrievingData'
import Location from '../components/location'
import retrieveCurrentConditions from '../actions/weather_actions'

class LocationContainer extends Component {
	
	render() {
		
		const setStyling = () => (this.props.currentLocation && (this.props.currentLocation.id === this.props.data.id)) ? {backgroundColor: 'white', color: 'black'} : {backgroundColor: '#333333', color: 'white'}
		
		return (
			<Col xs md='auto' className="location" id={this.props.data.id} style={setStyling()}>
				{this.props.data.loadingData ? <RetrievingData message={this.props.data.text} /> : <Location data={this.props.data} retrieveCurrentConditions={this.props.retrieveCurrentConditions} weatherSite={this.props.weatherSites[this.props.data.id]} />}
			</Col>
		)
	}
}

const mapDispatchToProps = dispatch => {
	return {
		retrieveCurrentConditions: (code, id, units) => dispatch(retrieveCurrentConditions(code, id, units))
	}
}

const mapStateToProps = state => {
	return {
		weatherSites: state.weatherReducer.sites,
		currentLocation: state.sessionReducer.currentLocation
	}
}


export default connect(mapStateToProps, mapDispatchToProps)(LocationContainer)