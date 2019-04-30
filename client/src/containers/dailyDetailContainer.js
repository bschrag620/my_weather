import React, { Component } from 'react'
import { connect } from 'react-redux'

class DailyDetailContainer extends Component {
	constructor(props) {
		super(props)

		this.state = {
			locationLoaded: false,
			zip: this.props.match.params.zip
		}
	}
	componentDidMount() {
		debugger;
	}


	render () {
		return (
			<div className="daily-detail">
				This is a daily detail for {this.state.zip}
			</div>

		)
	}
}

const mapStateToProps = state => {
	return {
		locations: state.locationReducer.locations
	}
}

export default connect(mapStateToProps)(DailyDetailContainer)
