module Mutations
  class CreateRepository < Mutations::BaseMutation
    field :repository, Types::RepositoryType, null: true

    argument :attributes, Types::Input::RepositoryInput, required: true

    def resolve(attributes:)
      model = Repository.new(attributes.to_h)

      if model.save
        {repository: model}
      else
        model_errors!(model)
      end
    end
  end
end