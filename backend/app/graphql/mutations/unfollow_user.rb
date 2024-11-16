module Mutations
  class UnfollowUser < BaseMutation
    argument :username, String, required: true

    field :user, Types::UserType, null: true
    field :errors, [String], null: false

    def resolve(username:)
      user_to_unfollow = User.find_by(username: username)
      
      follow = Follow.find_by(
        follower: context[:current_user],
        followed: user_to_unfollow
      )

      if follow.destroy
        {
          user: user_to_unfollow.reload,
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