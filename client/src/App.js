import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Container } from 'react-bootstrap'
import MyWeatherContainer from './containers/myWeatherContainer'
import MySettingsContainer from './containers/mySettingsContainer'
import RegistrationContainer from './containers/registrationContainer'
import AppHeader from './components/stateless/appHeader'
import { withCookies } from 'react-cookie'

class App extends Component {

  componentDidMount() {
  	if (!this.props.allCookies.myWeatherVisited) {
  		this.props.cookies.set('myWeatherVisited', true, { path: '/' })
  		this.props.cookies.set('myWeatherUnits', 'si', { path: '/' })
  		alert('Welcome to myWeather')
  	}
  }

  render() {
    return (
	    <Container className="app">
		
    		<Router>
				<Route path='/' component={AppHeader} />
	    			<Switch>
						<Route path='/settings' render={ (props) =>
							<MySettingsContainer 
								{ ...props } 
								cookies={this.props.cookies}
							/>
						}/>
						<Route 
							exact path='/:zip([0-9]{5})?/:displayType(detail|hourly|weekly)?' 
							render={ (props) => 
								<MyWeatherContainer
									{ ...props }
									cookies={this.props.cookies}
								/>
							} 
						/>
						<Route 
							exact path='/:registrationType(signup|login)?'
							render={ () => 
								<RegistrationContainer 
									{ ...props }
									cookies={this.props.cookies}
								/>}
						/>
						<Route path="*" render= { () =>
							'Unrecognized path'
						} />
					</Switch>
      		</Router>
	    </Container>

    );
  }
}

export default withCookies(App);
