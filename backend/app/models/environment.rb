class Environment < ApplicationRecord
  has_many :environment_user_joins
  has_many :users, through: :environment_user_joins
  has_many :invites
  has_many :environment_files
end
