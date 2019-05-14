import React, { Component } from 'react'
import { Col, Row, Container } from 'react-bootstrap'
import ToggleSwitch from '../toggleSwitch'

class SettingsCardWithToggle extends Component {

	render() {
		return (
			<Container className='card panel'>
				<Col className='text-center'><h2>{this.props.title}</h2></Col>
				<Row>
					<Col className='text-center' size='auto'>
						<h3>{this.props.leftLabel}</h3>
					</Col>
					<ToggleSwitch handleChange={this.props.handleChange} bool={this.props.bool} />
					<Col className='text-center' size='auto'>
						<h3>{this.props.rightLabel}</h3>
					</Col>
				</Row>
			</Container>
		)
	}
}

export default SettingsCardWithToggle