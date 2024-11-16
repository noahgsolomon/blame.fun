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
    field :followers_count, Integer, null: false
    field :following_count, Integer, null: false
    field :is_followed_by_me, Boolean, null: false

    field :followers, [Types::UserType], null: false
    field :following, [Types::UserType], null: false

    def followers_count
      object.followers.count
    end

    def following_count
      object.following.count
    end

    def followers
      object.followers
    end

    def following
      object.following
    end

    def is_followed_by_me
      return false unless context[:current_user]
      object.followed_by?(context[:current_user])
    end
  end
end