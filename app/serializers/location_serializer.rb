class LocationSerializer < ActiveModel::Serializer
  attributes :lat, :lng, :zip, :city, :state, :id, :preferred_observation_:code

  has_many :observation_sites
end
