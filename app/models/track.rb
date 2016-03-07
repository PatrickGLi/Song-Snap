class Track < ActiveRecord::Base
  validates :title, :track_url, presence: true
end
