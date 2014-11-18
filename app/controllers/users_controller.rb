class UsersController < ApplicationController

  def create
    render_unauthorized_request unless verified_request?
    user = User.new(user_params)
    if user.save
      session[:user_id] = user.id
      render json: user
    else
      render json: user.errors, status: 400
    end
  end

  def update
      render_unauthorized_request unless verified_request?
      user = User.find(params[:id])
      if user.update_attributes(user_params)
        render json: user
      else
        render json: user.errors, status: 400
      end
  end

  private

  def render_unauthorized_request
    render json: {msg: 'Unauthorized request was made.'}, status: 401
    return
  end

  def user_params
    params.require(:user).permit(:email, :username, :password, :password_confirmation)
  end

end