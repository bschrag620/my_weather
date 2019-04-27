import React, { Component } from 'react'
import CityState from './stateless/cityState'
import Zip from './stateless/zip'
import LatLng from './stateless/latLng'
import { connect } from 'react-redux'
import CompactCurrentConditionsContainer from '../containers/compactCurrentConditionsContainer'
import retrieveCurrentConditions from '../actions/weather_actions'


class Location extends Component {
	constructor(props) {
		super(props)

		this.state = {
			loading: true
		}
	}

	componentDidMount() {
		this.props.retrieveCurrentConditions(this.props.location.preferred_observation_code, 'si')
			.then(resp => {
				this.setState({
					loading: false,
					currentConditions: this.props.sites[this.props.location.preferred_observation_code].properties
				})
			})
	}

	
	render() {
		return (
			<div className="location block" id={this.props.location.id}>
				<div><CityState city={this.props.location.city} state={this.props.location.state}/></div>
				{this.state.loading ? 'loading weather data' : <CompactCurrentConditionsContainer conditions={this.state.currentConditions}/>}
				<Zip zip={this.props.location.zip} /><br/>
				<LatLng lat={this.props.location.lat} lng={this.props.location.lng} />
			</div>
		)
	}
}

const mapDispatchToProps = dispatch => {
	return {
		retrieveCurrentConditions: 
		(code, units) => dispatch( retrieveCurrentConditions(code, units) )
	}
}

const mapStateToProps = state => {
	return {
		sites: state.weatherReducer.sites
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Location)