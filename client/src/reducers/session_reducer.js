function sessionReducer(state = {
	currentLocation: null,
	units: 'si',
	delayed: null
}, action) {
	let newState;
	
	switch (action.type) {

		case 'SET_ACTIVE_LOCATION':
			console.log('session reducer setting active location: ', action.location.id)
			return {...state, currentLocation: action.location}

		case 'UPDATE_SETTINGS':
			newState = {...state, ...action.payload}
			return newState

		case 'DELAYED_UPDATE':
			// use to store updates that might be best applies after a component has loaded
			// by letting the component load first then triggering this action
			// componentDidMount() can be utilized to make take other actions
			// in the case of the LocationsContainer, this is useful since we can trigger
			// the fetchAll weather function if there is a change in units

			newState = {...state, delayed: action.payload}
			return newState

		case 'CLEAR_DELAYED':
			newState = Object.assign({}, state)
			delete newState.delayed[action.payload]
			debugger;
			return newState

		default:
			return state
	}
}

export default sessionReducer