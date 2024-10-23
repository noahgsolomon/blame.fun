class UpdateUsersTable < ActiveRecord::Migration[8.0]
  def change
    # Remove unnecessary columns
    remove_column :users, :browser_token
    remove_column :users, :uid
    remove_column :users, :provider

    add_column :users, :token, :string
  end
end
