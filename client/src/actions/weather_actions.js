export default function retrieveCurrentConditions(code, units='si') {
	return dispatch => {
		dispatch({
			type: 'RETRIEVE_CURRENT',
			code: code
		})
		return fetch(`/api/locations/${code}/current?units=${units}`)
				.then(resp => resp.json())
				.then(weather => {
					dispatch({
						type: 'ADD_CURRENT',
						payload: weather
					})
				})
	}
}