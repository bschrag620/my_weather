import React, { Component, Fragment } from 'react'
import { Temperature, Wind } from '../components/stateless/weatherIndex'
import { TwentyFourHours as Time } from '../components/stateless/time'
import RetrievingData from './stateless/retrievingData'
import { Row, Col, Container } from 'react-bootstrap'
import uuid from 'uuid'


export default class HourlyDisplay extends Component {

	generateHourlyCards() {
		const dates = [...new Set(this.props.hourlyForecast.map( f => f.date ))]
		
		return dates.map( date => {
			const hourlyForecasts = this.props.hourlyForecast.filter( f => f.date === date )

			const hourlyCard = (props) => {
				return (
					<Col xs md lg='2' key={uuid()} className='hourly card display'>
						<Row className='subtitle'><Time time={props.startTime} /></Row>
						<Row className='tall-font'><Temperature temperature={props.temperature} /></Row>
						<Row className="wind"><Wind wind={props.wind} /></Row>
						<Row className="shortDescription wrap-text">{props.shortForecast}</Row>
					</Col>
				)
			}

			return (
				<Container key={uuid()} className='panel light'>
					<Row className='subtitle'>{date}</Row>
					<div className='fluid-row'>
						{hourlyForecasts.map( (f, i) => hourlyCard(f, i))}
					</div>
				</Container>
			)
		})
	}

	
	render() {
		return <Fragment> {this.props.hourlyForecast.loadingData ? <RetrievingData message="hourly data" /> : this.generateHourlyCards() } </Fragment>
	}
}