import React, { Component } from 'react'
import CityState from './stateless/cityState'
import Zip from './stateless/zip'
import { Col } from 'react-bootstrap'
import CompactCurrentConditionsContainer from '../containers/compactCurrentConditionsContainer'
import RetrievingData from './stateless/retrievingData'
//import { connect } from 'react-redux'


class Location extends Component {


	componentDidMount() {
		if (this.props.weatherSite.current.loadingData) {
			const code = this.props.data.preferred_observation_code
			const id = this.props.data.id
			this.props.retrieveCurrentConditions(code, id, 'si')
		}
	}
	
	render() {

		return (
			<Col xs md='auto' className="location block" id={this.props.data.id}>
				<div><CityState city={this.props.data.city} state={this.props.data.state}/></div>
				{this.props.weatherSite.current.loadingData ? <RetrievingData message="current conditions" /> : <CompactCurrentConditionsContainer conditions={this.props.weatherSite.current}/>}
				<Zip zip={this.props.data.zip} /><br/>
			</Col>
		)
	}
}

export default Location