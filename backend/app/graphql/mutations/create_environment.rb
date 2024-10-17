# frozen_string_literal: true

module Mutations
  class CreateEnvironment < BaseMutation

    field :id, ID, null: false
    field :errors, [String], null: true

    def resolve
      Rails.logger.info "Creating environment for user: #{context[:current_user].id}"
      environment = Environment.create(name: generate_random_name)
      EnvironmentUserJoin.create(environment_id: environment.id, user_id: context[:current_user].id)
      file_content = "console.log('Hello, world!');\n\nconst fn = () => { console.log('Hello, world!'); };\n\nfn();"
      EnvironmentFile.create(environment_id: environment.id, filename: "main.js", content: file_content, file_extension: "js", file_size: file_content.length)

      { id: environment.id, errors: [] }
    end

    private
    
    def generate_random_name
      adjectives = ['Sunny', 'Cloudy', 'Rainy', 'Snowy', 'Windy', 'Calm', 'Stormy']
      nouns = ['Meadow', 'Forest', 'Mountain', 'Valley', 'River', 'Lake', 'Ocean']
      "#{adjectives.sample} #{nouns.sample}"
    end
  end
end
