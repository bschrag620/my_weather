class ObservationSiteLocation < ApplicationRecord
	belongs_to :observation_site
	belongs_to :location
end
