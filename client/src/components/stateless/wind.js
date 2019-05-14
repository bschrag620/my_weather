import React, { Fragment as Frag} from 'react'

const Wind = props => {
	return (
		<Frag>
			Wind: {Math.round(props.wind.value)}{props.wind.units} {props.wind.direction}
		</Frag>
	)
}

export default Wind