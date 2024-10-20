class AuthController < ApplicationController
  def callback
    user_info = params.require(:user).permit(:name, :email, :image)
    account_info = params.require(:account).permit(:provider, :type)
    
    user = User.find_or_create_by(email: user_info[:email]) do |u|
      u.name = user_info[:name]
      u.image = user_info[:image]
      u.provider = account_info[:provider]
      u.username = generate_unique_username(user_info[:name])
    end

    token = JWT.encode({ user_id: user.id }, Rails.application.secrets.secret_key_base)
    render json: { id: user.id, token: token }, status: :ok
  end

  private

  def generate_unique_username(name)
    base_username = name.downcase.gsub(/\s+/, '_')
    username = base_username
    counter = 1
    while User.exists?(username: username)
      username = "#{base_username}_#{counter}"
      counter += 1
    end
    username
  end
end
