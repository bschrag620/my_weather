class SessionToken < ApplicationRecord
	def self.create(string)

		BCrypt::Password.create(string + Time.now.to_i.to_s)
	end
end
