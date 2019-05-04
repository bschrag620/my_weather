import React, { Component } from 'react'
import Temperature from '../components/stateless/temperature'
import Wind from '../components/stateless/wind'

class CompactCurrentConditionsContainer extends Component {

	render() {
		const properties = this.props.conditions.properties
		return (
			<div className='current-conditions'>
				<div className='tall-font'><Temperature temperature={properties.temperature} /></div>
			</div>
		)
	}
}

export default CompactCurrentConditionsContainer