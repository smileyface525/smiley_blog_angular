eiko = User.new(username: 'smileyface525', email: 'eiko@email.com', password: 'hello', password_confirmation: 'hello')
eiko.save
eiko.admin!

nyu = User.new(username: 'nyu', email: 'nyu@email.com', password: 'hello', password_confirmation: 'hello')
nyu.save

moo = User.new(username: 'mookie', email: 'moo@email.com', password: 'hello', password_confirmation: 'hello')
moo.save

rails = Tag.create(name: 'rails')
react = Tag.create(name: 'react')
angular = Tag.create(name: 'angular')
git = Tag.create(name: 'git')
heroku = Tag.create(name: 'heroku')

blog_1 = Blog.new(title: 'blog one', content: 'this is the first blog')
blog_1.tags << rails
blog_1.tags << git
blog_1.save

blog_2 = Blog.new(title: 'blog two', content: 'this is the second blog')
blog_2.tags << angular
blog_2.tags << git
blog_2.tags << heroku
blog_2.save

blog_3 = Blog.new(title: 'blog three', content: 'this is the third blog')
blog_3.tags << rails
blog_3.tags << angular
blog_3.tags << heroku
blog_3.save

com_1 = Comment.new(content: 'Comment on the first blog')
com_1.author = moo
com_1.blog = blog_1
com_1.save

com_2 = Comment.new(content: 'Another comment on the first blog')
com_2.author = nyu
com_2.blog = blog_1
com_2.save

com_3 = Comment.new(content: 'Comment on the second blog')
com_3.author = moo
com_3.blog = blog_2
com_3.save

com_4 = Comment.new(content: 'Another comment on the second blog')
com_4.author = nyu
com_4.blog = blog_2
com_4.save

com_5 = Comment.new(content: 'Comment on the third blog')
com_5.author = moo
com_5.blog = blog_3
com_5.save

com_2 = Comment.new(content: 'Another comment on the third blog')
com_2.author = nyu
com_2.blog = blog_3
com_2.save



