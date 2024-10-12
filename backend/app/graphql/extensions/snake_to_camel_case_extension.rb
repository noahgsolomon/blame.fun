module Extensions
  class SnakeToCamelCaseExtension < GraphQL::Schema::FieldExtension
    def resolve(object:, arguments:, context:)
      value = yield(object, arguments)
      
      # Transform snake_case keys to camelCase
      if value.is_a?(Hash)
        value.transform_keys! { |key| key.to_s.camelize(:lower) }
      elsif value.is_a?(Array)
        value.each do |item|
          item.transform_keys! { |key| key.to_s.camelize(:lower) } if item.is_a?(Hash)
        end
      end

      value
    end
  end
end
