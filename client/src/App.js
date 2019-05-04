import React, { Component } from 'react';
import MyWeatherContainer from './containers/myWeatherContainer'
import ProfileContainer from './containers/profileContainer'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

class App extends Component {
  render() {
    return (
 	<Router>
      <div className="App">
      	<Switch>
      		<Route path='/profile' component={ProfileContainer} />
			<Route path="/:zip([0-9]{5})?" component={MyWeatherContainer} />
      		<Route path='/' component={MyWeatherContainer} />
      	</Switch>
      </div>
  	</Router>
    );
  }
}

export default App;
