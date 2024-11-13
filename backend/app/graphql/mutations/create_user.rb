module Mutations
  class CreateUser < Mutations::BaseMutation
    field :user, Types::UserType, null: true

    argument :attributes, Types::Input::UserInput, required: true

    def resolve(attributes:)
      model = User.new(attributes.to_h)

      if model.save
        {user: model}
      else
        model_errors!(model)
      end
    end
  end
end