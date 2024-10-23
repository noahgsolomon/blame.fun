class SessionsController < ApplicationController
  include Authentication
  skip_before_action :authenticate_user, only: [:create]

  def create
    user = User.find_by(username: params[:username])
    if user&.authenticate(params[:password])
      set_auth_token(user)
      render json: { 
          id: user.id,
          username: user.username,
          email: user.email
      }
    else
      render json: { error: 'Invalid username or password' }, status: :unauthorized
    end
  end

  def destroy
    response.delete_cookie(:auth_token, path: '/')
    render json: { message: 'Logged out successfully' }
  end
end
