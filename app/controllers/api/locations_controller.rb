class Api::LocationsController < ApplicationController
	def retrieve
		location = Location.create_from_string(params[:query])

		render json: location
	end
end
