import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Container } from 'react-bootstrap'
import MyWeatherContainer from './containers/myWeatherContainer'
import MySettingsContainer from './containers/mySettingsContainer'
import AppNavbar from './components/stateless/appNavbar'

class App extends Component {

  render() {
    return (
    	<Router>
	      <Container className="app">
				<AppNavbar />
				<Route path='/settings' render={ () =>
					<MySettingsContainer />
				}/>
				<Route exact path='/:zip([0-9]{5})?/:displayType(detail|hourly|weekly)?' component={MyWeatherContainer} />
	      </Container>
      	</Router>
    );
  }
}

export default App;
