# frozen_string_literal: true

module Types
  class MutationType < Types::BaseObject
		field :deleteUser, mutation: Mutations::DeleteUser
		field :createUser, mutation: Mutations::CreateUser
		field :updateUser, mutation: Mutations::UpdateUser
		field :deleteRepository, mutation: Mutations::DeleteRepository
		field :createRepository, mutation: Mutations::CreateRepository
		field :updateRepository, mutation: Mutations::UpdateRepository
		field :star_repository, mutation: Mutations::StarRepository
    field :unstar_repository, mutation: Mutations::UnstarRepository
  end
end
