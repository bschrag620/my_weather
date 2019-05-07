import React, { Component } from 'react'
import { connect } from 'react-redux'
import RetreivingData from '../components/stateless/retrievingData'
import DetailCard from '../components/detailCard'
import HourlyCard from '../components/hourlyCard'
import WeeklyCard from '../components/weeklyCard'
import { Container } from 'react-bootstrap'
import { withRouter } from 'react-router-dom'

import MyWeatherNavBar from '../components/stateless/myWeatherNavBar'


class DisplayContainer extends Component {

	handleRoute() {

		switch (this.props.match.params.displayType) {
			case 'detail':
				return <DetailCard currentLocation={this.props.currentLocation} currentConditions={this.props.allWeather.current} meta={this.props.allWeather.meta}/>

			case 'hourly':
				if (this.props.allWeather.hourly) {
					return <HourlyCard currentLocation={this.props.currentLocation} hourlyForecast={this.props.allWeather.hourly} meta={this.props.allWeather.meta}/>
				}	

			case 'weekly':
				return <WeeklyCard />

			default:
				return <div>Unrecognized type</div>
		}

	}

	render () {

		return (
			<Container style={{padding: 0}}className="display-container">
				<MyWeatherNavBar />
				{(this.props.allWeather) ? this.handleRoute() : ''}

			</Container>
		)
	}
}

const mapStateToProps = state => {
	const id = (state.sessionReducer.currentLocation) ? state.sessionReducer.currentLocation.id : null

	return (id) ? {allWeather: state.weatherReducer.sites[id]} : {allWeather: false}
}

export default withRouter(connect(mapStateToProps)(DisplayContainer))
