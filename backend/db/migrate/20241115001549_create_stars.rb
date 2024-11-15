class CreateStars < ActiveRecord::Migration[8.0]
  def change
    create_table :stars do |t|
      t.references :user, null: false, foreign_key: true
      t.references :repository, null: false, foreign_key: true
      t.timestamps
    end

      # Add a unique index to prevent duplicate stars
      add_index :stars, [:user_id, :repository_id], unique: true
  end
end