import React, { Component } from 'react'
import DailyCard from './dailyCard'
import { Row, Container } from 'react-bootstrap'
import RetrievingData from './stateless/retrievingData'
import { CityState, LatLng, Temperature, Wind, Zip } from '../components/stateless/weatherIndex'
import uuid from 'uuid'

export default class WeeklyDisplay extends Component {
	
	render() {

		const onCardClick = e => {
			const id = e.target.parentElement.id
			const card = document.getElementById(id)
			const short = card.getElementsByClassName('short-description')
			const detailed = card.getElementsByClassName('detailed-description')

			short[0].hidden = !short[0].hidden
			detailed[0].hidden = !detailed[0].hidden
		}
		
		return (this.props.weeklyForecast.loadingData) ?
			<RetrievingData message='weekly forecast...' /> : 
			<Container style={{margin: '25px 0px'}}>
				<Row>{this.props.weeklyForecast.map( card => <DailyCard key={uuid()} data={card} onClick={onCardClick} />)}</Row>
			</Container>
	}
}