import React, { Component } from 'react'

export default class CommentForm extends Component {

	state = {
			inputText: '',
	}

	handleSubmit = e => {
		e.preventDefault()
		this.props.onSubmit(this.state.inputText)
		this.setState({
			inputText: ''
		})
	}

	handleChange = e => {
		this.setState({
			inputText: e.currentTarget.value
		})
	}
	
	render() {
		return (
			<div className="comment-form">
				{this.state.comments}
				<form
					onSubmit={ e => this.handleSubmit(e)}>
					<input 
						type="text"
						value={this.state.inputText}
						onChange={ e => this.handleChange(e)}
						/>

					<input type="submit"
							onClick={ e => this.handleSubmit(e) }/>
				</form>
			</div>
		)
	}

}