class EnvironmentFilesController < ApplicationController
  include UserFetcher

  def create
    environment = Environment.find(params[:environment_id])
    return render json: { error: 'Unauthorized' }, status: :unauthorized unless environment.users.include?(@current_user)

    file = environment.environment_files.new(file_params)

    if file.save
      render json: file, status: :created
    else
      render json: { errors: file.errors.full_messages }, status: :unprocessable_entity
    end
  end

  private

  def file_params
    params.require(:file).permit(:filename, :content, :file_extension)
  end
end
