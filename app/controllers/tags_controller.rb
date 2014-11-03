class TagsController < ApplicationController

  def index
    tags = Tag.all.map(&:name)
    render json: tags
  end

end