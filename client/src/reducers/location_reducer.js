function locationReducer(state = {
	locations: [],
}, action) {

	switch (action.type) {
		
		case 'UPDATE_LOCATION':
			if (state.locations.find( loc => loc.zip === action.payload.zip )) {
    			console.log('duplicate location, not adding')
    			
    			return state
			} else {
    			console.log('reducer is adding location: ', action.payload)
    			
    			const index = state.locations.findIndex( loc => loc.id === action.payload.id )
				const newState = [...state.locations.slice(0, index), action.payload, ...state.locations.slice(index + 1)]			
				
				return {...state, locations: newState }
			}
			

		case 'REMOVE_LOCATION':
			console.log('location reducer removing locaiton: ', action.id)
			return {
				...state, 
				locations: state.locations.filter( l => l.id !== action.id )
			}

		case 'LOCATION_API_REQUEST':
			console.log('reducer is retrieving location: ', action.payload.text)
			return {...state, locations: [action.payload, ...state.locations]}

		default:
			return state
	}
}

export default locationReducer