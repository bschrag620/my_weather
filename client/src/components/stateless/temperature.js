import React from 'react'

const Temperature = props => {
	return (
		<>
			{Math.round(props.temperature.value)}&deg;{props.temperature.units}
		</>
	)
}

export default Temperature