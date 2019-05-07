function sessionReducer(state = {
	currentLocation: null,
	units: 'si'
}, action) {
	switch (action.type) {
		let newUnit;

		case 'SET_ACTIVE_LOCATION':
			console.log('session reducer setting active location: ', action.location.id)
			return {...state, currentLocation: action.location}

		case 'TOGGLE_UNITS':
			newUnit = (state.units === 'si') ? 'us' : 'si'
			debugger;
			return {...state, units: newUnit} 

		case 'SET_UNITS':
			debugger;
			return {...state, ...action.payload}

		default:
			return state
	}
}

export default sessionReducer