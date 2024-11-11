class AddBareToRepositories < ActiveRecord::Migration[8.0]
  def change
    add_column :repositories, :bare, :boolean
  end
end
