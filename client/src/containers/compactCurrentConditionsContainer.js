import React, { Component } from 'react'
import Temperature from '../components/stateless/temperature'
import Wind from '../components/stateless/wind'

class CompactCurrentConditionsContainer extends Component {

	render() {
		return (
			<div className='current-conditions'>
				<div className='tall-font'><Temperature temperature={this.props.conditions.temperature} /></div>
			</div>
		)
	}
}

export default CompactCurrentConditionsContainer