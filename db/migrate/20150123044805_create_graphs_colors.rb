class CreateGraphsColors < ActiveRecord::Migration
  def change
  	create_join_table :graphs, :colors
  end
end
