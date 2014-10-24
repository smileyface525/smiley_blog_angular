class Tag < ActiveRecord::Base
  has_and_belongs_to_many :blogs
  validates :name, :blogs, presence: true
  validates :name, uniqueness: true
  validates :name, length: { maximum: 10,
      too_long: "%{count} characters is the maximum allowed" }
end
