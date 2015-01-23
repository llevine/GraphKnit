class CreateGraphs < ActiveRecord::Migration
  def change
    create_table :graphs do |t|
      t.string :name
      t.string :category
      t.string :image_url
      t.integer :difficulty
      t.integer :gauge
      t.integer :rows
      t.integer :columns
      t.integer :number_of_colors
      t.text :layout
      t.text :notes
      
      t.references :user

      t.timestamps
    end
  end
end
