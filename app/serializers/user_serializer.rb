class UserSerializer < ActiveModel::Serializer
  attributes :id

  has_many :locations
end
