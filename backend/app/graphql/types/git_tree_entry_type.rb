module Types
  class GitTreeEntryType < Types::BaseObject
    field :name, String, null: false
    field :type, String, null: false  # "blob" for files, "tree" for directories
    field :oid, String, null: false   # Git object ID
    field :path, String, null: false
  end
end 