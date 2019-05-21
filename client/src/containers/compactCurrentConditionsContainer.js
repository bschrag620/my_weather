import React, { Component } from 'react'
import Temperature from '../components/stateless/temperature'
import ShortDescription from '../components/stateless/shortDescription'

class CompactCurrentConditionsContainer extends Component {
	
	render() {
		
		return (
			<div className='current-conditions'>
				<div><Temperature temperature={this.props.conditions.temperature} /></div>
				<div><ShortDescription shortDescription={this.props.conditions.shortDescription} /></div>
			</div>
		)
	}
}

export default CompactCurrentConditionsContainer