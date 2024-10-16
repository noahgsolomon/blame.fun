# frozen_string_literal: true

module Mutations
  class AddNewFile < BaseMutation
    argument :environment_id, ID, required: true
    argument :filename, String, required: true
    argument :content, String, required: true
    argument :file_extension, String, required: true

    field :id, ID, null: true
    field :errors, [String], null: true

    def resolve(environment_id:, filename:, content:, file_extension:)
      environment = Environment.find(environment_id)
      unless context[:current_user].environments.include?(environment)
        return { id: nil, errors: ["Unauthorized"] }
      end

      environment_file = EnvironmentFile.new(
        environment_id: environment_id,
        filename: filename,
        content: content,
        file_extension: file_extension
      )
      if environment_file.save
        { id: environment_file.id, errors: [] }
      else
        { id: nil, errors: environment_file.errors.full_messages }
      end
    end
  end
end
