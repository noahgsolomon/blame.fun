module Types
  class UserType < Types::BaseObject
    field :id, GraphQL::Types::ID, null: false
    field :name, String, null: true
    field :created_at, GraphQL::Types::ISO8601DateTime, null: false
    field :updated_at, GraphQL::Types::ISO8601DateTime, null: false
    field :image, String, null: true
    field :email, String, null: false
    field :password_digest, String, null: true
    field :username, String, null: false
    field :location, String, null: true
    field :bio, String, null: true
    field :twitter, String, null: true
    field :github, String, null: true
    field :website, String, null: true
    field :avatar, String, null: true
  end
end