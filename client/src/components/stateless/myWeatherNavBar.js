import React, {Component} from 'react'
import { Nav, Navbar, Col, Container } from 'react-bootstrap'
import { withRouter } from 'react-router-dom'

class MyWeatherNavBar extends Component {

	handleClick(e) {
		e.preventDefault();
		this.props.history.push(`/${this.props.match.params.zip}/${e.target.getAttribute('value')}`)
	}

	render() {

		const setStyling = text => (this.props.match.params.displayType === text) ? {backgroundColor: 'white', color: 'black'} : {backgroundColor: 'transparent', color: 'white'}

		return (
			<Container className="header">
			<Navbar style={{padding: 0, backgroundColor: '#333333'}} expand='lg' variant='dark' >
				<Navbar.Toggle aria-controls='basic-navbar-nav' />
				<Navbar.Collapse id='basic-navbar-nav'>
						<Nav className="my-weather">
							<Col xs='auto'><Nav.Link style={ setStyling('detail') } href={'/' + this.props.match.params.zip + '/detail'} onClick={ e => this.handleClick(e)} value='detail'>Detail</Nav.Link></Col>
							<Col xs='auto'><Nav.Link style={ setStyling('hourly') } href={'/' + this.props.match.params.zip + '/hourly'} onClick={ e => this.handleClick(e)} value='hourly'>Hourly</Nav.Link></Col>
							<Col xs='auto'><Nav.Link style={ setStyling('weekly') } href={'/' + this.props.match.params.zip + '/weekly'} onClick={ e => this.handleClick(e)} value='weekly'>Weekly</Nav.Link></Col>
						</Nav>
				</Navbar.Collapse>
			</Navbar>
			</Container>
		)
	}
}

export default withRouter(MyWeatherNavBar)