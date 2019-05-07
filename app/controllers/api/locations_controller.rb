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
		units = params[:units] || 'si'
		forecast_type = params[:type] == 'hourly' ? 'hourly' : 'weekly'
		url = (params[:type] == 'hourly') ? location.hourly_forecast_api : location.forecast_api

		resp = Faraday.get url + "?units=#{units.downcase}"
		body = JSON.parse(resp.body)
		properties = body['properties']
		forecasts = {
			forecast_type => [],
			zip: location.zip
		}

		properties['periods'].each do |forecast|
			(start_time, utc, date) = parse_time(forecast['startTime'])

			forecasts[forecast_type] << {
				:sequenceN => forecast['number'],
				:name => forecast['name'],
				:startTime => start_time,
				:endTime => parse_time(forecast['endTime'])[0],
				:utc => utc,
				:date => date,
				:temperature => { value: forecast['temperature'], units: forecast['temperatureUnit'] },
				:wind => {value: forecast['windSpeed'].split(' ')[0], units: forecast['windSpeed'].split(' ')[1], direction: forecast['windDirection'] },
				:isDaytime => forecast['isDayTime'],
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
		current_conditions[:temperature] = rescue_temperature(is_metric, prop['temperature']['value'])
		current_conditions[:wind] = rescue_wind(is_metric, prop['windSpeed']['value'], prop['windDirection']['value'])
		current_conditions[:pressure] = rescue_pressure(is_metric, prop['barometricPressure']['value'])
		current_conditions[:visibility] = rescue_visibility(is_metric, prop['visibility']['value'])
		current_conditions[:relativeHumidity] = rescue_humidity(is_metric, prop['relativeHumidity']['value'])
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

	def rescue_visibility(metric, value)
		units = metric ? 'km' : 'miles'
		begin
			vis = metric ? value / 1000 : value / 1609
		rescue StandardError
			vis = 'Not available'
			units = '--'
		end
		{value: vis, units: units}
	end

	def rescue_pressure(metric, value)
		units = metric ? 'kPa' : 'mmHg'
		begin
			press = metric ? value / 1000.0 : value * 0.00750062
		rescue StandardError
			press = 'Not available'
			units = '--'
		end
		{value: press, units: units}
	end

	def rescue_temperature(metric, value)
		units = metric ? 'C' : 'F'
		begin
			temp =  metric ? value * 1 : value * 9 / 5 + 32
		rescue StandardError
			temp = 'Not available'
			units = '--'
		end
		{value: temp, units: units}
	end

	def rescue_humidity(metric, value)
		untis = '%'
		begin
			humidity = value.round(2)
		rescue StandardError
			humidity = 'Not available'
			units = '--'
		end
		{value: humidity, units: units}
	end

	def rescue_wind(metric, value, direction)
		units = metric ? 'km/hr' : 'mph'
		direction = wind_direction_conversion(direction)
		begin
			wind = metric ? wind * 3.6 : wind * 2.237
	    rescue StandardError
	    	wind = 'Not available'
	    	units = '--'
	    	direction = '--'
	    end
	    

	    {value: value, units: units, direction: direction}
	end
end
