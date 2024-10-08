class UsersController < ApplicationController
  def fetch_or_create
    token = cookies[:browser_token]
    puts token

    if token && (user = User.find_by(browser_token: token))
      render json: {user: user}
    else
      new_token = SecureRandom.uuid
      user = User.create!(browser_token: new_token, name: 'sussy snake')
      response.set_cookie(:browser_token, {
        value: new_token,
        expires: 10.years.from_now,
        httponly: true,
        secure: Rails.env.production?,
        same_site: :lax
      })
      render json: {user: user}
    end
  end
end
