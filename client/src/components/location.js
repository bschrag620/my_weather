import React, { Component } from 'react'
import CityState from './stateless/cityState'
import Zip from './stateless/zip'
import LatLng from './stateless/latLng'

class Location extends Component {
	
	render() {
		return (
			<div className="location block" id={this.props.location.id}>
				<h4><CityState city={this.props.location.city} state={this.props.location.state}/></h4>
				<Zip zip={this.props.location.zip} /><br/>
				<LatLng lat={this.props.location.lat} lng={this.props.location.lng} />
			</div>
		)
	}
}

export default Location