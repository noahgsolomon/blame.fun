module Mutations
  class UpdateRepository < Mutations::BaseMutation
    field :repository, Types::RepositoryType, null: true

    argument :id, GraphQL::Types::ID, required: true
    argument :attributes, Types::Input::RepositoryInput, required: true
    
    def resolve(attributes:, id:)
      model = Repository.find(id)

      if model.update_attributes(attributes.to_h)
        {repository: model}
      else
        model_errors!(model)
      end
    end
  end
end