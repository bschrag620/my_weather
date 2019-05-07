import React, { Component } from 'react'
import { connect } from 'react-redux'
import RetreivingData from '../components/stateless/retrievingData'
import DetailDisplay from '../components/detailDisplay'
import HourlyDisplay from '../components/hourlyDisplay'
import WeeklyDisplay from '../components/weeklyDisplay'
import { Container } from 'react-bootstrap'
import { withRouter } from 'react-router-dom'

import MyWeatherNavBar from '../components/stateless/myWeatherNavBar'


class DisplayContainer extends Component {

	handleRoute() {

		switch (this.props.match.params.displayType) {
			case 'detail':
				return <DetailDisplay currentLocation={this.props.currentLocation} currentConditions={this.props.allWeather.current} meta={this.props.allWeather.meta}/>

			case 'hourly':
				if (this.props.allWeather.hourly) {
					return <HourlyDisplay currentLocation={this.props.currentLocation} hourlyForecast={this.props.allWeather.hourly} meta={this.props.allWeather.meta}/>
				}	

			case 'weekly':
				if (this.props.allWeather.weekly) {
					return <WeeklyDisplay currentLocation={this.props.currentLocation} weeklyForecast={this.props.allWeather.weekly} meta={this.props.allWeather.meta}/>	
				}
				

			default:
				return <div>Unrecognized type</div>
		}

	}

	render () {

		return (
			<Container style={{padding: '0', margin: '25px 0px'}} className="display-container">
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
