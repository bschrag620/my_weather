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

		case 'RETRIEVING_HOURLY':
			console.log('retrieving hourly forecast for: ', action.code)
			return state

		case 'RETRIEVING_DAILY':
			console.log('retrieving daily forecast for: ', action.code)
			return state

		case 'ADD_CURRENT':
			
			id = action.id
			const newSites = Object.assign({}, { 
				sites:
					{...state.sites, [id]: 
						{...state.sites[id], current: 
							{...state.sites[id].current, ...action.payload}
						}
					}
				}
			)
			newSites.sites[id].current.loadingData = false
			
			const newKeyIndex = Object.assign({}, {
				keyIndex: {
					...state.keyIndex, [id]: action.payload.meta.code
				}
			})

			return {...state, ...newSites, ...newKeyIndex}

		default:
			return state
	}
}