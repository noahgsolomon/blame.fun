module Resolvers
  class RepositorySearch < Resolvers::BaseSearchResolver
    type [Types::RepositoryType], null: false
    
    scope { Repository.all }

    # Exact match filters
    option(:id, type: GraphQL::Types::ID) { |scope, value| 
      scope.where(id: value) 
    }

    # Partial match (LIKE) search
    option(:name, type: String) { |scope, value| 
      scope.where("name ILIKE ?", "%#{value}%") 
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