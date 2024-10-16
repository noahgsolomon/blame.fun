# frozen_string_literal: true

module Mutations
  class CreateInviteLink < BaseMutation
    argument :environment_id, ID, required: true
    argument :code, String, required: true

    field :invite, Types::InviteType, null: true
    field :errors, [String], null: true

    def resolve(environment_id:, code:)
      environment = Environment.find(environment_id)
      unless context[:current_user].environments.include?(environment)
        return { invite: nil, errors: ["Unauthorized"] }
      end

      invite = Invite.create(environment_id: environment_id, code: code)
      { invite: invite, errors: [] }
    end
  end
end
