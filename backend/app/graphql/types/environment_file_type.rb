# frozen_string_literal: true

module Types
  class EnvironmentFileType < Types::BaseObject
    field :id, ID, null: false
    field :environment_id, Integer, null: false
    field :filename, String
    field :content, String
    field :file_extension, String
    field :file_size, Integer
    field :created_at, GraphQL::Types::ISO8601DateTime, null: false
    field :updated_at, GraphQL::Types::ISO8601DateTime, null: false
  end
end
