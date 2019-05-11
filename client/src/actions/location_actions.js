import uuid from 'uuid'

function handleErrors(response) {
	switch (response.status) {
		case 404:
			throw Error('zip code not found')
			return response

		case 500:
			throw Error('problem creating location')
			return response

		case 204:
			console.log('attempting to create new location')
			return response

		default:
			return response
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
				if (response.status === 204) {
					debugger;
					dispatch({
						type: 'AMEND_LOCATION',
						payload: {
							text: 'new location, this may take a moment...',
							loadingData: true,
							id: id
						}
					})
					debugger;
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