class CreateInvites < ActiveRecord::Migration[8.0]
  def change
    create_table :invites do |t|
      t.references :environment_id, null: false, foreign_key: true
      t.string :code

      t.timestamps
    end
  end
end
