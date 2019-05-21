import React, { Component } from 'react';
import { Nav, Navbar, Col, Container } from 'react-bootstrap';
import { withRouter } from 'react-router-dom'

class AppNavBar extends Component {
	state = { 
		previousHomeRoute: ''}

	handleClick = e => {
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

		return (
			<Container className="header">
				<Navbar  expand='sm'>
					<Navbar.Toggle aria-controls='basic-navbar-nav' />
					<Navbar.Collapse id='basic-navbar-nav'>
						<Nav className="my-settings">
							<Col xs='auto'><Nav.Link href='/' onClick={ this.handleClick } value='home'>Home</Nav.Link></Col>
							<Col xs='auto'><Nav.Link href='/settings' onClick={ this.handleClick } value='settings'>Settings</Nav.Link></Col>
						</Nav>
					</Navbar.Collapse>

					
				</Navbar>
			</Container>
		)
	}
}

export default withRouter(AppNavBar)