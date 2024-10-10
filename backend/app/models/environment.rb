class Environment < ApplicationRecord
  has_many :environment_user_joins
  has_many :users, through: :environment_user_joins
  has_many :invites
end