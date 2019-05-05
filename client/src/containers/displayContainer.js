import React, { Component } from 'react'
import retrieveLocation from '../actions/location_actions'
import retrieveCurrentConditions from '../actions/weather_actions'
import { connect } from 'react-redux'
import RetreivingData from '../components/stateless/retrievingData'
import { Container } from 'react-bootstrap'
import { Route, Switch, BrowserRouter as Router } from 'react-router-dom'

import MyWeatherNavBar from '../components/stateless/myWeatherNavBar'


class DisplayContainer extends Component {
	componentWillMount() {
		if (this.props.match.isExact) {
		    this.props.history.push(`${this.props.match.url}/detail`)
		}
	}

	render () {
		return (
			<Router>
				<Container className="display-container">
					<MyWeatherNavBar match={this.props.match}/>
					<Route path={this.props.match.url + '/detail'} component={ () => <div>Details!!!</div>} />
					<Route path={this.props.match.url + '/hourly'} component={ () => <div>Hourly thingies</div>} />
					<Route path={this.props.match.url + '/weekly'} component={ () => <div>OMG Weekly</div>} />
				</Container>
			</Router>
		)
	}
}

const mapStateToProps = state => {
	return {
		activeLocation: state.sessionReducer.activeLocation,
		activeWeatherStationCode: state.sessionReducer.activeWeatherStationCode
	}
}

export default connect(mapStateToProps)(DisplayContainer)
