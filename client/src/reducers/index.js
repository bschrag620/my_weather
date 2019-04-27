import { combineReducers } from 'redux';
import userReducer from './user_reducer'
import locationReducer from './location_reducer'
import weatherReducer from './weather_reducer'

const rootReducer = combineReducers({
	user: userReducer,
	locationReducer,
	weatherReducer
});

export default rootReducer;