class Comment < ActiveRecord::Base
  belongs_to :user
  belongs_to :author, :class_name => :User, :foreign_key => "user_id"

  belongs_to :blog
  validates :user, :blog, :content, presence: true

  def format_to_be_rendered
    { id: self.id,
      content: self.content,
      reply: self.reply,
      author: self.author.username }
  end

end
