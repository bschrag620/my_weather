import React, { Component, Fragment } from 'react'
import CityState from './stateless/cityState'
import CompactCurrentConditionsContainer from '../containers/compactCurrentConditionsContainer'
import RetrievingData from './stateless/retrievingData'
import { withRouter } from 'react-router-dom'

class Location extends Component {

	componentDidMount() {

		if (this.props.weatherSite.current.loadingData) {
			const code = this.props.data.preferred_observation_code
			const locationId = this.props.data.locationId
			const id = this.props.data.id

			this.props.retrieveCurrentConditions(code, id, 'si')
			this.props.retrieveHourlyConditions(locationId, id, 'si')
		}
	}
	
	render() {

		return (
			<Fragment>
				<div><CityState city={this.props.data.city} state={this.props.data.state}/></div>
				{this.props.weatherSite.current.loadingData ? <RetrievingData message="current conditions" /> : <CompactCurrentConditionsContainer conditions={this.props.weatherSite.current}/>}
			</Fragment>
		)
	}
}

export default withRouter(Location)