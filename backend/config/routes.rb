Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Reveal health status on /up that returns 200 if the app boots with no exceptions, otherwise 500.
  # Can be used by load balancers and uptime monitors to verify that the app is live.
  get "up", to: "rails/health#show", as: :rails_health_check

  get "user", to: "users#index"

  post 'environments', to: 'environments#create'
  get 'environments/:environmentId', to: 'environments#show'
  get 'environments', to: 'environments#index'
  post 'environments/:code/join', to: 'environments#join'
  post 'environments/:environmentId/invite', to: 'environments#create_invite'

  get 'websocket_auth', to: 'websocket_auth#token'

  # Defines the root path route ("/")
  root "admin#index"
end

o