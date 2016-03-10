class CreateTokens < ActiveRecord::Migration
  def change
    create_table :tokens do |t|
      t.string :access_token, null: false
      t.string :refresh_token, null: false
      t.string :expires_in, null: false
      t.timestamps null: false
    end
  end
end
