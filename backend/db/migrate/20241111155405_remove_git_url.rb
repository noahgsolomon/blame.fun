class RemoveGitUrl < ActiveRecord::Migration[8.0]
  def change
    remove_column :repositories, :git_url
  end
end
