import React, { Fragment as Frag } from 'react'

const Temperature = props => {
	return (
		<Frag>
			{Math.round(props.temperature.value)}&deg;{props.temperature.units}
		</Frag>
	)
}

export default Temperature