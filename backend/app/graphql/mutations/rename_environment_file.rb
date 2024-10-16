# frozen_string_literal: true

module Mutations
  class RenameEnvironmentFile < BaseMutation
    # Define the arguments the mutation accepts
    argument :id, ID, required: true
    argument :filename, String, required: true

    field :environment_file, Types::EnvironmentFileType, null: true
    field :errors, [String], null: true

    def resolve(id:, filename:)
      file = EnvironmentFile.find(id)
      unless context[:current_user].environments.include?(file.environment)
        return { environment_file: nil, errors: ["Unauthorized"] }
      end

      if file.update(filename: filename)
        { environment_file: file, errors: [] }
      else
        { environment_file: nil, errors: file.errors.full_messages }
      end
    end
  end
end
