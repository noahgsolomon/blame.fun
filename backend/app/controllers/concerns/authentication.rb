module Authentication
  extend ActiveSupport::Concern

  included do
    before_action :authenticate_user
  end

  private

  def authenticate_user
    token = cookies[:auth_token]
    puts "token: #{token}"

    if token
      begin
        payload = JWT.decode(token, Rails.application.credentials.secret_key_base).first
        puts "payload: #{payload}"
        @current_user = User.find(payload['user_id'])
      rescue JWT::DecodeError
        handle_unauthorized
      end
    else
      handle_unauthorized
    end
  end

  def handle_unauthorized
    if controller_name == 'graphql'
      @current_user = nil
    else
      render json: { error: 'Unauthorized' }, status: :unauthorized
    end
  end

  def set_auth_token(user)
    token = JWT.encode({ user_id: user.id }, Rails.application.credentials.secret_key_base)
    response.set_cookie(:auth_token, {
      value: token,
      expires: 4.weeks.from_now,
      httponly: true,
      secure: Rails.env.production?,
      same_site: :lax,
      path: '/'
    })
    token
  end

  def current_user
    @current_user
  end
end
