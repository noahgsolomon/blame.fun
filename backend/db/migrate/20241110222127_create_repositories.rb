class CreateRepositories < ActiveRecord::Migration[8.0]
  def change
    create_table :repositories do |t|
      t.string :name
      t.text :description
      t.references :user, null: false, foreign_key: true
      t.string :slug

      t.timestamps
    end
  end
end
