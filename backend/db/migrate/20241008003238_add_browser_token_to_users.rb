class AddBrowserTokenToUsers < ActiveRecord::Migration[8.0]
  def change
    add_column :users, :browser_token, :string
  end
end
