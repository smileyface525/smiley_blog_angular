class BlogsController < ApplicationController

  def index
    blogs = Blog.all_with_tags_and_comments
    render json: blogs
  end

end

