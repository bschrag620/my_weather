import React from 'react'

const Location = props => {
	return (
	<div className="location block" id={props.location.id}>
	<h4>{props.location.city}, {props.location.state}</h4>
	Zip: {props.location.zip} <br/>
	<i>lat: {props.location.lat} long: {props.location.lng}</i>
	</div>)
}



export default Location