import React from 'react'

const Temperature = props => {
	return (
		<>
			{props.temperature.value}&deg;{props.temperature.units}
		</>
	)
}

export default Temperature