class CommentsController < ApplicationController

  def create
    render_unauthorized_request unless verified_request?
    user = User.find(params[:user_id]);
    blog = Blog.find(params[:blog_id])
    if user && blog
      comment = user.comments.create(comment_params)
      blog.comments << comment
      render json: {blog_id: blog.id, comment: comment.format_to_be_rendered}
      return
    else
      render_not_found
    end
  end

  def update
    render_unauthorized_request unless verified_request?
    comment = Comment.find(params[:id])
    if comment
      comment.update_attributes(reply: params[:reply])
      render json: {blog_id: comment.blog.id, comment: comment.format_to_be_rendered}
    end
  end

  private

  def render_unauthorized_request
    render json: {msg: 'Unaurthorized request was made.'}, status: 401
    return
  end

  def comment_params
    params.require(:comment).permit(:content, :reply)
  end

  def render_not_found
    render json: {msg: 'Could not find record'}, status: 404
  end

end