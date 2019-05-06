import React, {Component} from 'react'
import { Nav, Navbar } from 'react-bootstrap'

export default class MyWeatherNavBar extends Component {

	handleClick(e) {
		e.preventDefault();
		this.props.history.push(`/${this.props.match.params.zip}/${e.target.getAttribute('value')}`)
	}

	render() {

		const setStyling = text => (this.props.match.params.displayType === text) ? {backgroundColor: 'white', color: 'black'} : {backgroundColor: 'transparent', color: 'white'}

		return (
			<Navbar style={{padding: 0}} expand='lg' bg='dark' variant='dark' >
				<Navbar.Brand color='white'>Brand here?</Navbar.Brand>
				<Navbar.Toggle aria-controls='basic-navbar-nav' />
				<Navbar.Collapse id='basic-navbar-nav'>
					<Nav className="my-weather">
						<Nav.Link style={ setStyling('detail') } href={'/' + this.props.match.params.zip + '/detail'} onClick={ e => this.handleClick(e)} value='detail'>Detail</Nav.Link>
						<Nav.Link style={ setStyling('hourly') } href={'/' + this.props.match.params.zip + '/hourly'} onClick={ e => this.handleClick(e)} value='hourly'>Hourly</Nav.Link>
						<Nav.Link style={ setStyling('weekly') } href={'/' + this.props.match.params.zip + '/weekly'} onClick={ e => this.handleClick(e)} value='weekly'>Weekly</Nav.Link>
					</Nav>
				</Navbar.Collapse>
			</Navbar>
		)
	}
}