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


  end
end


https://song-snap.herokuapp.com/callback?code=a531c1ed3efe98d93366fc8dd84ade30#access_token=1-184282-141963235-71e5a652063f0&expires_in=21599&scope=%2A
