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
		return fetch(`/api/locations/retrieve?query=${text}`)
			.then(handleErrors)
			.then(response => response.json())
			.then(location => {
				setLocation(location.id)
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

export function setLocation(id) {
	return dispatch => {
		dispatch({
			dispatch: 'SET_ACTIVE_LOCATION',
			id: id
		})
	}
};