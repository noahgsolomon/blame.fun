class UsersController < ApplicationController
  include Authentication
  skip_before_action :authenticate_user, only: [:create]
  before_action :authenticate_user, only: [:index]

  def index
    render json: current_user
  end

  def create
    user = User.new(user_params)
    user.image = "icon-#{rand(0..12)}.png"
    
    if user.save
      set_auth_token(user)
      render json: {
        id: user.id,
        name: user.name,
        email: user.email
      }, status: :created
    else
      render json: { errors: user.errors.full_messages }, status: :unprocessable_entity
    end
  end

  private

  def user_params
    params.require(:user).permit(:username, :email, :password)
  end
end
