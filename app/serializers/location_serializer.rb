class LocationSerializer < ActiveModel::Serializer
  attributes :lat, :lng, :zip, :city, :state, :id

  has_many :observation_sites
end
