export default function weatherReducer (state={
	keyIndex: {},
	sites: {}
}, action) {
	let id;

	switch (action.type) {
		case 'INITIALIZE_WEATHER_ID':
			console.log('initializing weather state: ', action.payload.id)
			id = action.payload.id
			return {...state, sites: Object.assign({}, state.sites, {[id]: {...state.sites[id], current: action.payload}}) }

		case 'RETRIEVING_CURRENT':
			console.log('retrieving current weather for: ', action.payload.id)
			id = action.payload.id
			return {...state, sites: Object.assign({}, state.sites, {[id]: {...state.sites[id], current: action.payload}}) }

		case 'RETRIEVING_HOURLY_WEATHER':
			console.log('retrieving hourly forecast for: ', action.locationId)
			id = action.payload.id
			const newState = {...state, sites: Object.assign({}, state.sites, {[id]: {...state.sites[id], hourly: action.payload}}) }

			return newState

		case 'RETRIEVING_DAILY':
			console.log('retrieving daily forecast for: ', action.locationId)
			return state

		case 'ADD_HOURLY_WEATHER':
			console.log('adding hourly data')
			id = action.id
			const newHourly = Object.assign({}, {sites: {...state.sites, [id]: {...state.sites[id], ...action.payload}}})
			newHourly.sites[id].hourly.loadingData = false

			return {...state, ...newHourly}

		case 'ADD_CURRENT':
			
			id = action.id
			const newSites = Object.assign({}, {sites: {...state.sites, [id]: {...state.sites[id], ...action.payload}}})

			newSites.sites[id].current.loadingData = false

			return {...state, ...newSites}

		default:
			return state
	}
}