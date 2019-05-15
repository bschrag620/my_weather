import React, { Component } from 'react'
import { connect } from 'react-redux'
import DetailDisplay from '../components/detailDisplay'
import HourlyDisplay from '../components/hourlyDisplay'
import WeeklyDisplay from '../components/weeklyDisplay'
import { Container } from 'react-bootstrap'
import { BrowserRouter as Router, Route, withRouter } from 'react-router-dom'

import MyWeatherNavBar from '../components/stateless/myWeatherNavBar'


class DisplayContainer extends Component {

	render () {
		return (
				<Container className='panel' id='display-container'>
					{!this.props.allWeather ? <div className="centered tall-font">Enter a location to get started.</div> :
						<Router>		
								<Route path='/:zip/:displayType(detail|hourly|weekly)?' component={MyWeatherNavBar} />
								<Route 
									exact path='/:zip/(detail)?' 
									render={ () => 
										<DetailDisplay 
											currentLocation={this.props.currentLocation} 
											currentConditions={this.props.allWeather.current} 
											meta={this.props.allWeather.meta} />
										}
										/>
								<Route exact path='/:zip/hourly' render={ () => 
									<HourlyDisplay
										currentLocation={this.props.currentLocation}
										hourlyForecast={this.props.allWeather.hourly}
										meta={this.props.allWeather.meta}
									/>
								}/>
								<Route exact path='/:zip/weekly' render={ () => 
									<WeeklyDisplay 
										currentLocation={this.props.currentLocation}
										weeklyForecast={this.props.allWeather.weekly}
										meta={this.props.allWeather.meta}
									/>
								}/>
						</Router>
					}
				</Container>
		)
	}
}

const mapStateToProps = state => {
	const id = (state.sessionReducer.currentLocation) ? state.sessionReducer.currentLocation.id : null

	return (id) ? {allWeather: state.weatherReducer.sites[id]} : {allWeather: false}
}

export default withRouter(connect(mapStateToProps)(DisplayContainer))
