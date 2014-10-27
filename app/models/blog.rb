class Blog < ActiveRecord::Base
  has_and_belongs_to_many :tags
  validates :title, :content, :tags, presence: true
  validates :title, length: { maximum: 30,
      too_long: "%{count} characters is the maximum allowed" }
  before_save :titleize_title!

  def self.all_with_tags
    all.inject(Array.new) do |blog_array, blog|
      blog_array << { blog: blog, tags: blog.tags.map(&:name) }
    end
  end

  def titleize_title!
    self.title = title.titleize
  end

end
