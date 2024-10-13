class EnvironmentsController < ApplicationController
  include UserFetcher

  def index
    Rails.logger.info "Fetching environments for user: #{@current_user.id}"
    environments = @current_user.environments

    render json: { environments: environments }
  end

  def create
    Rails.logger.info "Creating environment for user: #{@current_user.id}"
    environment = Environment.create(name: generate_random_name)
    EnvironmentUserJoin.create(environment_id: environment.id, user_id: @current_user.id)
    render json: { environmentId: environment.id }
  end

  def create_invite
    @environment = Environment.find(params[:environmentId])
    @invite = @environment.invites.new(invite_params)

    if @invite.save
      render json: { status: "created", invite: @invite }, status: :created
    else
      render json: { status: "error", errors: @invite.errors }, status: :unprocessable_entity
    end
  end

  def join
    Rails.logger.info "Joining environment for user: #{@current_user.id}"
    invite = Invite.find_by(code: params[:code])
    
    if invite.nil?
      render json: { status: 404, message: "Invite not found" }, status: :not_found
      return
    end

    existing_join = EnvironmentUserJoin.find_by(environment_id: invite.environment_id, user_id: @current_user.id)
    if existing_join
      render json: { status: 200, message: "User already a member of this environment", environmentId: invite.environment_id }, status: :ok
      return
    end

    environment_user_join = EnvironmentUserJoin.new(environment_id: invite.environment_id, user_id: @current_user.id)
    if environment_user_join.save
      invite.destroy
      render json: { status: 201, message: "Successfully joined the environment", environmentId: invite.environment_id }, status: :created
    else
      render json: { status: 422, errors: environment_user_join.errors.full_messages }, status: :unprocessable_entity
    end
  end

  private

  def invite_params
    params.require(:invite).permit(:code)
  end

  def generate_random_name
    adjectives = ['Sunny', 'Cloudy', 'Rainy', 'Snowy', 'Windy', 'Calm', 'Stormy']
    nouns = ['Meadow', 'Forest', 'Mountain', 'Valley', 'River', 'Lake', 'Ocean']
    "#{adjectives.sample} #{nouns.sample}"
  end
end
