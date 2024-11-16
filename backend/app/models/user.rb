class User < ApplicationRecord
  has_many :environment_user_joins
  has_many :environments, through: :environment_user_joins
  has_secure_password
  
  validates :username, presence: true, uniqueness: true
  validates :password, presence: true, on: :create
  validates :email, presence: true, uniqueness: true
  
  has_many :stars
  
  has_many :follows_as_follower, class_name: 'Follow', foreign_key: :follower_id
  has_many :follows_as_followed, class_name: 'Follow', foreign_key: :followed_id
  
  has_many :following, through: :follows_as_follower, source: :followed
  has_many :followers, through: :follows_as_followed, source: :follower

  def self.authenticate(username, password)
    user = find_by(username: username)
    user&.authenticate(password)
  end

  def followed_by?(user)
    return false unless user
    followers.include?(user)
  end
end
