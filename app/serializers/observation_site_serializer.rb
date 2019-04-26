class ObservationSiteSerializer < ActiveModel::Serializer
  attributes :code, :name

  belongs_to :location
end
