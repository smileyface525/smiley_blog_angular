class User < ActiveRecord::Base
  has_secure_password
  has_many :comments
  enum status: [ :general, :admin ]
  validates :email, :password, presence: true
  validates :email, uniqueness: true
  validates :password_confirmation, presence: true

end
