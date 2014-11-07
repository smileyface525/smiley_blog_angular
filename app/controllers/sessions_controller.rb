class SessionsController < ApplicationController

  def index
    if current_user.nil?
      render_not_found
    else
      render json: current_user
    end
  end

  def create
    render_unauthorized_request unless verified_request?
    user = User.authenticate_by_email(params[:user][:email], params[:user][:password])
    if user
      session[:user_id] = user.id
      render json: user
    else
      render json: {msg: 'Login Falied. Please try again'}, status: :bad_request
    end
  end

  def destroy
    render_unauthorized_request unless verified_request?
    session.clear
    redirect_to root_path, status: 303
  end

  private

  def render_unauthorized_request
    render json: {msg: 'Unaurthorized request was made.'}, status: 401
    return
  end

  def render_not_found
    render json: {msg: 'Could not find record'}, status: 404
  end

end