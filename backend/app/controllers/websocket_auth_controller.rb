class WebsocketAuthController < ApplicationController
  include UserFetcher

  def token
    temp_token = SecureRandom.urlsafe_base64(32)
    Rails.cache.write("ws_auth_#{temp_token}", @current_user.id, expires_in: 30.seconds)
    render json: { token: temp_token }
  end
end