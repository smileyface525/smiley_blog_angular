class CommentsController < ApplicationController

  def create

  end

  def update
    render_unauthorized_request
    comment = Comment.find(params[:id])
    if comment
      comment.update_attributes(reply: params[:reply])
      render json: comment.blog.with_tags_and_comments
    end
  end

  private

  def render_unauthorized_request
    render json: {msg: 'Unaurthorized request was made.'}, status: 401
    return
  end

end