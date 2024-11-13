# frozen_string_literal: true

module Types
  class MutationType < Types::BaseObject
		field :deleteUser, mutation: Mutations::DeleteUser
		field :createUser, mutation: Mutations::CreateUser
		field :updateUser, mutation: Mutations::UpdateUser
		field :deleteRepository, mutation: Mutations::DeleteRepository
		field :createRepository, mutation: Mutations::CreateRepository
		field :updateRepository, mutation: Mutations::UpdateRepository
  end
end
