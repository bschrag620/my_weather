class Location < ApplicationRecord
	has_many :user_locations
	has_many :users, through: :user_locations

	has_many :location_aliases

	has_many :observation_site_locations
	has_many :observation_sites, through: :observation_site_locations

	validates :zip, presence: true, uniqueness: true

	@@google_key = ENV['GOOGLE_MAP_API_KEY']
	@@zip_key = ENV['ZIP_API_KEY']

	def lat=(value)
		super(value.round(4))
	end

	def lng=(value)
		super(value.round(4))
	end

	def self.find_by_string(string)
		params = parse_string(string)

		if params.keys.empty?
			{:body => {:error => "query not recognized: #{string}"}, :status => 415}
		else
			location = Location.find_by(params).first
			location ? {:body => location, :status => 200} : {:body => {:error => "location data does not exist for: #{string}"}, :status => 404}
		end
	end

	def self.find_by(params)
		# find by downcase abstract method
		# will work on zip codes too!
		locations = Location.all

		params.each do |k, v|
			locations = locations.select{ |loc| loc[k].to_s.downcase == v.to_s.downcase }
		end

		if locations.empty? && params[:zip].nil?
			locations = LocationAlias.find_by(params)
		end
		binding.pry
		locations
	end

	def self.create_from_string(string)
		# parse the string to see what kind of data was sent
		params = parse_string(string)
		# if the string couldn't be parsed return nil
		if params.keys.empty?
			nil
		else
			# if it is missing a zip key, find it using the zip api
			if !params.keys.include?(:zip)
				params.update(retrieve_zip_by_city_state(params))
			end
			if params[:zip].nil? && list_of_zips.nil?
				{:body => {:error => "query not recognized: #{string}"}, :status => 415}
			else
			# now we have a zip key, let's create zip
				Location.create(params)
			end
		end
	end

	
	# overriding class method so the new location can be constructed will all relevant data
	def self.create(params)
		loc = Location.find_or_create_by(:zip => params[:zip])
		response = loc ? {:body => loc, :status => 200} : retrieve_by_zip(params)
		if {:city => params[:city].downcase, :state => params[:state].downcase} != {:city => response[:body][:city].downcase, :state => response[:body][:state].downcase}
			new_alias = LocationAlias.create(params)
			new_alias.location = response[:body]
			new_alias.save

			response[:body][:city] = new_alias[:city]
			response[:body][:state] = new_alias[:state]

		end
		if response[:status] == 201
			location = Location.new(response[:body])
			location.update(retrieve_weather_api(location.lat.round(4), location.lng.round(4)))
			location.update(retrieve_observation_stations(location.station_list_api))
			location.set_preferred_site

			location.save

			{:body => location, :status => 201}
		else
			response
		end
	end

	def self.parse_string(string)
		zip = /^\d{5}$/
		city_state = /.+[,]\s?\w+/

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
		if !data['results'].empty?
			location = {}

			location[:zip] = params[:zip]
			address_components = data['results'][0]['address_components']
			location.update(data['results'][0]['geometry']['location'])
			location[:city] =  find_type(address_components, 'locality')['long_name']
			location[:state] = find_type(address_components, 'administrative_area_level_1')['short_name']
			
			response = {:body => location, :status => 201 }
		elsif data['results'].empty?
			response = {:body => {:error => "no data found for #{params[:zip]}"}, :status => 406}
		
		else
			response = {:body => {:error => data['error_message']}, :status => resp.status } 
		end

		response
	end

	def self.find_type(array, name)
		array.find { |item| item['types'].include?(name) }
	end

	def self.retrieve_zip_by_city_state(params)
		url = "https://www.zipcodeapi.com/rest/#{@@zip_key}/city-zips.json/#{to_uri(params[:city])}/#{params[:state]}"
		resp = Faraday.get url

		{ :zip => JSON.parse(resp.body)['zip_codes'][0] }
	end

	def self.retrieve_weather_api(lat, lng)
		url = "https://api.weather.gov/points/#{lat},#{lng}"
		resp = Faraday.get url
		data = JSON.parse(resp.body)
		{
			:forecast_api => data['properties']['forecast'], 
			:hourly_forecast_api => data['properties']['forecastHourly'],
			:station_list_api => data['properties']['observationStations']}
	end

	def self.retrieve_observation_stations(url)
		resp = Faraday.get url
		body = JSON.parse(resp.body)
		features = body['features']
		station_ids = []
		features.each do |station|
			if station['properties']['@type'] == 'wx:ObservationStation'
				params = {
					:code => station['properties']['stationIdentifier'],
					:name => station['properties']['name'],
					:observation_api => station['properties']['@id'] + '/observations',
					:lat => station['geometry']['coordinates'][1],
					:lng => station['geometry']['coordinates'][0]}
				observation_site = ObservationSite.find_by(:code => params[:code])
				if !observation_site
					observation_site = ObservationSite.create(params)
				end
				
				station_ids << observation_site.id
			end
		end

		{observation_site_ids: station_ids}
	end

	def self.to_uri(value)
		value.sub(' ', '%20')
	end

	def set_preferred_site
		self.preferred_observation_code = self.find_min_distance.code
	end

	def find_min_distance

		def to_radians(deg)
			deg * Math::PI / 180
		end
		
		#implementation of haversine formulat
		# found here: http://www.movable-type.co.uk/scripts/latlong.html?from=47.80423,-120.03866&to=47.799342,-119.984476
		# self is site #1, observation site is #2 
		
		r = 6371e3
		lat1 = to_radians(self.lat)
		
		self.observation_sites.min do | site |
			lat2 = to_radians(site.lat)
			delta_lat = to_radians(site.lat - self.lat)
			delta_lng = to_radians(site.lng - self.lng)

			a = Math.sin(delta_lat / 2) ** 2 +
				Math.cos(lat1) * Math.cos(lat2) *
				Math.sin(delta_lng / 2) ** 2 

			c = 2 * Math.atan2(a ** 0.5, (1 - a) ** 0.5)

			r * c
		end
	end

end