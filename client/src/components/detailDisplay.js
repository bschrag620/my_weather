import React, { Component } from 'react'
import { LatLng, Temperature, Wind, Detailed } from '../components/stateless/weatherIndex'
import RetrievingData from './stateless/retrievingData'
import { Container, Row } from 'react-bootstrap'

const card = props => {
	const properties = props.currentConditions
	const meta = props.meta

	return (
		<Container className={meta.code + ' display'} >
			<Row className='subtitle'>{props.currentLocation.city}, {props.currentLocation.state}</Row>
			<Temperature temperature={properties.temperature} />
			<div><Wind wind={properties.wind} /></div>
			<Detailed detailed={properties.detailedForecast} />
			<div className='fine-print'>Sensor location: {meta.name}</div>
			<div className='fine-print'>Observation code: {meta.code}</div> 
			<div className='fine-print'><LatLng lat={props.currentLocation.lat} lng={props.currentLocation.lng} /></div>
		</Container>
	)
}

export default class DetailDisplay extends Component {
	render() {

		return (this.props.currentConditions.loadingData) ? <RetrievingData message='daily detail' /> : card(this.props)

	}
}