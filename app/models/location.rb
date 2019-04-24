class Location < ApplicationRecord
	has_many :user_locations
	has_many :users, through: :user_locations

	validates :zip, :weather_x, :weather_y, presence: true, uniqueness: true

	@@google_key = ENV['GOOGLE_MAP_API_KEY']
	@@zip_key = ENV['ZIP_API_KEY']

	# allows for a Location to be created from an abstract string of either zip code or city, state

	def self.create_from_string(string)
		# parse the string to see what kind of data was sent
		params = parse_string(string)
		if params.keys.empty?
			nil
		else
			# if it is missing a zip key, find it using the zip api
			if !params.keys.include?(:zip)
				params = retrieve_zip_by_city_state(params)
				binding.pry
			end

			if params[:zip].nil?
				nil
			else
			# now we have a zip key, let's find_or_create_by zips
				Location.find_or_create_by(params)
			end
		end
	end

	
	# overriding class method so the new location can be constructed will all relevant data
	def self.find_or_create_by(params)
		location = Location.find_by(params)

		# if location wasn't found, create it and retrieve the necessary info
		if !location
			location = Location.new(params)
			location.update(retrieve_by_zip(params))
			location.update(retrieve_weather_xy(location.lat.round(4), location.lng.round(4)))
			location.save
		end

		location
	end

	def self.parse_string(string)
		zip = /\d{5}/
		city_state = /\w+[,]\s?\w+/

		# assign values to data hash
		data = {
			:zip => (string.match(zip)) ? string.match(zip)[0] : nil,
			:city => (string.match(city_state)) ? string.match(city_state)[0].split(',')[0] : nil,
			:state => (string.match(city_state)) ? string.match(city_state)[0].split(',')[1].strip : nil 
		}
		# remove keys with a nil value and return new hash
		data.each do |key, value|
			if value.nil?
				data.delete(key)
			end
		end
	end

	def self.retrieve_by_zip(params)
		url = "https://maps.googleapis.com/maps/api/geocode/json?address=#{params[:zip]}&key=#{@@google_key}"
		resp = Faraday.get url
		data = JSON.parse(resp.body)		
		location = {}
		location[:zip] = params[:zip]
		address_components = data['results'][0]['address_components']
		location.update(data['results'][0]['geometry']['location'])
		location[:city] =  find_type(address_components, 'locality')['long_name']
		location[:state] = find_type(address_components, 'administrative_area_level_1')['short_name']
		location
	end

	def self.find_type(array, name)
		array.find { |item| item['types'].include?(name) }
	end

	def self.retrieve_zip_by_city_state(params)
		url = "https://www.zipcodeapi.com/rest/#{@@zip_key}/city-zips.json/#{params[:city]}/#{params[:state]}"
		resp = Faraday.get url
		{ :zip => JSON.parse(resp.body)['zip_codes'][0] }
	end

	def self.retrieve_weather_xy(lat, lng)
		url = "https://api.weather.gov/points/#{lat},#{lng}"
		resp = Faraday.get url
		data = JSON.parse(resp.body)
		{:weather_x => data['properties']['gridX'], :weather_y => data['properties']['gridY']}
	end

end

# https://api.weather.gov/gridpoints/TOP/31,80/forecast/hourly?units=us

# https://api.weather.gov/gridpoints/TOP/31,80/forecast?units=us

