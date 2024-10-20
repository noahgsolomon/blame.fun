module UserFetcher
  extend ActiveSupport::Concern

  included do
    before_action :fetch_user
  end

  private

  def fetch_user
    token = request.headers['Authorization']&.split(' ')&.last
    if token
      begin
        payload = JWT.decode(token, Rails.application.secrets.secret_key_base).first
        @current_user = User.find(payload['user_id'])
      rescue JWT::DecodeError
        @current_user = nil
      end
    else
      @current_user = nil
    end
  end
end
