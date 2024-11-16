module Types
  class QueryType < Types::BaseObject
    field :repositories, resolver: Resolvers::RepositorySearch

    field :user, resolver: Resolvers::UserSearch

    field :starred_repositories, [Types::RepositoryType], null: false do
      argument :username, String, required: true
    end

    def starred_repositories(username:)
      user = User.find_by(username: username)
      Rails.logger.info "Found user: #{user&.id}"
      return [] unless user
      
      repos = user.stars.map(&:repository)
      
      Rails.logger.info "Found starred repos: #{repos.count}"
      repos
    end

    field :node, Types::NodeType, null: true, description: "Fetches an object given its ID." do
      argument :id, ID, required: true, description: "ID of the object."
    end

    field :current_user, Types::UserType, null: true

    def current_user
      context[:current_user]
    end

    def node(id:)
      context.schema.object_from_id(id, context)
    end

    field :nodes, [Types::NodeType, null: true], null: true, description: "Fetches a list of objects given a list of IDs." do
      argument :ids, [ID], required: true, description: "IDs of the objects."
    end

    def nodes(ids:)
      ids.map { |id| context.schema.object_from_id(id, context) }
    end
  end
end
