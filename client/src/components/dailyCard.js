import React, { Component } from 'react'
import { Col, Row } from 'react-bootstrap'
import { CityState, LatLng, Temperature, Wind, Zip, Detailed, Time } from '../components/stateless/weatherIndex'

class DailyCard extends Component {

	render() {
		const data = this.props.data
		return (
			<Col 
				sm md lg='3' 
				id={data.sequenceN}
				onClick={ e => this.props.onClick(e)}
				className='clickable card daily-card'>
				<Row className='minititle'>
					{data.name}
				</Row>
				<Row className='time'>Start: <Time time={data.startTime} /> End: <Time time={data.endTime} /></Row>
				<Row className='tall-font'><Temperature temperature={data.temperature} /></Row>
				<Row><Wind wind={data.wind} /></Row>
				<Row className="short-description">
					{data.shortForecast}
				</Row>
				<Row className='detailed-description' hidden>
					{data.detailedForecast}
				</Row>
			</Col>
		)
	}
}

export default DailyCard