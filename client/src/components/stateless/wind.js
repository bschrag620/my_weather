import React from 'react'

const Wind = props => {
	return (
		<>
			Wind: {props.wind.value}{props.wind.units} {props.wind.direction}
		</>
	)
}

export default Wind