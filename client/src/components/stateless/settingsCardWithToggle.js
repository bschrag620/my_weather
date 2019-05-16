import React, { Component } from 'react'
import { Col, Row, Container } from 'react-bootstrap'
import ToggleSwitch from '../toggleSwitch'

class SettingsCardWithToggle extends Component {

	render() {
		return (
			<Container className='settings-card card panel'>
				<Col className='text-center'>{this.props.title}</Col>
				<Row>
					<Col className='text-center' size='auto'>
						{this.props.leftLabel}
					</Col>
					<ToggleSwitch handleChange={this.props.handleChange} bool={this.props.bool} />
					<Col className='text-center' size='auto'>
						{this.props.rightLabel}
					</Col>
				</Row>
			</Container>
		)
	}
}

export default SettingsCardWithToggle