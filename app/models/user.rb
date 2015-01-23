class User < ActiveRecord::Base
	has_many :graphs, dependent: :destroy

	validates :username, presence: true, uniqueness: true
	validates_presence_of :first_name
	validates_presence_of :last_name

	validates :email, presence: true, uniqueness: true, confirmation: true
	has_secure_password
end
