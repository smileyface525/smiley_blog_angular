class BlogsController < ApplicationController

  LIMIT_FOR_RECENT = 10

  def index
    case params[:tag]
    when 'All'
      blogs = Blog.all_with_tags_and_comments
    when 'Recent'
      blogs = Blog.recent_with_tags_and_comments(LIMIT_FOR_RECENT)
    else
      blogs = Blog.with_tags_and_comments_for(params[:tag])
    end
    render json: blogs
  end

  def create
    render_unauthorized_request unless verified_request?
    tags = params[:tags].map { |tag| Tag.find_or_create_by(name: tag.titleize) }
    new_blog = Blog.new(blog_params)
    tags.each { |tag| new_blog.tags << tag }
    if new_blog.save
      render json: new_blog.with_tags_and_comments
    else
      render_unprocessable_entity(new_blog.errors.message)
    end
  end

  def update
    render_unauthorized_request unless  verified_request?
    updated_blog = Blog.find(params[:blog][:id])
    if updated_blog
      updated_blog.update_attributes(blog_params)
      new_tags = params[:tags].map { |tag_name| Tag.find_or_create_by(name: tag_name) }
      updated_blog.tags.update_tags_with(new_tags)
      render json: updated_blog.with_tags_and_comments and return
    end
    render_unprocessable_entity
  end

  def destroy
    blog = Blog.find(params[:id])
    if blog
      blog.destroy
      render json: blog
    else
      render_unprocessable_entity
    end
  end

  private

  def blog_params
    params.require(:blog).permit(:title, :content, :created_at, :updated_at, :tag_ids)
  end

  def render_unauthorized_request
    render json: {msg: 'Unaurthorized request was made.'}, status: 401
    return
  end

  def render_unprocessable_entity
    render json: {msg: 'unprocessable entity'}, status: 422
  end

  def find_or_create_and_get_id_for_tag(value)
    found_or_created_tag = Tag.find_or_create_by(name: value)
    found_or_created_tag.id
  end

end

