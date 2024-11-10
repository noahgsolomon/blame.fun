# frozen_string_literal: true

module Types
  class MutationType < Types::BaseObject
		field :deleteRepository, mutation: Mutations::DeleteRepository
		field :createRepository, mutation: Mutations::CreateRepository
		field :updateRepository, mutation: Mutations::UpdateRepository
  end
end
