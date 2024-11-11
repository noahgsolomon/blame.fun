module Types
  class GitCommitType < Types::BaseObject
    field :message, String, null: false
    field :author_name, String, null: false
    field :authored_at, GraphQL::Types::ISO8601DateTime, null: false
    field :short_oid, String, null: false
  end
end 