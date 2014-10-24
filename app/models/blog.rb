class Blog < ActiveRecord::Base
  has_and_belongs_to_many :tags
  validates :title, :content, :tags, presence: true
  validates :title, length: { maximum: 30,
      too_long: "%{count} characters is the maximum allowed" }
end