# {
#   "@context": [
#     "https://raw.githubusercontent.com/geojson/geojson-ld/master/contexts/geojson-base.jsonld",
#     {
#       "wx": "https://api.weather.gov/ontology#",
#       "geo": "http://www.opengis.net/ont/geosparql#",
#       "unit": "http://codes.wmo.int/common/unit/",
#       "@vocab": "https://api.weather.gov/ontology#"
#     }
#   ],
#   "type": "Feature",
#   "geometry": {
#     "type": "GeometryCollection",
#     "geometries": [
#       {
#         "type": "Point",
#         "coordinates": [
#           -97.0944084,
#           39.7559738
#         ]
#       },
#       {
#         "type": "Polygon",
#         "coordinates": [
#           [
#             [
#               -97.1089731,
#               39.7668263
#             ],
#             [
#               -97.1085269,
#               39.7447788
#             ],
#             [
#               -97.0798467,
#               39.7451195
#             ],
#             [
#               -97.08028680000001,
#               39.767167
#             ],
#             [
#               -97.1089731,
#               39.7668263
#             ]
#           ]
#         ]
#       }
#     ]
#   },
#   "properties": {
#     "updated": "2019-04-20T18:26:30+00:00",
#     "units": "us",
#     "forecastGenerator": "BaselineForecastGenerator",
#     "generatedAt": "2019-04-20T19:52:14+00:00",
#     "updateTime": "2019-04-20T18:26:30+00:00",
#     "validTimes": "2019-04-20T12:00:00+00:00/P7DT13H",
#     "elevation": {
#       "value": 441.96000000000004,
#       "unitCode": "unit:m"
#     },
#     "periods": [
#       {
#         "number": 1,
#         "name": "This Afternoon",
#         "startTime": "2019-04-20T14:00:00-05:00",
#         "endTime": "2019-04-20T18:00:00-05:00",
#         "isDaytime": true,
#         "temperature": 82,
#         "temperatureUnit": "F",
#         "temperatureTrend": null,
#         "windSpeed": "15 mph",
#         "windDirection": "S",
#         "icon": "https://api.weather.gov/icons/land/day/skc?size=medium",
#         "shortForecast": "Sunny",
#         "detailedForecast": "Sunny, with a high near 82. South wind around 15 mph, with gusts as high as 25 mph."
#       },
#       {
#         "number": 2,
#         "name": "Tonight",
#         "startTime": "2019-04-20T18:00:00-05:00",
#         "endTime": "2019-04-21T06:00:00-05:00",
#         "isDaytime": false,
#         "temperature": 55,
#         "temperatureUnit": "F",
#         "temperatureTrend": null,
#         "windSpeed": "10 to 15 mph",
#         "windDirection": "S",
#         "icon": "https://api.weather.gov/icons/land/night/few?size=medium",
#         "shortForecast": "Mostly Clear",
#         "detailedForecast": "Mostly clear, with a low around 55. South wind 10 to 15 mph, with gusts as high as 25 mph."
#       },
#       {
#         "number": 3,
#         "name": "Sunday",
#         "startTime": "2019-04-21T06:00:00-05:00",
#         "endTime": "2019-04-21T18:00:00-05:00",
#         "isDaytime": true,
#         "temperature": 82,
#         "temperatureUnit": "F",
#         "temperatureTrend": null,
#         "windSpeed": "10 to 15 mph",
#         "windDirection": "S",
#         "icon": "https://api.weather.gov/icons/land/day/sct?size=medium",
#         "shortForecast": "Mostly Sunny",
#         "detailedForecast": "Mostly sunny, with a high near 82. South wind 10 to 15 mph, with gusts as high as 25 mph."
#       },
#       {
#         "number": 4,
#         "name": "Sunday Night",
#         "startTime": "2019-04-21T18:00:00-05:00",
#         "endTime": "2019-04-22T06:00:00-05:00",
#         "isDaytime": false,
#         "temperature": 55,
#         "temperatureUnit": "F",
#         "temperatureTrend": null,
#         "windSpeed": "5 to 15 mph",
#         "windDirection": "SE",
#         "icon": "https://api.weather.gov/icons/land/night/tsra_sct,30?size=medium",
#         "shortForecast": "Chance Showers And Thunderstorms",
#         "detailedForecast": "A chance of showers and thunderstorms after 7pm. Mostly cloudy, with a low around 55. Southeast wind 5 to 15 mph, with gusts as high as 20 mph. Chance of precipitation is 30%."
#       },
#       {
#         "number": 5,
#         "name": "Monday",
#         "startTime": "2019-04-22T06:00:00-05:00",
#         "endTime": "2019-04-22T18:00:00-05:00",
#         "isDaytime": true,
#         "temperature": 67,
#         "temperatureUnit": "F",
#         "temperatureTrend": null,
#         "windSpeed": "10 to 15 mph",
#         "windDirection": "N",
#         "icon": "https://api.weather.gov/icons/land/day/tsra_sct,20?size=medium",
#         "shortForecast": "Slight Chance Showers And Thunderstorms",
#         "detailedForecast": "A slight chance of showers and thunderstorms before 1pm. Mostly cloudy, with a high near 67. North wind 10 to 15 mph. Chance of precipitation is 20%."
#       },
#       {
#         "number": 6,
#         "name": "Monday Night",
#         "startTime": "2019-04-22T18:00:00-05:00",
#         "endTime": "2019-04-23T06:00:00-05:00",
#         "isDaytime": false,
#         "temperature": 46,
#         "temperatureUnit": "F",
#         "temperatureTrend": null,
#         "windSpeed": "10 to 15 mph",
#         "windDirection": "N",
#         "icon": "https://api.weather.gov/icons/land/night/bkn?size=medium",
#         "shortForecast": "Mostly Cloudy",
#         "detailedForecast": "Mostly cloudy, with a low around 46."
#       },
#       {
#         "number": 7,
#         "name": "Tuesday",
#         "startTime": "2019-04-23T06:00:00-05:00",
#         "endTime": "2019-04-23T18:00:00-05:00",
#         "isDaytime": true,
#         "temperature": 63,
#         "temperatureUnit": "F",
#         "temperatureTrend": null,
#         "windSpeed": "10 mph",
#         "windDirection": "N",
#         "icon": "https://api.weather.gov/icons/land/day/rain_showers,20?size=medium",
#         "shortForecast": "Slight Chance Rain Showers",
#         "detailedForecast": "A slight chance of rain showers between 7am and 1pm. Mostly cloudy, with a high near 63. Chance of precipitation is 20%."
#       },
#       {
#         "number": 8,
#         "name": "Tuesday Night",
#         "startTime": "2019-04-23T18:00:00-05:00",
#         "endTime": "2019-04-24T06:00:00-05:00",
#         "isDaytime": false,
#         "temperature": 45,
#         "temperatureUnit": "F",
#         "temperatureTrend": null,
#         "windSpeed": "5 to 10 mph",
#         "windDirection": "N",
#         "icon": "https://api.weather.gov/icons/land/night/bkn?size=medium",
#         "shortForecast": "Mostly Cloudy",
#         "detailedForecast": "Mostly cloudy, with a low around 45."
#       },
#       {
#         "number": 9,
#         "name": "Wednesday",
#         "startTime": "2019-04-24T06:00:00-05:00",
#         "endTime": "2019-04-24T18:00:00-05:00",
#         "isDaytime": true,
#         "temperature": 71,
#         "temperatureUnit": "F",
#         "temperatureTrend": null,
#         "windSpeed": "5 mph",
#         "windDirection": "N",
#         "icon": "https://api.weather.gov/icons/land/day/sct?size=medium",
#         "shortForecast": "Mostly Sunny",
#         "detailedForecast": "Mostly sunny, with a high near 71."
#       },
#       {
#         "number": 10,
#         "name": "Wednesday Night",
#         "startTime": "2019-04-24T18:00:00-05:00",
#         "endTime": "2019-04-25T06:00:00-05:00",
#         "isDaytime": false,
#         "temperature": 48,
#         "temperatureUnit": "F",
#         "temperatureTrend": null,
#         "windSpeed": "5 mph",
#         "windDirection": "SW",
#         "icon": "https://api.weather.gov/icons/land/night/few?size=medium",
#         "shortForecast": "Mostly Clear",
#         "detailedForecast": "Mostly clear, with a low around 48."
#       },
#       {
#         "number": 11,
#         "name": "Thursday",
#         "startTime": "2019-04-25T06:00:00-05:00",
#         "endTime": "2019-04-25T18:00:00-05:00",
#         "isDaytime": true,
#         "temperature": 74,
#         "temperatureUnit": "F",
#         "temperatureTrend": null,
#         "windSpeed": "5 to 15 mph",
#         "windDirection": "NW",
#         "icon": "https://api.weather.gov/icons/land/day/sct?size=medium",
#         "shortForecast": "Mostly Sunny",
#         "detailedForecast": "Mostly sunny, with a high near 74."
#       },
#       {
#         "number": 12,
#         "name": "Thursday Night",
#         "startTime": "2019-04-25T18:00:00-05:00",
#         "endTime": "2019-04-26T06:00:00-05:00",
#         "isDaytime": false,
#         "temperature": 48,
#         "temperatureUnit": "F",
#         "temperatureTrend": null,
#         "windSpeed": "5 to 10 mph",
#         "windDirection": "NE",
#         "icon": "https://api.weather.gov/icons/land/night/few?size=medium",
#         "shortForecast": "Mostly Clear",
#         "detailedForecast": "Mostly clear, with a low around 48."
#       },
#       {
#         "number": 13,
#         "name": "Friday",
#         "startTime": "2019-04-26T06:00:00-05:00",
#         "endTime": "2019-04-26T18:00:00-05:00",
#         "isDaytime": true,
#         "temperature": 74,
#         "temperatureUnit": "F",
#         "temperatureTrend": null,
#         "windSpeed": "5 to 10 mph",
#         "windDirection": "SE",
#         "icon": "https://api.weather.gov/icons/land/day/sct?size=medium",
#         "shortForecast": "Mostly Sunny",
#         "detailedForecast": "Mostly sunny, with a high near 74."
#       },
#       {
#         "number": 14,
#         "name": "Friday Night",
#         "startTime": "2019-04-26T18:00:00-05:00",
#         "endTime": "2019-04-27T06:00:00-05:00",
#         "isDaytime": false,
#         "temperature": 55,
#         "temperatureUnit": "F",
#         "temperatureTrend": null,
#         "windSpeed": "10 to 15 mph",
#         "windDirection": "S",
#         "icon": "https://api.weather.gov/icons/land/night/sct/tsra_hi,20?size=medium",
#         "shortForecast": "Partly Cloudy then Slight Chance Showers And Thunderstorms",
#         "detailedForecast": "A slight chance of showers and thunderstorms after 1am. Partly cloudy, with a low around 55. Chance of precipitation is 20%."
#       }
#     ]
#   }
# }
