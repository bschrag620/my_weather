import { combineReducers } from 'redux';
import userReducer from './user_reducer'
import locationReducer from './location_reducer'
import weatherReducer from './weather_reducer'
import sessionReducer from './session_reducer'

const rootReducer = combineReducers({
	userReducer,
	locationReducer,
	weatherReducer,
	sessionReducer
});

export default rootReducer;