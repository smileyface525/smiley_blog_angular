class BlogsController < ApplicationController

  def index
    blogs = Blog.all_with_tags_and_comments
    render json: blogs
  end

  def create
    render_unauthorized_request unless verified_request?
    byebug
    tags = params[:tags].map { |tag| Tag.find_or_create_by(name: tag) }
    new_blog = Blog.new(blog_params)
    tags.each { |tag| new_blog.tags << tag }
    if new_blog.save
      render json: new_blog.with_tags_and_comments
    else
      render_unprocessable_entity(new_blog.errors.message)
    end
  end

  private

  def blog_params
    params.require(:blog).permit(:title, :content)
  end

  def render_unauthorized_request
    render json: {msg: 'Unaurthorized request was made.'}, status: 401
    return
  end

  def render_unprocessable_entity(error_msg)
    render json: {msg: error_msg}, status: 422
  end
end

