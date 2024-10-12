class UsersController < ApplicationController
  include UserFetcher

  def index
    render json: { user: @current_user }
  end

  def cookie_proxy
  end
end
