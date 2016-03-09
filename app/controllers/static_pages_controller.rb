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

# exchange authorization code for access token
    code = params[:code]
    access_token = client.exchange_token(:code => code)

    client = Soundcloud.new(:access_token => access_token)

# make an authenticated call
    @current_user = client.get('/me')

    puts "#{@current_user.username}"
  end
end
