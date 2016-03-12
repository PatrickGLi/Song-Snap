class Soundcloud::SessionsController < ApplicationController
  def signin
    redirect_to soundcloud_client.authorize_url()
  end

  def connected
   if params[:error].nil?
     soundcloud_client.exchange_token(:code => params[:code])
     me = soundcloud_client.get("/me")

     current_user.update_attributes!({
       :access_token  => soundcloud_client.access_token,
       :refresh_token => soundcloud_client.refresh_token,
       :expires_in    => soundcloud_client.expires_at,
     })
   end
 end

  private
  def soundcloud_connected_url
    # "https://song-snap.herokuapp.com/soundcloud/connected"
    "http://localhost:3000/soundcloud/connected"
  end

  def soundcloud_client
    return @soundcloud_client if @soundcloud_client
    @soundcloud_client = User.soundcloud_client(:redirect_uri  => soundcloud_connected_url)
  end
end
