module Mutations
  class CreateRepository < Mutations::BaseMutation
    field :repository, Types::RepositoryType, null: true

    argument :attributes, Types::Input::RepositoryInput, required: true

    def resolve(attributes:)
      model = Repository.new(attributes.to_h.merge(user_id: context[:current_user].id))

      if model.save
        { repository: model }
      else
        raise GraphQL::ExecutionError.new(
          "Failed to create repository",
          extensions: {
            errors: model.errors.full_messages
          }
        )
      end
    end
  end
end