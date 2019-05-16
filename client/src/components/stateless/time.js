import React, { Component, Fragment as Frag } from 'react'

const days = {
	0: 'Sunday',
	1: 'Monday',
	2: 'Tuesday',
	3: 'Wednesday',
	4: 'Thursday',
	5: 'Friday',
	6: 'Saturday'
}

export const Day = props => {
	const d = new Date(props.time)
	
	return (
		<Frag>
			{days[d.getDay()]}
		</Frag>
	)
}

export const TwentyFourHours = props => {
	const d = new Date(props.time)

	return (
		<Frag>
			{d.getHours()}:00
		</Frag>
	)
}

export default class Time extends Component {


	render() {
		const d = new Date(this.props.time)
		return (
			<Frag>
				{days[d.getDay()]}
			</Frag>
		)
	}
}