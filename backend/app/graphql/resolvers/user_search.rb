module Resolvers
  class UserSearch < Resolvers::BaseSearchResolver
    type [Types::UserType], null: false
    description "Lists users"

    scope { User.all }
  
    option(:id, type: GraphQL::Types::ID)   { |scope, value| scope.where id: value }
    option(:email, type: String)   { |scope, value| scope.where email: value }
    option(:username, type: String)   { |scope, value| scope.where username: value }
  
  end
end