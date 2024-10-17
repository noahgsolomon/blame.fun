# frozen_string_literal: true

module Mutations
  class JoinEnvironment < BaseMutation

    argument :code, String, required: true

    field :id, ID, null: true 
    field :errors, [String], null: true


    def resolve(code:)
      Rails.logger.info "Joining environment for user: #{context[:current_user].id}"
      invite = Invite.find_by(code: code)
      
      if invite.nil?
        { id: nil, errors: ['Not a valid invite']}
      end

      existing_join = EnvironmentUserJoin.find_by(environment_id: invite.environment_id, user_id: context[:current_user].id)
      if existing_join
        { id: invite.environment_id, errors: [] }
      end

      environment_user_join = EnvironmentUserJoin.new(environment_id: invite.environment_id, user_id: context[:current_user].id)
      if environment_user_join.save
        invite.destroy
        { id: invite.environment_id, errors: [] }
      else
        { id: nil, errors: environment_user_join.errors.full_messages }
      end
    end
  end
end
