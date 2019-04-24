Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

  namespace :api do
  	resources :users, only: [:create, :index] do
  		post '/authenticate', to: 'users#authenticate'
  	end

  	get '/locations/retrieve', to: 'locations#retrieve'
  end

  resources :api, only: [:index]
end
