class GraphqlScaffoldGenerator < Rails::Generators::NamedBase
  source_root File.expand_path('templates', __dir__)

  def generate_all
    generate "gql:model_type", name
    generate "gql:input", name
    generate "gql:mutations", name

    generate "gql:model_search_base" unless File.exist?('app/graphql/resolvers/base_search_resolver.rb')
    generate "gql:model_search", name
  end

end