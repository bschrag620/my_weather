import React, { Component, Fragment as Frag } from 'react'

const displayType = 24;

const adjustDisplay = time => {
	let hours, minutes, seconds;
	let amPM = '';

	[hours, minutes, seconds] = time.split(':')
	
	if (displayType === 12) {
		amPM = (hours > 12) ? 'pm' : 'am'
	} 

	hours = (displayType === 12 && hours > 12) ? hours - 12 : hours

	return `${hours}:${minutes}${amPM}`
}

class Time extends Component {


	render() {
		return (
			<Frag>
				{adjustDisplay(this.props.time)}
			</Frag>
		)
	}
}

export default Time