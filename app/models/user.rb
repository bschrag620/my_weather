class User < ApplicationRecord
	validates :email, presence: true, uniqueness: true, confirmation: true
	validates :email_confirmation, presence: true

	has_many :user_locations
	has_many :session_tokens
	has_many :locations, through: :user_locations

	has_secure_password


	# class method for retrieving all users currently logged in
	def self.logged_in
		User.all.collect do | user |
			if user.session_credentials != nil
				user
			end
		end
	end

	def log_in
		SessionToken.create(:user_id => self.id)
		binding.pry
	end

end
