# frozen_string_literal: true

module Types
  class BaseField < GraphQL::Schema::Field
    argument_class Types::BaseArgument

    def initialize(*args, **kwargs, &block)
       super(*args, **kwargs, extensions: [Extensions::SnakeToCamelCaseExtension], &block)
    end
  end
end
