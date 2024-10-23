class ChatChannel < ApplicationCable::Channel
  include Authentication

  def subscribed
    Rails.logger.info "Attempting to subscribe with user: #{current_user&.id}"
    Rails.logger.info "Environment ID: #{params[:environmentId]}"

    if current_user.nil?
      Rails.logger.error "Subscription rejected: Current user is nil"
      reject
      return
    end

    env = Environment.find_by(id: params[:environmentId])
    if env && EnvironmentUserJoin.find_by(environment_id: env.id, user_id: current_user.id)
      stream_from "chat_environment_#{params[:environmentId]}"
      Rails.logger.info "Subscription accepted for user #{current_user.id} in environment #{params[:environmentId]}"
      broadcast_user_joined
    else
      Rails.logger.error "Subscription rejected: User not part of environment or environment not found"
      reject
    end
  end

  def unsubscribed
    broadcast_user_left
    # Any additional cleanup needed when channel is unsubscribed
  end

  def receive(data)
    Rails.logger.info "Received message: #{data.inspect}"
    message = data['content']
    ActionCable.server.broadcast("chat_environment_#{params[:environmentId]}", {
      message: {
        id: message['id'],
        content: message['content'],
        sender: current_user.as_json(only: [:id, :username, :image]),
        timestamp: message['timestamp'],
        type: message['type']
      }
    })
  end

  private

  def broadcast_user_joined
    ActionCable.server.broadcast("chat_environment_#{params[:environmentId]}", {
      action: 'user_joined',
      user: current_user.as_json(only: [:id, :username])
    })
  end

  def broadcast_user_left
    ActionCable.server.broadcast("chat_environment_#{params[:environmentId]}", {
      action: 'user_left',
      user: current_user.as_json(only: [:id, :username])
    })
  end
end
