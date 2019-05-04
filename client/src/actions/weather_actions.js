export default function retrieveCurrentConditions(code, id, units='si') {
	return dispatch => {
		dispatch({
			type: 'RETRIEVING_CURRENT',
			payload: {
				loadingData: true,
				id: id,
				code: code
			}
		})

		return fetch(`/api/locations/${code}/current?units=${units}`)
				.then(resp => resp.json())
				.then(weather => {
					dispatch({
						type: 'ADD_CURRENT',
						payload: weather,
						id: id
					})
				})
	}
}