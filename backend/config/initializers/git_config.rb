# Set the path for Git repositories
Rails.application.config.git_repositories_path = Rails.root.join('repositories')

# Ensure the repositories directory exists
FileUtils.mkdir_p(Rails.application.config.git_repositories_path)

# Create a .keep file if it doesn't exist
keep_file = Rails.root.join('repositories', '.keep')
FileUtils.touch(keep_file) unless File.exist?(keep_file) 