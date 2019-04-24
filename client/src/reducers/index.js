import { combineReducers } from 'redux';
import userReducer from './user_reducer'
import locationReducer from './location_reducer'

const rootReducer = combineReducers({
	user: userReducer,
	locationReducer
});

export default rootReducer;