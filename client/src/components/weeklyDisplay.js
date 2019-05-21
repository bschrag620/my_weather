import React, { Component } from 'react'
import DailyCard from './dailyCard'
import { Container } from 'react-bootstrap'
import RetrievingData from './stateless/retrievingData'

export default class WeeklyDisplay extends Component {
	
	render() {
		
		return (this.props.weeklyForecast.loadingData) ?
			<RetrievingData message='weekly forecast...' /> : 
			<Container className='panel light'>
				<div className="fluid-row">
					{this.props.weeklyForecast.map( (card, i) => <DailyCard key={i} data={card} />)}
				</div>
				<div className='fine-print'>*click for expanded details</div>

			</Container>
	}
}