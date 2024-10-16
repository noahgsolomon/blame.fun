# frozen_string_literal: true

module Types
  class InviteType < Types::BaseObject
    field :id, ID, null: false
    field :code, String
    field :created_at, GraphQL::Types::ISO8601DateTime, null: false
    field :updated_at, GraphQL::Types::ISO8601DateTime, null: false
    field :environment_id, Integer, null: false
  end
end
