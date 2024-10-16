class EnvironmentFile < ApplicationRecord
  belongs_to :environment

  validates :filename, presence: true
end

