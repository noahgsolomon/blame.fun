if Rails.env.development?
  # Ensure tmp/pids directory exists
  FileUtils.mkdir_p(Rails.root.join('tmp', 'pids'))
  
  # Start git daemon if not already running
  pid_file = Rails.root.join('tmp', 'pids', 'git-daemon.pid')
  base_path = Rails.root.join('repositories')
  
  Rails.logger.info "Starting git daemon with base path: #{base_path}"
  
  command = "git daemon --reuseaddr --base-path=#{base_path} --export-all --enable=receive-pack --pid-file=#{pid_file} --detach #{base_path}"
  
  success = system(command)
  Rails.logger.info success ? "Git daemon started successfully" : "Failed to start git daemon"
end 