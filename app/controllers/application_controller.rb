class ApplicationController < ActionController::Base
	def index
		render :erb => 'api/index'
	end

	def fallback_index_html
		render :file => 'public/index.html'
	end
end
