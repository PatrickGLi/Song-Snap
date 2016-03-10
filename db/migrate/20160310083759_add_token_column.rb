class AddTokenColumn < ActiveRecord::Migration
  def change
    add_column :tokens, :user_id, :integer

    add_index :tokens, :user_id
  end
end
