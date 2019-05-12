import React, { Component } from 'react'
import { Col, Row } from 'react-bootstrap'
import { CityState, LatLng, Temperature, Wind, Zip, Detailed, Time } from '../components/stateless/weatherIndex'
import uuid from 'uuid'

class DailyCard extends Component {

	render() {
		const data = this.props.data
		return (
			<Col xs md lg='3' key={uuid()} id={data.sequenceN} onClick={ e => this.props.onClick(e)}
				className='card daily-card display'>
				<Row className='minititle'>
					{data.name}
				</Row>
				<Row className='time'>Start: <Time time={data.startTime} /> End: <Time time={data.endTime} /></Row>
				<Row className='tall-font'><Temperature temperature={data.temperature} /></Row>
				<Row><Wind wind={data.wind} /></Row>
				<Row>
					<p className="short-description">
						{data.shortForecast}
					</p>
					<p className='detailed-description' hidden>
						{data.detailedForecast}
					</p>
				</Row>
			</Col>
		)
	}
}

export default DailyCard