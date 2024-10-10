class RenameEnvironmentIdIdToEnvironmentIdInInvites < ActiveRecord::Migration[8.0]
  def change
    remove_column :invites, :environment_id_id
  end
end
