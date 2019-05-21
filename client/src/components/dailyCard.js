import React, { Component } from 'react'
import { Col, Row } from 'react-bootstrap'
import { Temperature, Wind, Time } from '../components/stateless/weatherIndex'
import uuid from 'uuid'

class DailyCard extends Component {

	onCardClick(e) {
		const id = e.currentTarget.id
		const card = document.getElementById(id)
		const short = card.getElementsByClassName('short-description')
		const detailed = card.getElementsByClassName('detailed-description')
		
		short[0].hidden = !short[0].hidden
		detailed[0].hidden = !detailed[0].hidden
	}

	render() {
		const data = this.props.data
		return (
			<Col xs md lg='3' key={uuid()} id={data.sequenceN} onClick={ this.onCardClick.bind(this) }
				className='card daily-card display clickable'>
				<Row className='minititle'>
					{data.name}
				</Row>
				<Row className='time'><Time time={data.startTime} />-<Time time={data.endTime} /></Row>
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