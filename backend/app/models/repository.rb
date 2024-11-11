class Repository < ApplicationRecord
  belongs_to :user
  before_save :set_bare

  # Add validations
  validates :name, presence: true
  validates :slug, presence: true, uniqueness: { scope: :user_id }
  validates :description, presence: true

  # Initialize git repository after creation
  after_commit :initialize_git_repository, on: :create
  before_destroy :cleanup_git_repository

  def git_path
    File.join(Rails.application.config.git_repositories_path, user.username, "#{slug}.git")
  end

  def git_url
    if Rails.env.development?
      "git://localhost:9418/#{user.username}/#{slug}.git"
    else
      "git://#{Rails.application.config.git_host}/#{user.username}/#{slug}.git"
    end
  end

  def git_repository
    @git_repository ||= Rugged::Repository.new(git_path)
  rescue Rugged::RepositoryError, Rugged::OSError
    nil
  end

  def self.delete_all_with_cleanup
    all.each do |repo|
      repo.destroy
    end
  end

  private

  def set_bare
    self.bare = true
  end

  def initialize_git_repository
    Rails.logger.info "Creating repository at: #{git_path}"
    FileUtils.mkdir_p(git_path)
    Rails.logger.info "Directory created"
    
    Rugged::Repository.init_at(git_path, :bare)
    Rails.logger.info "Repository initialized"
    
    export_file = File.join(git_path, 'git-daemon-export-ok')
    FileUtils.touch(export_file)
    Rails.logger.info "Export file created at: #{export_file}"
    
    Rails.logger.info "Repository permissions:"
    system("ls -la #{git_path}")
  rescue => e
    Rails.logger.error "Failed to initialize git repository: #{e.message}"
    Rails.logger.error e.backtrace.join("\n")
    false
  end

  def cleanup_git_repository
    Rails.logger.info "Cleaning up repository at: #{git_path}"
    if File.directory?(git_path)
      FileUtils.rm_rf(git_path)
      Rails.logger.info "Repository directory removed"
    end
  rescue => e
    Rails.logger.error "Failed to cleanup git repository: #{e.message}"
    Rails.logger.error e.backtrace.join("\n")
    false
  end
end