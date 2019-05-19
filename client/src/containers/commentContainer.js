import React, { Component } from 'react'
import CommentForm from './commentForm'
import CommentsContainer from './commentsContainer'

export default class CommentContainer extends Component {
	constructor(props) {
		super(props)

		this.state = {
			comments: []
		}
	}

	addComment = function(text) {
		console.log(this)
		this.setState({
			comments: this.state.comments.concat(text)
		})
	}
		
	render() {
		return (
			<div className="comment-container">
				<CommentForm onSubmit={this.addComment}/>
				<CommentsContainer comments={this.state.comments}/>
			</div>
		)
	}

}