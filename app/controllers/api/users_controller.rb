class Api::UsersController < ApplicationController
	def create
		user = User.create(user_params)
		if user.save
			token = user.log_in
			binding.pry
			render :json => { user: user, token: token }
		else
			
		end
	end

	def authenticate
		binding.pry
	end


	private
	def user_params
		params.require(:user).permit(:email, :email_confirmation, :password, :password_confirmation, :first_name, :last_name, :username)
	end
end
