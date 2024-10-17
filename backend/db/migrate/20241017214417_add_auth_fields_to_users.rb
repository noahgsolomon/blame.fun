class AddAuthFieldsToUsers < ActiveRecord::Migration[8.0]
  def change
    add_column :users, :email, :string, null: false
    add_column :users, :password_digest, :string
    add_column :users, :username, :string, null: false

    add_index :users, :email, unique: true
    add_index :users, :username, unique: true
  end
end