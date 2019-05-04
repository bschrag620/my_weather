import React from 'react'
import { Route, Link, BrowserRouter as Router } from 'react-router-dom'
import DetailCard from '../components/detailCard'

const ForecastDisplay = ( props ) => {
	debugger;
	return (
		<div>
			<Route path={props.match.url + "/detail"} component={() => <DetailCard details={props.data} /> } /> 
		</div>
	)
}

export default ForecastDisplay