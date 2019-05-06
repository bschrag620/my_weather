import uuid from 'uuid'

function handleErrors(response) {
	if (!response.ok) {
		throw Error('zip code not found')
	}
	return response
}

export default function retrieveLocation(text) {
	const id = uuid()
	return (dispatch) => {
		dispatch({
			type: 'LOCATION_API_REQUEST',
			payload: {
				text: text,
				loadingData: true,
				id: id
			}
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
				dispatch({
					type: 'SET_ACTIVE_LOCATION',
					location: location
				})
				location.id = id
				dispatch({
					type: 'INITIALIZE_WEATHER_ID',
					payload: {
						id: id,
						loadingData: true
					}
				})
				dispatch({
					type: 'UPDATE_LOCATION', 
					payload: {
						...location,
						loadingData: false
					}
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
			location: location
		})
	}
};