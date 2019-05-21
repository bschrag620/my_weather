import React, { Component } from 'react'
import { Col } from 'react-bootstrap'
import Button from './button'

export default class LocationInputForm extends Component {

	state = {
		text: ''
	}

	handleSubmit = e => {
		e.preventDefault()
		if (this.state.text !== '') {
			this.props.retrieveLocation(this.state.text)
			this.setState({
				text: ''
			})
		}
	}

	handleChange = e => {
		this.setState({
			text: e.target.value
		})

	}

	render() {
		return (
			<Col className='centered'>
			<form
				onSubmit={ this.handleSubmit }
			>
				<input 
					type="text"
					value={this.state.text}
					className='tall-font find-weather rounded-corner centered'
					onChange={ this.handleChange }
					placeholder="city, st or zip code"/> <br/>
				<Button 
					onClick={this.handleSubmit}
					id='find-weather'
					text='Find myWeather!' 
					className='find-weather'
				>
					Find myWeather!
				</Button>
			</form>
			</Col>
		)
	}
}