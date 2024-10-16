# frozen_string_literal: true

module Types
  class MutationType < Types::BaseObject
    field :add_new_file, mutation: Mutations::AddNewFile
    field :create_invite_link, mutation: Mutations::CreateInviteLink
    field :delete_environment_file, mutation: Mutations::DeleteEnvironmentFile
    field :rename_environment_file, mutation: Mutations::RenameEnvironmentFile
  end
end
