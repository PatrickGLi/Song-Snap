class CreateTracks < ActiveRecord::Migration
  def change
    create_table :tracks do |t|
      t.string   "title",                   null: false
      t.string   "track_url",               null: false
      t.timestamps null: false
    end
  end
end
