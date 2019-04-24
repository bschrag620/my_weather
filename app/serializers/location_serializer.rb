class LocationSerializer < ActiveModel::Serializer
  attributes :lat, :lng, :zip, :city, :state, :id
end
