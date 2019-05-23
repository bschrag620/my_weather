import React, { Component } from 'react'
import CommentForm from './commentForm'
import CommentsContainer from './commentsContainer'

export default class CommentContainer extends Component {
	constructor(props) {
		super(props)

		this.logger = console.log('constructor loading...')
	}

	state = {
		comments: [{
			text: 'hello', 
			vote: 0},
			{text: 'world',
			vote: 0}]
	}

	logger = console.log('comment container loading...')

	addComment(text) {
		this.setState({
			comments: this.state.comments.concat({text:text, vote: 0})
		})
	}

	upVote(e) {
		const id = parseInt(e.currentTarget.id)
		const votedComment = this.state.comments[id]
		votedComment.vote++
		this.setState({
			comments: 
				[...this.state.comments.slice(0, id), 
				votedComment, 
				...this.state.comments.slice(id + 1)]
		})
	}
		
	render() {
		return (
			<div className="comment-container">
				<CommentForm onSubmit={this.addComment.bind(this)}/>
				
				<CommentsContainer comments={this.state.comments} onUpVote={this.upVote.bind(this)} />
			</div>
		)
	}

}