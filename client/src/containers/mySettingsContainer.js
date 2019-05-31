import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Container, Row, Col } from 'react-bootstrap';
import SettingsCardWithToggle from '../components/stateless/settingsCardWithToggle';
import Button from '../components/button'
import { withRouter } from 'react-router-dom'

class MySettingsContainer extends Component {
	constructor(props) {
		super(props);

		this.state = {
			units: this.props.cookies.cookies.myWeatherUnits
		}
	}
	
	toggleUnits() {
		this.setState({
			units: (this.state.units === 'si') ? 'us' : 'si'
		})
	}

	handleClick() {
		this.props.delayedUpdate(this.state)
		this.props.history.goBack()
	}

	render() {
		return (
			<Container>
				<Row>
					<Col xs md lg='3'>
						<SettingsCardWithToggle 
							handleChange={this.toggleUnits.bind(this)} 
							bool={this.state.units === 'si'}
							leftLabel='US'
							rightLabel='Metric'
							title='Units'/>
					</Col>
				</Row>
				<Container className='centered'>
				<Button onClick={this.handleClick.bind(this)} text='Update Settings' />
				</Container>
			</Container>
		)

	}
}

const mapDispatchToProps = dispatch => {
	return {
		delayedUpdate: (payload) => dispatch({
			type: 'DELAYED_UPDATE',
			payload: payload
		})
	}
}

const mapStateToProps = state => {
	return {
		units: state.sessionReducer.units
	}
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MySettingsContainer))