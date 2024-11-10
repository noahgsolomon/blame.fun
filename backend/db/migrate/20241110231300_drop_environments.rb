class DropEnvironments < ActiveRecord::Migration[8.0]
  def change
    drop_table :environments
    drop_table :environment_files
    drop_table :environment_user_joins
    drop_table :invites
  end
end
