import React, { Component } from 'react';
import { Nav, Navbar, Col, Container } from 'react-bootstrap';
import { withRouter } from 'react-router-dom'

class AppNavBar extends Component {
	constructor(props) {
		super(props)

		this.state = {
			previousHomeRoute: ''
		}
	}

	handleClick(e) {
		e.preventDefault();
		if (this.props.location.pathname !== '/settings') {
			this.setState({
				previousHomeRoute: this.props.location.pathname.slice(1)
			})
		}

		let newPath = e.target.innerText.toLowerCase()
		if (newPath === 'home') {
			newPath = this.state.previousHomeRoute
		}

		this.props.history.push(`/${newPath}`)
	}
	
	render() {

		const setStyling = text => ('settings' === text) ? {backgroundColor: 'white', color: 'black'} : {backgroundColor: 'transparent', color: 'white'}

		return (
			<Container className="header">
				<Navbar style={{padding: 0, backgroundColor: '#333333'}} expand='lg' variant='dark'>
					<Navbar.Toggle aria-controls='basic-navbar-nav' />
					<Navbar.Collapse id='basic-navbar-nav'>
						<Nav className="my-settings">
							<Col xs='auto'><Nav.Link href='/' onClick={ e => this.handleClick(e) } value='home'>Home</Nav.Link></Col>
							<Col xs='auto'><Nav.Link href='/settings' onClick={ e => this.handleClick(e) } value='settings'>Settings</Nav.Link></Col>
						</Nav>
					</Navbar.Collapse>

					
				</Navbar>
			</Container>
		)
	}
}

export default withRouter(AppNavBar)