import uuid from 'uuid'

function handleErrors(response) {
	switch (response.status) {
		case 404:
			console.log('existing location not found')
			return response

		case 406:
			throw Error('error creating location')

		case 500:
			throw Error('problem creating location')

		case 415:
			throw Error('Search string not recognized as 5-digit zip code or city, st')

		case 200:
			console.log('location found')
			return response

		case 201:
			console.log('new location created')
			return response

		default:
			console.log('unrecognized response:', response.status, response)
			throw Error('unrecognized response')
	}
}

export function retrieveLocation(text) {
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

		return fetch(`/api/locations/retrieve?query=${text}`)
			.then(response => {
				if (response.status === 404) {
					dispatch({
						type: 'AMEND_LOCATION',
						payload: {
							text: 'new location, this may take a moment...',
							loadingData: true,
							id: id
						}
					})

					return fetch('/api/locations/create', {
						method: 'POST',
						body: JSON.stringify({query: text}),
						headers: {
							'Content-Type': 'application/json'
						}
					})
				}

				return response
			})
			.then(handleErrors)
			.then(response => response.json() )
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
				console.log(error)
				alert(error)
				dispatch({
					type: 'REMOVE_LOCATION',
					id: id
				})
			})
	}
};

export function setLocation(location) {
	return dispatch => {
		dispatch({
			type: 'SET_ACTIVE_LOCATION',
			location: location
		})
	}
}

export default retrieveLocation