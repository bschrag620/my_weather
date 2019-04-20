class UserSerializer < ActiveModel::Serializer
  attributes :id, :email, :session_message, :session_credentials

  has_many :locations
end
