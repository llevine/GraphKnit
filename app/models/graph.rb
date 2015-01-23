class Graph < ActiveRecord::Base
	belongs_to :user
	has_and_belongs_to_many :colors

	validates_presence_of :name
	validates_presence_of :category
	validates :difficulty, numericality: { only_integer: true }
	validates :gauge, numericality: { only_integer: true }
	validates :rows, presence: true, numericality: { only_integer: true }
	validates :columns, presence: true, numericality: { only_integer: true }
	validates :number_of_colors, presence: true, numericality: { only_integer: true }
	validates :layout, presence: true

end
