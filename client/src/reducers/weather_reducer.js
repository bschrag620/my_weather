export default function weatherReducer (state={
	keyIndex: {},
	sites: {}
}, action) {
	let id, newState;

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

			return {...state, sites: Object.assign({}, state.sites, {[id]: {...state.sites[id], hourly: action.payload}}) }

		case 'RETRIEVING_WEEKLY_WEATHER':
			console.log('retrieving weekly forecast for: ', action.locationId)
			id = action.payload.id
			
			return {...state, sites: Object.assign({}, state.sites, {[id]: {...state.sites[id], weekly: action.payload}})}

		case 'ADD_HOURLY_WEATHER':
			console.log('adding hourly data')
			id = action.id
			newState = Object.assign({}, {sites: {...state.sites, [id]: {...state.sites[id], ...action.payload}}})
			newState.sites[id].hourly.loadingData = false

			return {...state, ...newState}

		case 'ADD_WEEKLY_WEATHER':
			console.log('adding weekly weather')
			id = action.id
			newState = Object.assign({}, {sites: {...state.sites, [id]: {...state.sites[id], ...action.payload}}})
			newState.sites[id].weekly.loadingData = false
			newState.sites[id].current['detailedForecast'] = newState.sites[id].weekly[0]['detailedForecast']

			return {...state, ...newState}

		case 'ADD_CURRENT':
			
			id = action.id
			newState = Object.assign({}, {sites: {...state.sites, [id]: {...state.sites[id], ...action.payload}}})
			
			newState.sites[id].current.loadingData = false
			newState.sites[id].current['detailedForecast'] = 'Retrieving detailed forecast...'
			return {...state, ...newState}

		default:
			return state
	}
}