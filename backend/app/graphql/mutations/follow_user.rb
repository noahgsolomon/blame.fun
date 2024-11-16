module Mutations
  class FollowUser < BaseMutation
    argument :username, String, required: true

    field :user, Types::UserType, null: true
    field :errors, [String], null: false

    def resolve(username:)
      user_to_follow = User.find_by(username: username)
      
      follow = Follow.new(
        follower: context[:current_user],
        followed: user_to_follow
      )

      if follow.save
        {
          user: user_to_follow.reload,
          errors: []
        }
      else
        {
          user: nil,
          errors: follow.errors.full_messages
        }
      end
    end
  end
end 