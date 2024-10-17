class AddUidAndProviderToUsers < ActiveRecord::Migration[8.0]
  def change
    add_column :users, :uid, :string
    add_column :users, :provider, :string
  end

  def self.from_omniauth(response)
    User.find_or_create_by(uid: response[:uid], provider: response[:provider]) do |user|
      user.username = response[:info][:name]
      user.email = response[:info][:email]
      user.password = SecureRandom.hex(16)
    end
  end
end
