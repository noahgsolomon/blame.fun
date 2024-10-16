class CreateEnvironmentFiles < ActiveRecord::Migration[8.0]
  def change
    create_table :environment_files do |t|
      t.references :environment, null: false, foreign_key: true
      t.string :filename
      t.text :content
      t.string :file_extension
      t.integer :file_size

      t.timestamps
    end
  end
end
