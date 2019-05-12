import React, { Component } from 'react'
import Button from './button'
import { Col, Row } from 'react-bootstrap'

export default class LocationInputForm extends Component {

	state = {
		text: ''
	}

	handleSubmit(e) {
		e.preventDefault()
		this.props.retrieveLocation(this.state.text)
		this.setState({
			text: ''
		})
	}

	handleChange(e) {
		this.setState({
			text: e.target.value
		})

	}

	render() {
		return (
			<Col className='centered'>
			<form
				onSubmit={ e => this.handleSubmit(e) }
			>
				<input 
					type="text"
					value={this.state.text}
					className='tall-font rounded-corner centered'
					onChange={ e => this.handleChange(e) }
					placeholder="city, st or zip code"/> <br/>
				<div 
					onClick={ (e) => this.handleSubmit(e)}
					id='find-weather'
					className='rounded-corner tall-font' 
				>
					Find myWeather!
				</div>
			</form>
			</Col>
		)
	}
}