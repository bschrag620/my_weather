function sessionReducer(state = {
	activeLocation: null,
	activeWeatherStationCode: null
}, action) {
	switch (action.type) {
		case 'SET_ACTIVE_LOCATION':
			console.log('session reducer setting active location: ', action.id)
			return {...state, activeLocation: action.id, activeWeatherStationCode: action.code}

		default:
			return state
	}
}

export default sessionReducer