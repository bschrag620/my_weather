import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Container, Navbar } from 'react-bootstrap'
import MyWeatherContainer from './containers/myWeatherContainer'
import MySettings from './containers/mySettings'
import LocationInput from './components/locationInput'

class App extends Component {

  render() {
	
    return (
    	<Router>
	      <Container className="App">
				<Navbar>
					App nav bar here....
				</Navbar>
				<Switch>
					<Route path='/settings' component={MySettings} />
					<Route path='/:zip([0-9]{5})?/:displayType(detail|hourly|weekly)?' component={MyWeatherContainer} />
				</Switch>
	      </Container>
      	</Router>
    );
  }
}

export default App;
