import { combineReducers } from 'redux';
import userReducer from './user_reducer'
import locationReducer from './location_reducer'
import forecastReducer from './forecast_reducer'

const rootReducer = combineReducers({
	user: userReducer,
	locationReducer,
	forecastReducer
});

export default rootReducer;