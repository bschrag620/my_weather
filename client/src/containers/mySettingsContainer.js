import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Container, Row, Col } from 'react-bootstrap';
import SettingsCardWithToggle from '../components/stateless/settingsCardWithToggle';

class MySettingsContainer extends Component {

	handleToggleUnits() {
		this.props.toggleUnits()
	}

	render() {
		return (
			<Container>This is the settings component
				<Row>
					<Col xs md lg='3'>
						<SettingsCardWithToggle 
							handleChange={this.props.toggleUnits} 
							bool={this.props.units === 'si'}
							leftLabel='US'
							rightLabel='Metric'
							title='Units'/>
					</Col>
				</Row>
			</Container>
		)

	}
}

const mapDispatchToProps = dispatch => {
	return {
		toggleUnits: () => dispatch({
			type: 'TOGGLE_UNITS'
		})
	}
}

const mapStateToProps = state => {
	return {
		units: state.sessionReducer.units
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(MySettingsContainer)