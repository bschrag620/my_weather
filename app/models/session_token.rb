class SessionToken < ApplicationRecord
	before_validation :create_token

	private

	# create a unique token when a user logs in
	def create_token
		self.token = BCrypt::Password.create(User.find(self.user_id).email + Time.now.to_f.to_s)
	end
end
