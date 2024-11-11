class Repository < ApplicationRecord
  belongs_to :user

  # Add validations
  validates :name, presence: true
  validates :slug, presence: true, uniqueness: { scope: :user_id }
  validates :description, presence: true

  # Initialize git repository after creation
  after_commit :initialize_git_repository, on: :create
  before_destroy :cleanup_git_repository

  def git_path
    File.join(Rails.application.config.git_repositories_path, user.username, slug)
  end

  def git_repository
    @git_repository ||= Rugged::Repository.new(git_path)
  rescue Rugged::RepositoryError, Rugged::OSError
    nil
  end

  private

  def initialize_git_repository
    FileUtils.mkdir_p(git_path)
    Rugged::Repository.init_at(git_path, :bare)
  rescue => e
    Rails.logger.error "Failed to initialize git repository: #{e.message}"
    # Don't raise here since we're in an after_commit callback
    false
  end

  def cleanup_git_repository
    FileUtils.rm_rf(git_path) if File.directory?(git_path)
  rescue => e
    Rails.logger.error "Failed to cleanup git repository: #{e.message}"
    false
  end
end