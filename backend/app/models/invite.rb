class Invite < ApplicationRecord
  belongs_to :environment
  validates :code, presence: true, uniqueness: true
end
