class Blog < ActiveRecord::Base
  has_and_belongs_to_many :tags
  has_many :comments
  validates :title, :content, :tags, presence: true
  validates :title, length: { maximum: 30,
      too_long: "%{count} characters is the maximum allowed" }
  before_save :titleize_title!

  def self.all_with_tags_and_comments
    all.inject(Array.new) do |blog_array, blog|
      blog_array << { blog: blog,
                      tags: blog.tags.map(&:name),
                      comments: blog.comments.map{ |c| {
                         id: c.id,
                         content: c.content,
                         reply: c.reply,
                         author: c.author.username} }
                    }
    end
  end

  def with_tags_and_comments
    {blog: self,
     tags: self.tags.map(&:name),
     comments: self.comments.map{ |c| {
        id: c.id,
        content: c.content,
        reply: c.reply,
        author: c.author.username} }
    }
  end

  def titleize_title!
    self.title = title.titleize
  end

end
