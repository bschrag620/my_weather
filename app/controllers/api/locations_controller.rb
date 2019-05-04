class Api::LocationsController < ApplicationController
	def retrieve
		location = Location.create_from_string(params[:query])
		if location
			render json: location, :status => 200
		else
			render json: {:error => 'no matching zip code found'}, status: 404
		end
	end

	def forecast
		location = Location.find(params[:id])
		units = params[:units] || 'SI'
		url = (params[:type] == 'hourly') ? location.hourly_forecast_api : location.forecast_api

		resp = Faraday.get url + "&units=#{units}"
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
		site = ObservationSite.find_by(:code => params[:code])

		resp = Faraday.get site.observation_api + '/latest'
		body = JSON.parse(resp.body)
		prop = body['properties']

		current_conditions = {}
		current_conditions[:temperature] = is_metric ? { value: prop['temperature']['value'], units: 'C' } : { value: prop['temperature']['value'] * 9 / 5 + 32, units: 'F' }
		current_conditions[:wind] = is_metric ? { value: prop['windSpeed']['value'], units: 'ms-1', direction: wind_direction_conversion(prop['windDirection']['value']) } : { value: prop['windSpeed']['value'] * 2.237, units: 'mph', direction: wind_direction_conversion(prop['windDirection']['value']) }
		current_conditions[:pressure] = is_metric ? { value: prop['barometricPressure']['value'], units: 'Pa' } : { value: prop['barometricPressure']['value'] / 100, units: 'mBar' }
		current_conditions[:visibility] = is_metric ? { value: prop['visibility']['value'] / 1000, units: 'km' } : { value: prop['visibility']['value'] / 1609, units: 'm' }
		current_conditions[:relativeHumidity] = { value: prop['relativeHumidity']['value'], units: '%' }
		current_conditions[:timestamp] = parse_time(prop['timestamp'])[0]

		render json: {:meta => ObservationSiteSerializer.new(site).attributes, properties: current_conditions}
	end

	private
	def is_metric
		if params[:units]
			!(params[:units].downcase == 'us')
		else
			true
		end
	end

	def wind_direction_conversion(deg)
		wind_table = {
			0 => 'N',
			22.5 => 'NNE',
			45 => 'NE',
			67.5 => 'ENE',
			90 => 'E',
			112.5 => 'ESE',
			135 => 'SE',
			157.5 => 'SSE',
			180 => 'S',
			202.5 => 'SSW',
			225 => 'SW',
			247.5 => 'WSW',
			270 => 'W',
			292.5 => 'WNW',
			315 => 'NW',
			337.5 => 'NNW'
		}

		if deg.nil?
			'--'
		else
			wind_values = wind_table.find_all { |k, v| k <= deg }
			wind_values.last[1]
		end
	end

	def parse_time(string)
		(date, remainder) = string.split('T')
		(time, utc) = remainder.split('+')
		[time, utc, date]
	end
end
