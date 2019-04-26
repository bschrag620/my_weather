import React from 'react'
import CityState from './stateless/cityState'
import Zip from './stateless/zip'
import LatLng from './stateless/latLng'

const Location = props => {
	return (
	<div className="location block" id={props.location.id}>
	<h4><CityState city={props.location.city} state={props.location.state}/></h4>
	<Zip zip={props.location.zip} /><br/>
	<LatLng lat={props.location.lat} lng={props.location.lng} />
	</div>)
}

export default Location