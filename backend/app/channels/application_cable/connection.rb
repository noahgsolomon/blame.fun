module ApplicationCable
  class Connection < ActionCable::Connection::Base
    identified_by :current_user

    def connect
      self.current_user = find_verified_user
    end

    private

    def find_verified_user
      token = request.params[:token]
      user_id = Rails.cache.read("ws_auth_#{token}")
      if user_id
        User.find(user_id)
      else
        reject_unauthorized_connection
      end
    end
  end
end
