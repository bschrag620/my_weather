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
				onClick={ e => this.props.onClick(e)}>
				<Row className='card-header' style={{backgroundColor: '#333333', color: 'white'}}>
					<h3>{data.name}</h3>	
				</Row>
				<Row className='time'>Start: <Time time={data.startTime} /> End: <Time time={data.endTime} /></Row>
				<h2><Temperature temperature={data.temperature} /></h2>
				<p>Wind: <Wind wind={data.wind} /></p>
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