class CreateColors < ActiveRecord::Migration
  def change
    create_table :colors do |t|
      t.string :hexadecimal
      t.text :yarn

      t.timestamps
    end
  end
end
