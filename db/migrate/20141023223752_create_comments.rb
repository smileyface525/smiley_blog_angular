class CreateComments < ActiveRecord::Migration
  def change
    create_table :comments do |t|
      t.belongs_to :user
      t.belongs_to :blog
      t.text :content
      t.text :reply
      t.timestamps
    end
  end
end
