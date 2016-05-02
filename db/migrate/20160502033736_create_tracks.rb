class CreateTracks < ActiveRecord::Migration
  def change
    create_table :tracks do |t|
      t.string :title, null: false
      t.string :author_name, null: false
      t.text :description
      t.integer :height
      t.string :width
      t.string :html, null: false
      t.integer :user_id, null: false
      t.string :genre, null: false
      t.string :tag_list, null: false
      t.timestamps null: false
    end

    add_index :tracks, :user_id
  end
end
