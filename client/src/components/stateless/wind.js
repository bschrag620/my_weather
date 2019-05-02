import React from 'react'

const Wind = props => {
	return (
		<>
			Wind: {Math.round(props.wind.value)}{props.wind.units} {props.wind.direction}
		</>
	)
}

export default Wind