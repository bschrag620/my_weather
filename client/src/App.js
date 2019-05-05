import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import MyWeatherContainer from './containers/myWeatherContainer'

class App extends Component {
  render() {
    return (
	      <div className="App">
      		<MyWeatherContainer match={this.props.match}/>
	      </div>
    );
  }
}

export default App;
