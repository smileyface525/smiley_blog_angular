class CreateBlogsAndTags < ActiveRecord::Migration
  def change
    create_table :blogs_tags do |t|
      t.belongs_to :blog
      t.belongs_to :tag
    end
  end
end
