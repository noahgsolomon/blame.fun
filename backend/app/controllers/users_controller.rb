class UsersController < ApplicationController
  include UserFetcher

  def index
    render json: { user: @current_user }
  end
end
