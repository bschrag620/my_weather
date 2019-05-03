import React, { Component } from 'react'
import CityState from './stateless/cityState'
import Zip from './stateless/zip'
import LatLng from './stateless/latLng'
import { connect } from 'react-redux'
import { Col } from 'react-bootstrap'
import CompactCurrentConditionsContainer from '../containers/compactCurrentConditionsContainer'
import retrieveCurrentConditions from '../actions/weather_actions'
import RetrievingData from './stateless/retrievingData'


class Location extends Component {
	constructor(props) {
		super(props)

		this.state = {
			loading: true
		}
	}

	componentWillMount() {
		if (this.props.sites[this.props.location.preferred_observation_code]) {
			this.setState({
					loading: false,
					currentConditions: this.props.sites[this.props.location.preferred_observation_code].properties
			})
		}
	}

	componentDidMount() {
		if (this.state.loading) {
			const code = this.props.location.preferred_observation_code
			this.props.retrieveCurrentConditions(code, 'si').then( () => {
					this.setState({
						loading: false,
						currentConditions: this.props.sites[this.props.location.preferred_observation_code].properties
				})
			})
		}
	}

	
	render() {
		return (
			<Col className="location block" id={this.props.location.id}>
				<div><CityState city={this.props.location.city} state={this.props.location.state}/></div>
				{this.state.loading ? <RetrievingData message="location"/> : <CompactCurrentConditionsContainer conditions={this.state.currentConditions}/>}
				<Zip zip={this.props.location.zip} /><br/>
			</Col>
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