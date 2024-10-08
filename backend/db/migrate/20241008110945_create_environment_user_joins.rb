class CreateEnvironmentUserJoins < ActiveRecord::Migration[8.0]
  def change
    create_table :environment_user_joins do |t|
      t.references :user, null: false, foreign_key: true
      t.references :environment, null: false, foreign_key: true

      t.timestamps
    end
  end
end
