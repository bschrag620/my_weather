import React, { Component } from 'react'
import retrieveLocation from '../actions/location_actions'
import retrieveCurrentConditions from '../actions/weather_actions'
//import { connect } from 'react-redux'
import RetreivingData from '../components/stateless/retrievingData'
import { Container } from 'react-bootstrap'
import { Route, Switch, BrowserRouter as Router } from 'react-router-dom'

import MyWeatherNavBar from '../components/stateless/myWeatherNavBar'


class DisplayContainer extends Component {

	render () {
		return (
			<Container className="display-container">
				<MyWeatherNavBar match={this.props.match}/>
				Display content for: {this.props.match.params.zip}, {this.props.match.params.displayType}
			</Container>
		)
	}
}

const mapStateToProps = state => {
	return {
		activeLocation: state.locationReducer.locations.find( loc => loc.id === state.sessionReducer.activeLocation)
	}
}

//export default connect(mapStateToProps)(DisplayContainer)

export default DisplayContainer
