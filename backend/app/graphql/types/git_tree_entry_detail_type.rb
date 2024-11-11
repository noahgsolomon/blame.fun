module Types
  class GitTreeEntryDetailType < Types::BaseObject
    field :path, String, null: false
    field :type, String, null: false
    field :file, String, null: true
    field :size, Integer, null: true
    field :msg, String, null: true
    field :name, String, null: true
    field :date, GraphQL::Types::ISO8601DateTime, null: true
    field :oid, String, null: true
  end
end 