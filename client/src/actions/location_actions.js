function handleErrors(response) {
	if (!response.ok) {
		throw Error('zip code not found')
	}
	return response
}

export default function retrieveLocation(text) {
	return (dispatch) => {
		dispatch({
			type: 'LOCATION_API_REQUEST',
			text: text
		})
		return fetch('/api/locations/retrieve', {
			method: 'POST',
			body: JSON.stringify({query: text}),
			headers: {
				'Content-Type': 'application/json'
			}
		})
			.then(handleErrors)
			.then(response => response.json())
			.then(location => {
				window.history.pushState({}, `daily detail ${location.preferred_observation_code}`, `/${location.zip}/detail`)
				dispatch({
					type: 'SET_ACTIVE_LOCATION',
					id: location.id,
					code: location.preferred_observation_code
				})
				dispatch({
					type: 'ADD_LOCATION', 
					payload: location
				})
			})
			.catch(error => {
				// would like to add an error component to handle temporary display of errors
				console.log(error)
			})
	}
};

export function setLocation(location) {
	return dispatch => {
		dispatch({
			dispatch: 'SET_ACTIVE_LOCATION',
			id: location.id,
			code: location.preferred_observation_code

		})
	}
};