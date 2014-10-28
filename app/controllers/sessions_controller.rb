class SessionsController < ApplicationController

  def index
    render json: current_user
  end

  def create
    user = User.authenticate_by_email(params[:user][:email], params[:user][:password])
    if user
      session[:user_id] = user.id
      render json: user
    else
      render json: {msg: 'Login Falied. Please try again'}, status: :bad_request
    end
  end

  def destroy
    session.clear
    redirect_to blogs_path
  end

end