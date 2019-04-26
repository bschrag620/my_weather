function locationReducer(state = {
	locations: [],
	activeLocation: null
}, action) {
	switch (action.type) {
		case 'ADD_LOCATION':
			if (state.locations.find( loc => loc.zip === action.payload.zip )) {
    			console.log('duplicate location, not adding')
    			return state
			} else {
    			console.log('reducer is adding location: ', action.payload)
				return {...state, locations: state.locations.concat(action.payload)}
			}
			

		case 'REMOVE_LOCATION':
			console.log('location reducer removing locaiton: ', action.id)
			return {
				...state, 
				locations: state.locations.filter( l => l.id !== action.id )
			}

		case 'LOCATION_API_REQUEST':
			console.log('reducer is retrieving location: ', action.text)
			return state
		
		case 'SET_ACTIVE_LOCATION':
			console.log('location reducer setting active location: ', action.id)
			return {...state, activeLocation: action.id}

		case 'CLEAR_ACTIVE_LOCATION':
			console.log('location reducer clearing active location')
			return {...state, activeLocation: null}

		default:
			return state
	}
}

export default locationReducer