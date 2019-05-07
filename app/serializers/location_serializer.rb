class LocationSerializer < ActiveModel::Serializer
  attributes :lat, :lng, :zip, :city, :state, :preferred_observation_code

  attribute :id, key: :locationId

  has_many :observation_sites
end
