class Track < ActiveRecord::Base
  validates :title, :author_name, :html, :user_id, :tag_list, :genre, presence: true

  belongs_to :user
end
