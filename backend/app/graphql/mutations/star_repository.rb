module Mutations
  class StarRepository < BaseMutation
    argument :repository_id, ID, required: true

    field :repository, Types::RepositoryType, null: true
    field :errors, [String], null: false

    def resolve(repository_id:)
      repository = Repository.find(repository_id)
      
      star = Star.new(
        user: context[:current_user],
        repository: repository
      )

      if star.save
        {
          repository: repository.reload,
          errors: []
        }
      else
        {
          repository: nil,
          errors: star.errors.full_messages
        }
      end
    end
  end
end 