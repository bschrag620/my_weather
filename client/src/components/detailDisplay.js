import React, { Component } from 'react'
import { CityState, LatLng, Temperature, Wind, Zip, Detailed } from '../components/stateless/weatherIndex'
import RetrievingData from './stateless/retrievingData'
import { Container } from 'react-bootstrap'

const card = props => {
	const properties = props.currentConditions
	const meta = props.meta
	return (
		<Container className={meta.code} style={{padding: '10px'}}>
			<h1>{props.currentLocation.city}, {props.currentLocation.state}</h1>
			<h2><Temperature temperature={properties.temperature} /></h2>
			<h3><Wind wind={properties.wind} /></h3>
			<h3><Detailed detailed={properties.detailedForecast} /></h3>
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