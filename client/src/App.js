import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Container, Navbar } from 'react-bootstrap'
import MyWeatherContainer from './containers/myWeatherContainer'
import MySettingsContainer from './containers/mySettingsContainer'
import LocationInput from './components/locationInput'
import AppNavbar from './components/stateless/appNavbar'

class App extends Component {

  render() {
	
    return (
    	<Router>
	      <Container className="App">
				<AppNavbar />
				<Route path='/settings' component={MySettingsContainer} />
				<Route exact path='/:zip([0-9]{5})?/:displayType(detail|hourly|weekly)?' component={MyWeatherContainer} />
	      </Container>
      	</Router>
    );
  }
}

export default App;
