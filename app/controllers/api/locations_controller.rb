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
		location = Location.find_by(:id => params[:location_id])
		units = params[:units] || 'SI'
		forecast_type = params[:type] == 'hourly' ? 'hourly' : 'weekly'
		url = (params[:type] == 'hourly') ? location.hourly_forecast_api : location.forecast_api
		resp = Faraday.get url + "?units=#{units}"
		body = JSON.parse(resp.body)
		properties = body['properties']
		forecasts = {
			forecast_type => [],
			zip: location.zip
		}

		properties['periods'].each do |forecast|
			(start_time, utc, date) = parse_time(forecast['startTime'])

			binding.pry
			forecasts[forecast_type] << {
				:sequenceN => forecast['number'],
				:name => forecast['name'],
				:startTime => start_time,
				:endTime => parse_time(forecast['endTime'])[0],
				:utc => utc,
				:date => date,
				:temperature => { value: forecast['temperature'], units: forecast['temperatureUnit'] }
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
		current_conditions[:shortDescription] = prop['textDescription']

		render json: {:meta => ObservationSiteSerializer.new(site).attributes, current: current_conditions}
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
		(time, utc) = remainder.split(/[+-]/)
		[time, utc, date]
	end
end
