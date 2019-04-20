class User < ApplicationRecord
	validates :email, presence: true, uniqueness: true, confirmation: true
	validates :email_confirmation, presence: true

	has_many :user_locations
	has_many :locations, through: :user_locations

	has_secure_password
end
