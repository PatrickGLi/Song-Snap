class Soundcloud::SessionsController < ApplicationController
  def signin
    client = Soundcloud.new(:client_id => ENV["SOUNDCLOUD_CLIENT_ID"],
                        :client_secret => ENV["SOUNDCLOUD_CLIENT_SECRET"],
                        :redirect_uri => 'http://localhost:3000/soundcloud/connected')
    # redirect user to authorize URL
    redirect_to client.authorize_url()
  end

  def connected
    # create client object with app credentials
    client = Soundcloud.new(:client_id => ENV["SOUNDCLOUD_CLIENT_ID"],
                        :client_secret => ENV["SOUNDCLOUD_CLIENT_SECRET"],
                        :redirect_uri => 'http://localhost:3000/soundcloud/connected')

# exchange authorization code for access token
    code = params[:code]
    access_token = client.exchange_token(:code => code)
    @current_user = client.get('/me')

    session[:access_token] = access_token

    debugger
    redirect_to root_url
  end
end
