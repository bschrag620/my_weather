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
		return 'nav-tab' + (this.props.match.params.displayType === text.toLowerCase() ? ' selected' : '')
	}

	createNavTab(text) {
		return <Col className={this.currentPage(text)}><a href={`/${this.props.match.params.zip}/${text.toLowerCase()}`} onClick={e => this.handleClick(e)}>{text}</a></Col>
	}

	render() {

		return (
			<Container className="nav-header">
				<Row>
					{this.createNavTab('Detail')}
					{this.createNavTab('Hourly')}
					{this.createNavTab('Weekly')}
				</Row>
			</Container>
		)
	}
}

export default withRouter(MyWeatherNavBar)