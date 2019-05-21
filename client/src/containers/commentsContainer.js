import React, { Component } from 'react'

export default class CommentsContainer extends Component {
	
	renderComments = comments => {
		return comments.map( (comment, i) => <div key={i} >{comment}</div>)	
	}

	render() {
		return (
			<div className="comments-container">
				{this.renderComments(this.props.comments)}
			</div>
		)
	}

}