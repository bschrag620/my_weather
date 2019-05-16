import React, { Component } from 'react'
import AppNavbar from './appNavbar'

export default class AppHeader extends Component {

	render() {
		return (
			<div id='app-header'>
				<AppNavbar />
				<div className="header-font centered">my<b>Weather</b></div>
			</div>
		)
	}
	
}