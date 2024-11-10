module Types
  module Input
    class RepositoryInput < Types::BaseInputObject
      argument :name, String, required: false
      argument :description, String, required: false
      argument :slug, String, required: false
    end
  end
end