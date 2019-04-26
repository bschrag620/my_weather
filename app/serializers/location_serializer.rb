class LocationSerializer < ActiveModel::Serializer
  attributes :lat, :lng, :zip, :city, :state, :id, :preferred_observation_code

  has_many :observation_sites
end
