module Mutations
  class DeleteEnvironmentFile < BaseMutation
    argument :id, ID, required: true

    field :id, ID, null: true
    field :errors, [String], null: true

    def resolve(id:)
      file = EnvironmentFile.find(id)
      
      # Check if the current user has access to the environment
      unless context[:current_user].environments.include?(file.environment)
        return { id: nil, errors: ["You don't have permission to delete this file"] }
      end

      if file.destroy
        { id: file.id, errors: [] }
      else
        { id: nil, errors: file.errors.full_messages }
      end
    end
  end
end
