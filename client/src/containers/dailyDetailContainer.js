import React, { Component } from 'react'
import { connect } from 'react-redux'
import retrieveLocation from '../actions/location_actions'
import retrieveCurrentConditions from '../actions/weather_actions'
import RetreivingData from '../components/stateless/retrievingData'
import DetailCard from '../components/detailCard'


class DailyDetailContainer extends Component {
	constructor(props) {
		super(props)

		this.state = {
			loading: true,
			zip: this.props.match.params.zip
		}
	}

	updateData() {
		if (!this.props.dailyDetail) {
 			   console.log('no weather data')
 			   this.props.retrieveCurrentConditions(this.props.code)
 			   	.then(
 			   		this.setState({
 			   			loading: false
 			   		})
 			   	)
		} else {
			this.setState({
				loading: false
			})
		}
	}

	componentDidMount() {
		this.props.retrieveLocation(this.state.zip)
			.then( () => this.updateData() )
	}

	render () {
		return (
			<div className="daily-detail">
				{!this.props.dailyDetail ? <RetreivingData message="daily details" /> : <DetailCard details={this.props.dailyDetail} location={this.props.location}/>}
			</div>

		)
	}
}

const mapStateToProps = state => {
	const code = state.sessionReducer.activeWeatherStationCode
	const activeLocation = state.sessionReducer.activeLocation
	return {
		location: state.locationReducer.locations.find( loc => loc.id === activeLocation ),
		code: code,
		dailyDetail: state.weatherReducer.sites[code]
	}
}

const mapDispatchToProps = dispatch => {
	return {
		retrieveLocation: zip => dispatch(retrieveLocation(zip)),
		retrieveCurrentConditions: (code, units) => dispatch( retrieveCurrentConditions(code, units) )
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(DailyDetailContainer)
