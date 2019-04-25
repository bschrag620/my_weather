class ObservationSite < ApplicationRecord
	has_many :observation_site_locations
	has_many :locations, through: :observation_site_locations
end
