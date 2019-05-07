function sessionReducer(state = {
	currentLocation: null,
	units: 'si'
}, action) {
	let newUnit;
	
	switch (action.type) {

		case 'SET_ACTIVE_LOCATION':
			console.log('session reducer setting active location: ', action.location.id)
			return {...state, currentLocation: action.location}

		case 'TOGGLE_UNITS':
			newUnit = (state.units === 'si') ? 'us' : 'si'
			console.log('session reducer setting units to: ', newUnit)
			return {...state, units: newUnit} 

		case 'SET_UNITS':
			return {...state, ...action.payload}

		default:
			return state
	}
}

export default sessionReducer