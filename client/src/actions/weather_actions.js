const handleError = response => {
	return response
}

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
				.then(resp => handleError(resp))
				.then(resp => resp.json())
				.then(weather => {
					dispatch({
						type: 'ADD_CURRENT',
						payload: weather,
						id: id
					})
				})
				.catch(error => console.log(error))
	}
}

export function retrieveHourlyConditions(locationId, id, units='si') {
	return dispatch => {
		dispatch({
			type: 'RETRIEVING_HOURLY_WEATHER',
			payload: {
				loadingData: true,
				locationId: locationId,
				id: id
			}
		})

		return fetch(`/api/locations/${locationId}/forecast?units=${units}&type=hourly`)
			.then(resp => handleError(resp))
			.then(resp => resp.json())
			.then(weather => {
				dispatch({
					type: 'ADD_HOURLY_WEATHER',
					payload: weather,
					id: id
				})
			})
			.catch(error => console.log(error))
	}
}

export function retrieveWeeklyForecast(locationId, id, units='si') {
	return dispatch => {
		dispatch({
			type: 'RETRIEVING_WEEKLY_WEATHER',
			payload: {
				loadingData: true,
				locationId: locationId,
				id: id
			}
		})

		return fetch(`/api/locations/${locationId}/forecast?units=${units}&type=weekly`)
			.then(resp => handleError(resp))
			.then(resp => resp.json())
			.then(weather => {
				dispatch({
					type: 'ADD_WEEKLY_WEATHER',
					payload: weather,
					id: id
				})
			})
			.catch(error => {
				console.log(error)
			})
	}	
}