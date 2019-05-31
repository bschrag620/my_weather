class LocationAlias < ApplicationRecord
	belongs_to :location

	def city=(s)
		super s.titleize
	end

	def state=(s)
		super s.upcase
	end

	def self.find_by(params)
		# find by downcase abstract method
		# will work on zip codes too!
		aliases = self.all

		params.each do |k, v|
			aliases = aliases.select{ |loc| loc[k].to_s.downcase == v.to_s.downcase }
		end

		aliases.collect do |a|
			loc = a.location
			loc.city = a.city
			loc.state = a.state
			loc
		end
	end
end
