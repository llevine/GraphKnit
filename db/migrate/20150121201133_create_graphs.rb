class CreateGraphs < ActiveRecord::Migration
  def change
    create_table :graphs do |t|
      t.string :name
      t.string :category
      t.string :image_url
      t.string :product_image
      t.integer :difficulty
      t.integer :gauge
      t.integer :rows
      t.integer :columns
      t.integer :number_of_colors
      t.text :layout
      t.text :notes
      t.boolean :privacy
      
      t.references :user

      t.timestamps
    end
  end
end
