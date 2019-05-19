import React, { Component } from 'react'

export default class CommentsContainer extends Component {
	
	renderComments = comments => {
		return comments.map( comment => <div>{comment}</div>)	
	}

	render() {
		return (
			<div className="comments-container">
				{this.renderComments(this.props.comments)}
			</div>
		)
	}

}