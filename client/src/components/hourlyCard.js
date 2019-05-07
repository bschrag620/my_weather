import React, { Component, Fragment } from 'react'
import { CityState, LatLng, Temperature, Wind, Zip, Time } from '../components/stateless/weatherIndex'
import RetrievingData from './stateless/retrievingData'
import { Row, Col, Container } from 'react-bootstrap'
import uuid from 'uuid'

const generateHourlyCards = forecasts => {
	const dates = [...new Set(forecasts.map( f => f.date ))]
	
	//take this out!!!
	console.log(forecasts[0])
	return dates.map( date => {
		const hourlyForecasts = forecasts.filter( f => f.date === date )

		const hourlyCard = (props) => {
			return (
				<Col xs md lg='2' key={uuid()} style={{borderColor: '#333333', borderStyle: 'solid', borderWidth: '2px'}}>
					<h4><Time time={props.startTime} /></h4>
					<h2><Temperature temperature={props.temperature} /></h2>
					<div className="wind"><Wind wind={props.wind} /></div>
					<div className="shortDescription">{props.shortForecast}</div>
				</Col>
			)
		}

		return (
			<Container key={uuid()} style={{borderStyle: 'solid', borderWidth: '1px', borderColor: '#333333'}}>
				<Row style={{backgroundColor: '#333333', color: 'white', paddingLeft: '5px'}}><h1>{date}</h1></Row>
				<Row>
					{hourlyForecasts.map( (f, i) => hourlyCard(f, i))}
				</Row>
			</Container>
		)
	})
}

export default class HourlyCard extends Component {
	
	render() {
		return <Fragment> {this.props.hourlyForecast.loadingData ? <RetrievingData message="hourly data" /> : generateHourlyCards(this.props.hourlyForecast) } </Fragment>
	}
}