import React, { Component } from 'react'
import Button from './button'

export default class LocationInput extends Component {

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
			<form
				onSubmit={ e => this.handleSubmit(e) }
			>
				<input 
					type="text"
					value={this.state.text}
					onChange={ e => this.handleChange(e) }
					placeholder="city, st or zip code"/>
				<Button text='Find myWeather!' onClick={ (e) => this.handleSubmit(e)} />
			</form>
		)
	}
}