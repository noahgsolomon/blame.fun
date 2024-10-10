class User < ApplicationRecord
  has_many :environment_user_joins
  has_many :environments, through: :environment_user_joins
end