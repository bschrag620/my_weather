import React, { Component } from 'react'

export default class LocationInput extends Component {

	state = {
		text: ''
	}

	handleSubmit() {
	
	}

	handleChange(e) {
		this.setState({
			text: e.target.value
		})

	}

	render() {
		return (
			<form
				onSubmit={ this.handleSubmit }
			>
				<input 
					type="text"
					value={this.state.text}
					onChange={ e => this.handleChange(e) }
					placeholder="city, st or zip code"/>
				<button
					onClick={this.handleSubmit}
				>
				Find myWeather!	
				</button>
			</form>
		)
	}
}