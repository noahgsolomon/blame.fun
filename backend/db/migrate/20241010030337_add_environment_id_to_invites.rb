class AddEnvironmentIdToInvites < ActiveRecord::Migration[8.0]
  def change
    add_reference :invites, :environment, null: false, foreign_key: true
  end
end
