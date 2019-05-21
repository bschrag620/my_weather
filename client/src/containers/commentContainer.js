import React, { Component } from 'react'
import CommentForm from './commentForm'
import CommentsContainer from './commentsContainer'

export default class CommentContainer extends Component {
	constructor(props) {
		super(props)

		this.logger = console.log('constructor loading...')
	}

	state = {
		comments: []
	}

	logger = console.log('comment container loading...')

	addComment = (text) => {
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