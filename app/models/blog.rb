class Blog < ActiveRecord::Base
  has_and_belongs_to_many :tags,
    -> { extending TagsExtension },
    after_remove: :destroy_empty_tag

  has_many :comments
  validates :title, :content, :tags, presence: true
  validates :title, length: { maximum: 30,
      too_long: "%{count} characters is the maximum allowed" }
  before_save :titleize_title!
  before_destroy :destroy_empty_tags
  DEFAULT_BLOGS_ORDER = {created_at: :desc}
  DEFAULT_COMMNETS_ORDER = {created_at: :asc}

  def self.all_with_tags_and_comments
    all.order(DEFAULT_BLOGS_ORDER).map(&:with_tags_and_comments)
  end

  def self.recent_with_tags_and_comments(limit)
    blogs = self.all.order(DEFAULT_BLOGS_ORDER).limit(limit)
    blogs.map(&:with_tags_and_comments)
  end

  def self.with_tags_and_comments_for(tag)
    blogs = Tag.find_by_name(tag).try(:blogs) || self.all
    blogs.order(DEFAULT_BLOGS_ORDER).map(&:with_tags_and_comments)
  end

  def with_tags_and_comments
      {blog: self,
       tags: self.tags.map(&:name),
       comments: self.comments.order(DEFAULT_COMMNETS_ORDER).map{ |c| {
          id: c.id,
          content: c.content,
          reply: c.reply,
          author: c.author.username} }
      }

  end

  def titleize_title!
    self.title = title.titleize
  end

  def destroy_empty_tag(tag)
    tag.destroy if tag.blogs.count == 0
  end

  def destroy_empty_tags
    tags.each do |tag|
      tag.destroy if tag.blogs.count == 1
    end
  end

end

module TagsExtension

  def update_tags_with(new_tags)
    new_tags.each do |tag|
      self << tag if !self.include?(tag)
    end
    self.each do |tag|
      self.destroy(tag) if !new_tags.include?(tag)
    end
  end

end
