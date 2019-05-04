import React, { Component } from 'react'
import retrieveLocation from '../actions/location_actions'
import retrieveCurrentConditions from '../actions/weather_actions'
import { connect } from 'react-redux'
import RetreivingData from '../components/stateless/retrievingData'
import { Container } from 'react-bootstrap'
import { Route, Switch, BrowserRouter as Router } from 'react-router-dom'
import DetailCard from '../components/detailCard'


class DisplayContainer extends Component {
	constructor(props) {
		super(props);

		debugger;
	}

	render () {
		return (
			<Router>
				<Container className="display-container">
					Hey there from the displayContainer!!! <br/>
					<Switch>
						<Route path={this.props.match.url + '/detail'} component={DetailCard} />
					</Switch>
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
