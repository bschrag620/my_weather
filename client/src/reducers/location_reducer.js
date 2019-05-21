function locationReducer(state = {
	locations: [],
}, action) {

	let index, newState;
	switch (action.type) {
		
		case 'UPDATE_LOCATION':
			if (state.locations.find( loc => loc.zip === action.payload.zip )) {
    			console.log('duplicate location, not adding')
				return locationReducer(state, {type: 'REMOVE_LOCATION', id: action.payload.id})
			} else {
    			console.log('reducer is adding location: ', action.payload)
    			
    			index = state.locations.findIndex( loc => loc.id === action.payload.id )
				newState = [...state.locations.slice(0, index), action.payload, ...state.locations.slice(index + 1)]			
				return {...state, locations: newState }
			}

		case 'AMEND_LOCATION':
			index = state.locations.findIndex( loc => loc.id === action.payload.id )
			newState = [...state.locations.slice(0, index), action.payload, ...state.locations.slice(index + 1)]

			return {...state, locations: newState }
			

		case 'REMOVE_LOCATION':
			console.log('location reducer removing locaiton: ', action.id)
			newState = {
				...state, 
				locations: state.locations.filter( l => l.id !== action.id )
			}
			return newState

		case 'LOCATION_API_REQUEST':
			console.log('reducer is retrieving location: ', action.payload.text)
			return {...state, locations: [action.payload, ...state.locations]}

		default:
			return state
	}
}

export default locationReducer