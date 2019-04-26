export default function retrieveLocation(text) {
	return (dispatch) => {
		dispatch({
			type: 'LOCATION_API_REQUEST',
			text: text
		})
		return fetch(`api/locations/retrieve?query=${text}`)
			.then(response => response.json())
			.then(location => {
				setLocation(location.id)
				dispatch({
					type: 'ADD_LOCATION', 
					payload: location
				})
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