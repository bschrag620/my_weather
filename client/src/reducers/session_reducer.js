function sessionReducer(state = {
	currentLocation: null
}, action) {
	switch (action.type) {
		case 'SET_ACTIVE_LOCATION':
			console.log('session reducer setting active location: ', action.location.id)
			return {...state, currentLocation: action.location}

		default:
			return state
	}
}

export default sessionReducer