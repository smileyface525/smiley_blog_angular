class Tag < ActiveRecord::Base
  has_and_belongs_to_many :blogs
  validates :name, presence: true
  validates :name, uniqueness: true
  validates :name, length: { maximum: 10,
      too_long: "%{count} characters is the maximum allowed" }
  before_save :titleize_name!

  def titleize_name!
    self.name = name.titleize
  end

end
