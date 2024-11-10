module Mutations
  class DeleteRepository < Mutations::BaseMutation
    field :repository, Types::RepositoryType, null: true

    argument :id, GraphQL::Types::ID, required: true

    def resolve(id:)
      model = Repository.find(id)

      model.destroy
      {repository: model}
    end
  end
end