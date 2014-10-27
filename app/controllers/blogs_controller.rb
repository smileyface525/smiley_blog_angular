class BlogsController < ApplicationController

  def index
    blogs = Blog.all_with_tags
    render json: blogs
  end

end

