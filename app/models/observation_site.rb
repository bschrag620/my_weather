class ObservationSite < ApplicationRecord
	has_many :observation_site_locations
	has_many :locations, through: :observation_site_locations

	validates :code, presence: true, uniqueness: true
	validates :name, :observation_api, :lat, :lng, presence: true
end
