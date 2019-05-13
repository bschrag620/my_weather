import React from 'react'

const Button = props => (
	<button 
		onClick={props.onClick}
		className='rounded-corner tall-font centered'
	>
	{props.text}
	</button>
		)

export default Button