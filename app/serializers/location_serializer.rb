class LocationSerializer < ActiveModel::Serializer
  attributes :lat, :long, :zip, :city, :state
end
