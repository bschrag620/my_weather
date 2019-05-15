import React, { Component } from 'react'
import DailyCard from './dailyCard'
import { Container } from 'react-bootstrap'
import RetrievingData from './stateless/retrievingData'

export default class WeeklyDisplay extends Component {
	
	render() {

		const onCardClick = e => {
			const id = e.currentTarget.id
			const card = document.getElementById(id)
			const short = card.getElementsByClassName('short-description')
			const detailed = card.getElementsByClassName('detailed-description')
			
			short[0].hidden = !short[0].hidden
			detailed[0].hidden = !detailed[0].hidden
		}
		
		return (this.props.weeklyForecast.loadingData) ?
			<RetrievingData message='weekly forecast...' /> : 
			<Container className='panel light'>
				<div className="fluid-row">
					{this.props.weeklyForecast.map( (card, i) => <DailyCard key={i} data={card} onClick={onCardClick} />)}
				</div>
				<div className='fine-print'>*click for expanded details</div>

			</Container>
	}
}