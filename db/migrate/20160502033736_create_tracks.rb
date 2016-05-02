class CreateTracks < ActiveRecord::Migration
  def change
    create_table :tracks do |t|
      t.string :title, null: false
      t.string :permalink_url, null: false
      t.text :description
      t.integer :user_id, null: false
      t.string :genre, null: false
      t.string :tag_list, null: false
      t.timestamps null: false
    end

    add_index :tracks, :user_id
  end
end
