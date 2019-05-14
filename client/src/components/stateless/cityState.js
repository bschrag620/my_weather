import React, { Fragment as Frag } from 'react'

const CityState = props => (
	<Frag>
		{props.city},{props.state}
	</Frag>
)

export default CityState