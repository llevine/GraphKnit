class AddingPreviewColumnToGraphs < ActiveRecord::Migration
  def change
  	add_column :graphs, :preview, :text
  end
end
