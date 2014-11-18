class User < ActiveRecord::Base
  has_secure_password
  has_many :comments
  enum status: [ :general, :admin ]
  validates :email, :password, presence: true
  validates :email, uniqueness: true
  validates :password_confirmation, presence: true
  before_save :fill_in_empty_username

  def self.authenticate_by_email(email, password)
    find_by_email(email).try(:authenticate, password)
  end

  def fill_in_empty_username
    self.username = email.split('@').first if (valid? && username.nil?)
  end

end
