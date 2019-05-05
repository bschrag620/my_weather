import React from 'react';
import ReactDOM from 'react-dom';
import { Route, Link, BrowserRouter as Router } from 'react-router-dom'
import App from './App';
import rootReducer from './reducers/index'
import thunk from 'redux-thunk'
import { Provider } from 'react-redux'
import ProfileContainer from './containers/profileContainer'
import MyWeatherContainer from './containers/myWeatherContainer'
import DisplayContainer from './containers/displayContainer'

import { createStore, applyMiddleware } from 'redux'

const store = createStore(rootReducer, applyMiddleware(thunk))
console.log('store initiated: ', store.getState())

ReactDOM.render(
	<Provider store={store}>
		<Router>
			<Route exact path='/' component={App} />
			<Route path='/:zip([0-9]{5})' component={App} />
		</Router>
	</Provider>
	, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
