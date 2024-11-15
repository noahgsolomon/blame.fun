class AddStarColsToRepositor < ActiveRecord::Migration[8.0]
  def change
    add_column :repositories, :stars, :integer, default: 0
  end
end
