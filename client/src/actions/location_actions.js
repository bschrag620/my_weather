export default function retrieveLocation(text) {
	return (dispatch) => {
		dispatch({
			type: 'LOCATION_API_REQUEST',
			text: text
		})

		return fetch(`api/locations/retrieve?query=${text}`)
			.then(response => response.json())
			.then(location => {
				dispatch({
					type: 'ADD_LOCATION', 
					payload: location
				})
			})
	}
}
