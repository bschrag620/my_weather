function locationReducer(state = {
	locations: []
}, action) {
	switch (action.type) {
		case 'ADD_LOCATION':
			console.log('reducer is adding location: ', action.payload)
			debugger;
			return {...state, locations: state.locations.concat(action.payload)}
			

		case 'LOCATION_API_REQUEST':
			console.log('reducer is retrieving location: ', action.text)		

		default:
			return state
	}
}

export default locationReducer