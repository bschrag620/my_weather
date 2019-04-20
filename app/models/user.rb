class User < ApplicationRecord
	validates :email, presence: true, uniqueness: true, confirmation: true
	validates :email_confirmation, presence: true

	has_secure_password
end
