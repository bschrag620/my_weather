import React, { Component } from 'react'
import { LatLng, Temperature, Wind, Detailed } from '../components/stateless/weatherIndex'
import RetrievingData from './stateless/retrievingData'
import { Container, Row } from 'react-bootstrap'

export default class DetailDisplay extends Component {

	displayCard() {
		const properties = this.props.currentConditions
		const meta = this.props.meta

		return (
			<Container className={meta.code + ' display'} >
				<Row className='subtitle'>{this.props.currentLocation.city}, {this.props.currentLocation.state}</Row>
				<Temperature temperature={properties.temperature} />
				<div><Wind wind={properties.wind} /></div>
				<Detailed detailed={properties.detailedForecast} />
				<div className='fine-print'>Sensor location: {meta.name}</div>
				<div className='fine-print'>Observation code: {meta.code}</div> 
				<div className='fine-print'><LatLng lat={this.props.currentLocation.lat} lng={this.props.currentLocation.lng} /></div>
			</Container>
		)
	}

	render() {
		return (this.props.currentConditions.loadingData) ? <RetrievingData message='daily detail' /> : this.displayCard()
	}
}