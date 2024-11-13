module Resolvers
  class RepositorySearch < Resolvers::BaseSearchResolver
    type [Types::RepositoryType], null: false
    
    # Start with repositories joined with users
    scope { Repository.joins(:user) }

    # Find by username and slug combination
    option(:username, type: String) { |scope, value| 
      scope.where(users: { username: value })
    }

    option(:slug, type: String) { |scope, value|
      scope.where(repositories: { slug: value })
    }

    option(:git_url, type: String) { |scope, value|
      scope.where(repositories: { git_url: value })
    }

    # Exact match filters
    option(:id, type: GraphQL::Types::ID) { |scope, value| 
      scope.where(id: value) 
    }

    # Partial match (LIKE) search
    option(:name, type: String) { |scope, value| 
      scope.where(repositories: { name: value }) 
    }

    # Date range filters
    option(:created_after, type: GraphQL::Types::ISO8601DateTime) { |scope, value| 
      scope.where("created_at >= ?", value) 
    }
    
    option(:created_before, type: GraphQL::Types::ISO8601DateTime) { |scope, value| 
      scope.where("created_at <= ?", value) 
    }

    # Enum/Status filters
    option(:status, type: String) { |scope, value| 
      scope.where(status: value) 
    }

    # Sorting
    option(:sort_by, type: String, default: 'created_at') { |scope, value|
      scope.order(value => :desc)
    }

    # Pagination
    option(:limit, type: Integer, default: 25) { |scope, value|
      scope.limit(value)
    }
    
    option(:offset, type: Integer, default: 0) { |scope, value|
      scope.offset(value)
    }
  end
end 