class SessionsController < ApplicationController
  before_action :currently_signed_in, only:[:new]

def new
  @user = User.new
end

def create
  user = User.find_by_credentials(params[:user][:email],
                                  params[:user][:password]
                                  )

  if user.nil?
    @user = User.new(email: params[:user][:email])
    flash.now[:errors] = ["Invalid email/password"]
    render :new
  else
    login!(user)
    redirect_to root_url
  end
end

def destroy
  logout!
  redirect_to new_session_url
end
end
