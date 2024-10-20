class UsersController < ApplicationController
  before_action :authenticate_user

  def index
    render json: current_user
  end

  private

  def authenticate_user
    token = request.headers['Authorization']&.split(' ')&.last
    payload = JWT.decode(token, Rails.application.secrets.secret_key_base).first
    @current_user = User.find(payload['user_id'])
  rescue JWT::DecodeError
    render json: { error: 'Invalid token' }, status: :unauthorized
  end
end
