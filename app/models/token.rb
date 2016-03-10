class Token < ActiveRecord::Base
  validates :access_token, :refresh_token, :expires_in, presence: true

  belongs_to :user,
  foreign_key: :user_id,
  class_name: "User"
end
