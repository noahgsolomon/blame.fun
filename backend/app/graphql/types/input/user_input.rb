module Types
  module Input
    class UserInput < Types::BaseInputObject
      argument :name, String, required: false
      argument :image, String, required: false
      argument :email, String, required: false
      argument :password_digest, String, required: false
      argument :username, String, required: false
      argument :location, String, required: false
      argument :bio, String, required: false
      argument :twitter, String, required: false
      argument :github, String, required: false
      argument :website, String, required: false
      argument :avatar, String, required: false
    end
  end
end