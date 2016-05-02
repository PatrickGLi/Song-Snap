class Track < ActiveRecord::Base
  validates :title, :permalink_url, :description, :user_id, :tag_list, :genre, presence: true

  belongs_to :user
end
