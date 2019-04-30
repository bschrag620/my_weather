import React, { Component } from 'react';
import { Navbar } from 'react-bootstrap'
import WeatherContainer from './containers/weatherContainer'

class App extends Component {
  render() {
    return (
      <div className="App">
          <WeatherContainer />
      </div>
    );
  }
}

export default App;
