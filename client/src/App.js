import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Container } from 'react-bootstrap'
import MyWeatherContainer from './containers/myWeatherContainer'
import MySettingsContainer from './containers/mySettingsContainer'
import AppHeader from './components/stateless/appHeader'

class App extends Component {

  render() {
    return (
	    <Container className="app">
		
    		<Router>
				<Route path='/' component={AppHeader} />
	    			<Switch>
						<Route path='/settings' render={ () =>
							<MySettingsContainer />
						}/>
						<Route exact path='/:zip([0-9]{5})?/:displayType(detail|hourly|weekly)?' component={MyWeatherContainer} />
						<Route path="*" render= { () =>
							'Unrecognized path'
						} />
					</Switch>
      		</Router>
	    </Container>

    );
  }
}

export default App;
