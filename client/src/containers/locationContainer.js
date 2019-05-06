import React, { Component } from 'react'
import { Col } from 'react-bootstrap'
import { connect } from 'react-redux'
import RetrievingData from '../components/stateless/retrievingData'
import Location from '../components/location'
import retrieveCurrentConditions from '../actions/weather_actions'
import { setLocation } from '../actions/location_actions'

class LocationContainer extends Component {

	handleClick(){
		const loc = this.props.locations.find( loc => loc.id === this.props.data.id)
		this.props.setLocation(loc)
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
				{this.props.data.loadingData ? <RetrievingData message={this.props.data.text} /> : <Location data={this.props.data} retrieveCurrentConditions={this.props.retrieveCurrentConditions} weatherSite={this.props.weatherSites[this.props.data.id]} />}
			</Col>
		)
	}
}

const mapDispatchToProps = dispatch => {
	return {
		retrieveCurrentConditions: (code, id, units) => dispatch(retrieveCurrentConditions(code, id, units)),
		setLocation: id => dispatch(setLocation(id))
	}
}

const mapStateToProps = state => {
	return {
		weatherSites: state.weatherReducer.sites,
		currentLocation: state.sessionReducer.currentLocation,
		locations: state.locationReducer.locations
	}
}


export default connect(mapStateToProps, mapDispatchToProps)(LocationContainer)