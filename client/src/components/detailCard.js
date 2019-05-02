import React, { Component } from 'react'
import { CityState, LatLng, Temperature, Wind, Zip } from '../components/stateless/weatherIndex'

export default class DetailCard extends Component {
	
	render() {
		const properties = this.props.details.properties
		const meta = this.props.details.meta

		return (
			<div className={meta.code}>
				<h1>{meta.name} - {meta.code}</h1>
				<h1><Temperature temperature={properties.temperature} /></h1>
				<h3><Wind wind={properties.wind} /></h3>

			</div>
		)
	}
}