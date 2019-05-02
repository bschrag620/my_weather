import React, { Component } from 'react'
import { CityState, LatLng, Temperature, Wind, Zip } from '../components/stateless/weatherIndex'

export default class DetailCard extends Component {
	
	render() {
		const properties = this.props.details.properties
		const meta = this.props.details.meta
		return (
			<div className={meta.code}>
				<h1>{this.props.location.city}, {this.props.location.state}</h1>
				<h2><Temperature temperature={properties.temperature} /></h2>
				<h3><Wind wind={properties.wind} /></h3>
				<div className='fine-print'>Sensor location: {meta.name}</div>
				<div className='fine-print'>Observation code: {meta.code}</div> 
				<div className='fine-print'><LatLng lat={this.props.location.lat} lng={this.props.location.lng} /></div>
			</div>
		)
	}
}