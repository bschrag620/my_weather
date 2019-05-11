import React, {Component} from 'react'
import { Nav, Navbar, Col, Container, Row } from 'react-bootstrap'
import { withRouter } from 'react-router-dom'

class MyWeatherNavBar extends Component {

	handleClick(e) {
		e.preventDefault();
		const url = e.currentTarget.getAttribute('href')
		this.props.history.push(url)
	}

	currentPage(text) {
		return 'clickable tab centered dark' + (this.props.match.params.displayType === text.toLowerCase() ? ' selected' : '')
	}

	createNavTab(text) {
		return <Col className={this.currentPage(text)} href={`/${this.props.match.params.zip}/${text.toLowerCase()}`} onClick={e => this.handleClick(e)}>{text}</Col>
	}

	render() {

		return (
			<Row className="tab-row tab-header">
					{this.createNavTab('Detail')}
					{this.createNavTab('Hourly')}
					{this.createNavTab('Weekly')}
			</Row>
		)
	}
}

export default withRouter(MyWeatherNavBar)