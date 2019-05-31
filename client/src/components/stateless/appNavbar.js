import React, { Component } from 'react';
import { connect } from 'react-redux';
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

		return (
			<Container className="header">
				<Navbar  expand='sm'>
					<Navbar.Toggle aria-controls='basic-navbar-nav' />
					<Navbar.Collapse id='basic-navbar-nav'>
						<Nav className="my-settings">
							<Col xs='auto'><Nav.Link href='/' onClick={ e => this.handleClick(e) } value='home'>Home</Nav.Link></Col>
							<Col xs='auto'><Nav.Link href='/settings' onClick={ e => this.handleClick(e) } value='settings'>Settings</Nav.Link></Col>
							{(this.props.user.username === null) ?
							 	<Col xs='auto'><Nav.Link href='/signup' onClick={ e => this.handleClick(e) } value='signup'>Signup</Nav.Link></Col> :
							 	''
							}
						</Nav>
					</Navbar.Collapse>

					
				</Navbar>
			</Container>
		)
	}
}

const mapStateToProps = state => {
	return {
		user: state.userReducer
	}
}

export default withRouter(connect(mapStateToProps)(AppNavBar))