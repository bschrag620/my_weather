import React, { Component } from 'react'
import { CityState, LatLng, Temperature, Wind, Zip } from '../components/stateless/weatherIndex'
import RetrievingData from './stateless/retrievingData'

const card = props => {
	const properties = props.currentConditions.properties
	const meta = props.currentConditions.meta

	return (
		<div className={meta.code}>
			<h1>{props.currentLocation.city}, {props.currentLocation.state}</h1>
			<h2><Temperature temperature={properties.temperature} /></h2>
			<h3><Wind wind={properties.wind} /></h3>
			<div className='fine-print'>Sensor location: {meta.name}</div>
			<div className='fine-print'>Observation code: {meta.code}</div> 
			<div className='fine-print'><LatLng lat={props.currentLocation.lat} lng={props.currentLocation.lng} /></div>
		</div>
	)
}

export default class DetailCard extends Component {
	render() {

		return (this.props.currentConditions.loadingData) ? <RetrievingData message='daily detail' /> : card(this.props)

	}
}