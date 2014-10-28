class Comment < ActiveRecord::Base
  belongs_to :user
  belongs_to :author, :class_name => :User, :foreign_key => "user_id"

  belongs_to :blog
  validates :user, :blog, :content, presence: true
end
