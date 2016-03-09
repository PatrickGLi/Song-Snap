class StaticPagesController < ApplicationController
  def root

  end

  def signin
    client = Soundcloud.new(:client_id => ENV["SOUNDCLOUD_CLIENT_ID"],
                        :client_secret => ENV["SOUNDCLOUD_CLIENT_SECRET"],
                        :redirect_uri => 'https://song-snap.herokuapp.com/callback')
    # redirect user to authorize URL
    redirect_to client.authorize_url()
  end

  def callback
    # create client object with app credentials
    client = Soundcloud.new(:client_id => ENV["SOUNDCLOUD_CLIENT_ID"],
                        :client_secret => ENV["SOUNDCLOUD_CLIENT_SECRET"],
                        :redirect_uri => 'https://song-snap.herokuapp.com/callback')

    @current_user = client.get('/me')

  end
end
