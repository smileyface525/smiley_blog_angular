class Comment < ActiveRecord::Base
  belongs_to :user
  belongs_to :blog
  validates :user, :blog, :content, presence: true
end
