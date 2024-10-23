class RemoveTokenField < ActiveRecord::Migration[8.0]
  def change
    remove_column :users, :token
  end
end
