Rails.application.routes.draw do
  post "/graphql", to: "graphql#execute"
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Reveal health status on /up that returns 200 if the app boots with no exceptions, otherwise 500.
  # Can be used by load balancers and uptime monitors to verify that the app is live.
  get "up", to: "rails/health#show", as: :rails_health_check

  get "user", to: "users#index"

  post 'environments', to: 'environments#create'
  get 'environments', to: 'environments#index'
  resources :environments, only: [:index, :create] do
    post 'invite', on: :member, to: 'environments#create_invite'
    resources :files, only: [:create], controller: 'environment_files'
  end

  post 'environments/:code/join', to: 'environments#join'

  get 'websocket_auth', to: 'websocket_auth#token'

  post "/graphql", to: 'graphql#execute'

  # Defines the root path route ("/")
  root "admin#index"
end
