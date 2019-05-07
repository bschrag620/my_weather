import React, { Component } from 'react'
import Temperature from '../components/stateless/temperature'
import ShortDescription from '../components/stateless/shortDescription'

class CompactCurrentConditionsContainer extends Component {

	render() {
		const properties = this.props.conditions
		
		return (
			<div className='current-conditions'>
				<div><Temperature temperature={properties.temperature} /></div>
				<div><ShortDescription shortDescription={properties.shortDescription} /></div>
			</div>
		)
	}
}

export default CompactCurrentConditionsContainer