class DropToken < ActiveRecord::Migration
  def change
    drop_table :tokens

    add_column :users, :access_token, :string
    add_column :users, :refresh_token, :string
    add_column :users, :expires_in, :datetime
  end
end
