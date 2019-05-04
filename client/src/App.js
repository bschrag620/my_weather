import React, { Component } from 'react';
import { Navbar } from 'react-bootstrap'
import MyWeatherContainer from './containers/myWeatherContainer'

class App extends Component {
  render() {
    return (
      <div className="App">
          <MyWeatherContainer />
      </div>
    );
  }
}

export default App;
