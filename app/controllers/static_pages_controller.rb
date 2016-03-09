class StaticPagesController < ApplicationController
  def root

  end
end
#   def signin
#     client = Soundcloud.new(:client_id => ENV["SOUNDCLOUD_CLIENT_ID"],
#                         :client_secret => ENV["SOUNDCLOUD_CLIENT_SECRET"],
#                         :redirect_uri => '#{request_access_token_url}')
#
#     # redirect user to authorize URL
#     redirect_to client.authorize_url()
#   end
#
#   def request_access_token
#     client = Soundcloud.new(:client_id => ENV["SOUNDCLOUD_CLIENT_ID"],
#                             :client_secret => ENV["SOUNDCLOUD_CLIENT_SECRET"],
#                             :redirect_uri => 'http://example.com/callback')
#
#     debugger
#
#     code = params[:code]
#     access_token = client.exchange_token(:code => code)
#   end
# end


#
# #
# The redirect URI typically points to a server-side script that requests the access token through a POST to the authorization server.
#
#
#
#
#
# client = Soundcloud.new(:access_token => 'YOUR_ACCESS_TOKEN')
#
# # make an authenticated call
# current_user = client.get('/me')
# puts current_user.username
