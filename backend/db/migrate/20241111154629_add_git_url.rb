class AddGitUrl < ActiveRecord::Migration[8.0]
  def change
    add_column :repositories, :git_url, :string
  end
end
