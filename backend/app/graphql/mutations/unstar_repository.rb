module Mutations
  class UnstarRepository < BaseMutation
    argument :repository_id, ID, required: true

    field :repository, Types::RepositoryType, null: true
    field :errors, [String], null: false

    def resolve(repository_id:)
      repository = Repository.find(repository_id)
      
      star = Star.find_by(
        user: context[:current_user],
        repository: repository
      )

      if star&.destroy
        {
          repository: repository.reload,
          errors: []
        }
      else
        {
          repository: nil,
          errors: ["Unable to unstar repository"]
        }
      end
    end
  end
end 