class User < ApplicationRecord
  has_many :environment_user_joins
  has_many :environments, through: :environment_user_joins
  has_secure_password
  
  validates :username, presence: true, uniqueness: true
  validates :password, presence: true, on: :create
  validates :email, presence: true, uniqueness: true
  
  def self.authenticate(username, password)
    user = find_by(username: username)
    user&.authenticate(password)
  end
end
