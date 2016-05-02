class CreateSongs < ActiveRecord::Migration
  def change
    create_table :songs do |t|
      t.string :title, null: false
      t.string :author_name, null: false
      t.text :description
      t.integer :height
      t.string :width
      t.string :html, null: false
      t.integer :user_id, null: false
      t.timestamps null: false
    end

    add_index :songs, :user_id
  end
end
