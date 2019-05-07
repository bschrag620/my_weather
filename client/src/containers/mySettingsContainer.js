import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Container } from 'react-bootstrap'
import Button from '../components/button'

class MySettingsContainer extends Component {

	handleToggleUnits() {
		this.props.toggleUnits()
	}

	render() {
		return (
			<Container>This is the settings component
				<Button text='toggle units' onClick={this.handleToggleUnits.bind(this)} />
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

export default connect(null, mapDispatchToProps)(MySettingsContainer)