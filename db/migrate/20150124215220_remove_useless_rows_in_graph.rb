class RemoveUselessRowsInGraph < ActiveRecord::Migration
  def change
  	remove_column :graphs, :difficulty
  	remove_column :graphs, :gauge
  	remove_column :graphs, :rows
  	remove_column :graphs, :columns
  	remove_column :graphs, :number_of_colors
  end
end
