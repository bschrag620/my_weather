export default function weatherReducer (state={
	sites: {}
}, action) {

	switch (action.type) {
		case 'RETRIEVING_CURRENT':
			console.log('retrieving current for: ', action.code)
			return state

		case 'RETRIEVING_HOURLY':
			console.log('retrieving hourly forecast for: ', action.code)
			return state

		case 'RETRIEVING_DAILY':
			console.log('retrieving daily forecast for: ', action.code)
			return state

		case 'ADD_CURRENT':
			const newSite = {}
			const key = action.payload.meta.code
			newSite[key] = action.payload
			const newSites = Object.assign(state.sites, newSite);

			return {...state, sites: newSites}

		default:
			return state
	}
}