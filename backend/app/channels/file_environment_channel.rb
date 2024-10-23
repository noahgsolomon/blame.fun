class FileEnvironmentChannel < ApplicationCable::Channel
  include Authentication

  # Class variable to store connected users for each file
  @@connected_users = {}

  def subscribed
    Rails.logger.info "Attempting to subscribe with user: #{current_user&.id}"
    Rails.logger.info "File ID: #{params[:fileId]}"

    if current_user.nil?
      Rails.logger.error "Subscription rejected: Current user is nil"
      reject
      return
    end

    env_file = EnvironmentFile.find_by(id: params[:fileId])
    if env_file && EnvironmentUserJoin.find_by(environment_id: env_file.environment_id, user_id: current_user.id)
      stream_from "file_environment_#{params[:fileId]}"
      Rails.logger.info "Subscription accepted for user #{current_user.id} in file #{env_file.id} of environment #{env_file.environment_id}"
      add_user_to_connected_list
      broadcast_user_joined
      broadcast_connected_users
    else
      Rails.logger.error "Subscription rejected: User not part of environment or environment file not found"
      reject
    end
  end

  def unsubscribed
    broadcast_user_left
    remove_user_from_connected_list
    broadcast_connected_users
    # Any additional cleanup needed when channel is unsubscribed
  end

  def receive(data)
    Rails.logger.info "Received message: #{data.inspect}"
    file = data['file']
    ActionCable.server.broadcast("file_environment_#{params[:fileId]}", {
      file: {
        id: file['id'],
        content: file['content'],
        sender: current_user.as_json(only: [:id, :name, :image]),
        timestamp: file['timestamp'],
        file_extension: file['file_extension'],
        file_name: file['filename'],
        file_size: file['file_size']
      }
    })
    EnvironmentFile.update(file['id'], { content: file['content'], filename: file['filename'], file_extension: file['file_extension'], file_size: file['file_size'] })
  end

  private

  def add_user_to_connected_list
    @@connected_users[params[:fileId]] ||= Set.new
    @@connected_users[params[:fileId]].add(current_user.id)
  end

  def remove_user_from_connected_list
    @@connected_users[params[:fileId]]&.delete(current_user.id)
    @@connected_users.delete(params[:fileId]) if @@connected_users[params[:fileId]]&.empty?
  end

  def broadcast_connected_users
    connected_users = User.where(id: @@connected_users[params[:fileId]].to_a).as_json(only: [:id, :name, :image])
    ActionCable.server.broadcast("file_environment_#{params[:fileId]}", {
      action: 'connected_users',
      users: connected_users
    })
  end

  def broadcast_user_joined
    ActionCable.server.broadcast("file_environment_#{params[:fileId]}", {
      action: 'user_joined',
      user: current_user.as_json(only: [:id, :name])
    })
  end

  def broadcast_user_left
    ActionCable.server.broadcast("file_environment_#{params[:fileId]}", {
      action: 'user_left',
      user: current_user.as_json(only: [:id, :name])
    })
  end
end
