import React, { Component } from 'react'
import { CityState, LatLng, Temperature, Wind, Zip } from '../components/stateless/weatherIndex'

export default class DetailCard extends Component {
	
	render() {
		const properties = this.props.details.properties
		const meta = this.props.details.meta

		return (
			<div className={meta.code}>
				<h1>{this.props.city}, {this.props.state}</h1>
				<h2>{meta.name} - {meta.code}</h2>
				<h2><Temperature temperature={properties.temperature} /></h2>
				<h3><Wind wind={properties.wind} /></h3>
			</div>
		)
	}
}