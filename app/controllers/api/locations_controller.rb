class Api::LocationsController < ApplicationController
	def retrieve
		location = Location.create_from_string(params[:query])

		render json: location
	end

	def forecast
		location = Location.find(params[:id])

		url = (params[:type] == 'hourly') ? location.hourly_forecast_api : location.forecast_api

		resp = Faraday.get url
		body = JSON.parse(resp.body)
		properties = body['properties']

		forecasts = {
			params[:id] => [],
			zip: location.zip
		}

		properties['periods'].each do |forecast|
			forecasts[params[:id]] << {
				:sequenceN => forecast['number'],
				:name => forecast['name'],
				:startTime => forecast['startTime'],
				:endTime => forecast['endTime'],
				:temperature => forecast['temperature'],
				:windSpeed => forecast['windSpeed'],
				:windDirection => forecast['windDirection'],
				:shortForecast => forecast['shortForecast'],
				:detailedForecast => forecast['detailedForecast']
			}
		end
		
		render json: forecasts
	end

	def current

	end
end
