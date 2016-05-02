class User < ActiveRecord::Base
  validates :username, :password_digest, :session_token, presence: true
  validates :username, uniqueness: true
  validates :password, length: { minimum: 6, allow_nil: true }
  after_initialize :ensure_session_token

  attr_reader :password
  has_many :songs

  def password=(password)
    @password = password
    self.password_digest = BCrypt::Password.create(password);
  end

  def self.find_by_credentials(username, password)
    user = User.find_by(username: username)
    return nil unless user && user.valid_password?(password)
    user
  end

  def valid_password?(password)
    BCrypt::Password.new(self.password_digest).is_password?(password)
  end

  def reset_session_token!
    self.session_token = SecureRandom.urlsafe_base64(16)
    self.save!
    self.session_token
  end

  def self.soundcloud_client(options={})
    options = {
      :client_id     => ENV["SOUNDCLOUD_CLIENT_ID"],
      :client_secret => ENV["SOUNDCLOUD_CLIENT_SECRET"],
    }.merge(options)

    Soundcloud.new(options)
  end

  def soundcloud_client(options={})
    options= {
      expires_in: self.expires_in,
      access_token: self.access_token,
      refresh_token: self.refresh_token
    }.merge(options)

    client = self.class.soundcloud_client(options)

    # define a callback for successful token exchanges
    # this will make sure that new access_tokens are persisted once an existing
    # access_token expired and a new one was retrieved from the soundcloud api
    client.on_exchange_token do
      self.update_attributes!({
        :access_token  => client.access_token,
        :refresh_token => client.refresh_token,
        :expires_in    => client.expires_at,
      })
    end

    client
  end

  private
  def ensure_session_token
    self.session_token ||= SecureRandom.urlsafe_base64(16)
  end
end
